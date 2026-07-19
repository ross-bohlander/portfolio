import pandas as pd
from pathlib import Path
from datetime import datetime
import snowflake.connector

SCRIPT_DIR = Path(__file__).resolve().parent

file_path = SCRIPT_DIR / "data" / "raw" / "snowflake_with_contracts.html"
json_filepath = SCRIPT_DIR / "data" / "out" / "squad_export.json"
json_filepath.parent.mkdir(parents=True, exist_ok=True)

df = pd.read_html(file_path, encoding="utf-8")[0]

df.to_json(json_filepath, orient="records", lines=True)

print(f"Exported to JSON successfully at {datetime.now()}.")

conn = snowflake.connector.connect(connection_name="my_example_connection")

try:
    with conn.cursor() as cur:
        local_path = json_filepath.resolve().as_posix()  # avoid backslash issues in the PUT URI

        cur.execute(
            f"PUT file://{local_path} @raw_stage "
            f"AUTO_COMPRESS=TRUE OVERWRITE=TRUE PARALLEL=4"
        )

        cur.execute(
            "COPY INTO squad_roster_raw (raw_data, file_name) "
            "FROM (SELECT $1, METADATA$FILENAME FROM @raw_stage/squad_export.json.gz) "
            "FILE_FORMAT = (TYPE = JSON) "
            "ON_ERROR = 'ABORT_STATEMENT' "
            "PURGE = TRUE"
        )
        result = cur.fetchall()
        print(result)  # rows_parsed, rows_loaded, errors_seen, etc.
finally:
    conn.close()
