"""
Fetch daily par-yield-curve rates from Treasury.gov and land them in BigQuery.

Source: https://home.treasury.gov/resource-center/data-chart-center/interest-rates
The feed returns one XML document per calendar year (Atom/OData), with one
<entry> per business day and one field per maturity (BC_1MONTH .. BC_30YEAR).

Modes:
  --mode backfill     fetch every year from --start-year through the current year
  --mode incremental  fetch only the current year (default; cheap daily refresh)
  --dry-run           parse and print/write JSON locally instead of touching BigQuery
"""

import argparse
import json
import xml.etree.ElementTree as ET
from datetime import date, datetime
from pathlib import Path

import requests

FEED_URL = "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml"

NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
    "d": "http://schemas.microsoft.com/ado/2007/08/dataservices",
}

# (XML field, BigQuery column)
MATURITY_FIELDS = [
    ("BC_1MONTH", "bc_1month"),
    ("BC_2MONTH", "bc_2month"),
    ("BC_3MONTH", "bc_3month"),
    ("BC_4MONTH", "bc_4month"),
    ("BC_6MONTH", "bc_6month"),
    ("BC_1YEAR", "bc_1year"),
    ("BC_2YEAR", "bc_2year"),
    ("BC_3YEAR", "bc_3year"),
    ("BC_5YEAR", "bc_5year"),
    ("BC_7YEAR", "bc_7year"),
    ("BC_10YEAR", "bc_10year"),
    ("BC_20YEAR", "bc_20year"),
    ("BC_30YEAR", "bc_30year"),
]

RAW_TABLE = "raw_treasury_par_yields"


def _raw_schema():
    from google.cloud import bigquery

    return [
        bigquery.SchemaField("curve_date", "DATE", mode="REQUIRED"),
        *[bigquery.SchemaField(col, "FLOAT64") for _, col in MATURITY_FIELDS],
        bigquery.SchemaField("loaded_at", "TIMESTAMP", mode="REQUIRED"),
    ]


def fetch_year(year: int) -> list[dict]:
    resp = requests.get(FEED_URL, params={"data": "daily_treasury_yield_curve", "field_tdr_date_value": year}, timeout=30)
    resp.raise_for_status()
    root = ET.fromstring(resp.content)

    rows = []
    for entry in root.findall("atom:entry", NS):
        props = entry.find("atom:content/m:properties", NS)
        if props is None:
            continue

        date_el = props.find("d:NEW_DATE", NS)
        if date_el is None or not date_el.text:
            continue
        curve_date = datetime.fromisoformat(date_el.text).date()

        row = {"curve_date": curve_date.isoformat()}
        for xml_field, column in MATURITY_FIELDS:
            el = props.find(f"d:{xml_field}", NS)
            row[column] = float(el.text) if el is not None and el.text not in (None, "") else None
        rows.append(row)

    return rows


def fetch_years(start_year: int, end_year: int) -> list[dict]:
    all_rows: list[dict] = []
    for year in range(start_year, end_year + 1):
        year_rows = fetch_year(year)
        print(f"Fetched {len(year_rows)} observations for {year}")
        all_rows.extend(year_rows)
    return all_rows


def load_to_bigquery(rows: list[dict], project: str, dataset: str) -> None:
    from google.cloud import bigquery

    schema = _raw_schema()
    client = bigquery.Client(project=project)

    dataset_ref = bigquery.DatasetReference(project, dataset)
    client.create_dataset(bigquery.Dataset(dataset_ref), exists_ok=True)

    raw_ref = dataset_ref.table(RAW_TABLE)
    client.create_table(bigquery.Table(raw_ref, schema=schema), exists_ok=True)

    staging_ref = dataset_ref.table(f"_stg_{RAW_TABLE}_load")
    now = datetime.utcnow().isoformat()
    load_rows = [{**row, "loaded_at": now} for row in rows]

    job = client.load_table_from_json(
        load_rows,
        staging_ref,
        job_config=bigquery.LoadJobConfig(
            schema=schema,
            write_disposition=bigquery.WriteDisposition.WRITE_TRUNCATE,
        ),
    )
    job.result()

    update_cols = ", ".join(f"{col} = source.{col}" for _, col in MATURITY_FIELDS)
    insert_cols = ", ".join(["curve_date", *[col for _, col in MATURITY_FIELDS], "loaded_at"])
    insert_vals = ", ".join([f"source.{c}" for c in ["curve_date", *[col for _, col in MATURITY_FIELDS], "loaded_at"]])

    merge_sql = f"""
        MERGE `{project}.{dataset}.{RAW_TABLE}` AS target
        USING `{project}.{dataset}._stg_{RAW_TABLE}_load` AS source
        ON target.curve_date = source.curve_date
        WHEN MATCHED THEN UPDATE SET {update_cols}, loaded_at = source.loaded_at
        WHEN NOT MATCHED THEN INSERT ({insert_cols}) VALUES ({insert_vals})
    """
    client.query(merge_sql).result()
    client.delete_table(staging_ref, not_found_ok=True)

    print(f"Merged {len(rows)} observations into {project}.{dataset}.{RAW_TABLE}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=["backfill", "incremental"], default="incremental")
    parser.add_argument("--start-year", type=int, default=1990)
    parser.add_argument("--project", default=None, help="GCP project; falls back to BQ_PROJECT env var")
    parser.add_argument("--dataset", default=None, help="BigQuery dataset; falls back to BQ_DATASET env var")
    parser.add_argument("--dry-run", action="store_true", help="Fetch and print/write locally; skip BigQuery entirely")
    parser.add_argument("--out", type=Path, default=None, help="With --dry-run, write parsed rows to this JSON file")
    args = parser.parse_args()

    current_year = date.today().year
    start_year = args.start_year if args.mode == "backfill" else current_year

    rows = fetch_years(start_year, current_year)
    print(f"Total observations fetched: {len(rows)}")

    if args.dry_run:
        if args.out:
            args.out.write_text(json.dumps(rows, indent=2), encoding="utf-8")
            print(f"Wrote {len(rows)} rows -> {args.out}")
        else:
            print(json.dumps(rows[:5], indent=2))
            print(f"... ({len(rows)} rows total, showing first 5)")
        return

    import os

    project = args.project or os.environ["BQ_PROJECT"]
    dataset = args.dataset or os.environ.get("BQ_DATASET", "yield_curve")
    load_to_bigquery(rows, project, dataset)


if __name__ == "__main__":
    main()
