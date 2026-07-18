"""Export dbt marts from BigQuery to the JSON files the Angular app serves statically."""

import json
import os
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path

from google.cloud import bigquery

OUT_DIR = Path(__file__).resolve().parents[2] / "public" / "data"

MARTS = [
    "mart_current_curve",
    "mart_yield_history",
    "mart_spread_10y_2y",
]


def default(o):
    if isinstance(o, Decimal):
        return float(o)
    if isinstance(o, (datetime, date)):
        return o.isoformat()
    raise TypeError(f"not JSON serializable: {o!r}")


def main() -> None:
    project = os.environ["BQ_PROJECT"]
    dataset = os.environ.get("BQ_DATASET", "yield_curve")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    client = bigquery.Client(project=project)
    for mart in MARTS:
        rows = [dict(row) for row in client.query(f"select * from `{project}.{dataset}.{mart}`").result()]

        out_path = OUT_DIR / f"{mart}.json"
        out_path.write_text(json.dumps(rows, indent=2, default=default), encoding="utf-8")
        print(f"Exported {len(rows)} rows -> {out_path}")


if __name__ == "__main__":
    main()
