import json
from datetime import date, datetime, timezone
from decimal import Decimal
from pathlib import Path

import duckdb

OUT_DIR = Path(__file__).resolve().parents[3] / "public" / "data"

MARTS = [
    "mart_max_aqi",
    "mart_max_values",
    "mart_aqi",
    "mart_pollutant_guidance",
]


def default(o):
    if isinstance(o, Decimal):
        return float(o)
    if isinstance(o, (datetime, date)):
        return o.isoformat()
    raise TypeError(f"not JSON serializable: {o!r}")


DB_PATH = Path(__file__).resolve().parents[1] / "openaq.duckdb"

OUT_DIR.mkdir(exist_ok=True)

conn = duckdb.connect(database=str(DB_PATH), read_only=True)

try:
    with conn.cursor() as cur:
        for mart in MARTS:
            cur.execute(f"select * from main.{mart}")
            columns = [c[0].lower() for c in cur.description]
            rows = [dict(zip(columns, row)) for row in cur.fetchall()]

            out_path = OUT_DIR / f"{mart}.json"
            out_path.write_text(json.dumps(rows, indent=2, default=default), encoding="utf-8")
            print(f"Exported {len(rows)} rows -> {out_path}")
finally:
    conn.close()

meta_path = OUT_DIR / "mart_openaq_meta.json"
meta_path.write_text(
    json.dumps({"generated_at": datetime.now(timezone.utc).isoformat()}, indent=2),
    encoding="utf-8",
)
print(f"Wrote export timestamp -> {meta_path}")
