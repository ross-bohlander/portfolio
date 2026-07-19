import json
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path

import snowflake.connector

OUT_DIR = Path(__file__).resolve().parents[2] / "public" / "data"

MARTS = [
    "mart_nationalities",
    "mart_nationalities_first_team",
    "mart_attributes",
    "mart_age_distribution",
    "mart_age_distribution_first_team",
    "mart_contract_rule_over_30",
    "mart_contract_rule_over_32",
    "mart_contract_rule_over_34",
]


def default(o):
    if isinstance(o, Decimal):
        return float(o)
    if isinstance(o, (datetime, date)):
        return o.isoformat()
    raise TypeError(f"not JSON serializable: {o!r}")


OUT_DIR.mkdir(exist_ok=True)

conn = snowflake.connector.connect(connection_name="my_example_connection")
try:
    with conn.cursor() as cur:
        for mart in MARTS:
            cur.execute(f"select * from squad_planner.roster.{mart}")
            columns = [c[0].lower() for c in cur.description]
            rows = [dict(zip(columns, row)) for row in cur.fetchall()]

            out_path = OUT_DIR / f"{mart}.json"
            out_path.write_text(json.dumps(rows, indent=2, default=default), encoding="utf-8")
            print(f"Exported {len(rows)} rows -> {out_path}")
finally:
    conn.close()
