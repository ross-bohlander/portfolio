This is a personal project using Snowflake + dbt to perform an ELT pipeline using football manager squad data.

Unlike the yield curve pipeline, this one isn't automated -- it's refreshed manually whenever
there's a new game save to export.

## Refreshing the data

1. Export the in-game squad screen to HTML and drop it at `data/raw/snowflake_with_contracts.html`
   (gitignored -- personal game data, not committed).
2. `python roster_convert.py` -- parses the HTML, converts to JSON, and loads it into Snowflake
   (`squad_roster_raw`) via PUT/COPY INTO. Requires a Snowflake named connection
   (`my_example_connection` in `~/.snowflake/connections.toml` or the Windows equivalent).
3. `dbt build` -- rebuilds the staging/mart models and runs tests.
4. `python export_marts.py` -- queries the marts and writes JSON straight into
   `../../public/data/`, the same folder the Angular app serves statically.
