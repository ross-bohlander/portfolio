Treasury par-yield-curve ELT pipeline: Python ingestion from Treasury.gov's daily XML feed into BigQuery, dbt-bigquery for staging/marts/tests, and a JSON export consumed by the Angular app's Projects page. Runs daily via `.github/workflows/yield-curve-pipeline.yml`.

## Local setup

```
pip install -r requirements.txt
export BQ_PROJECT=<your-gcp-project-id>
export BQ_DATASET=yield_curve            # optional, this is the default
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
export DBT_PROFILES_DIR=$(pwd)/dbt       # so dbt finds profiles.yml here instead of ~/.dbt
```

## Refresh (what the scheduled workflow runs)

Every run re-fetches the full history (1990-present, a few thousand rows) and does a
single `WRITE_TRUNCATE` load into the raw table — a load job, not a MERGE, so it needs no
GCP billing account attached to the project.

```
python ingest/treasury_ingest.py
cd dbt && dbt build && cd ..
python export/export_marts.py
```

## Testing without BigQuery credentials

```
python ingest/treasury_ingest.py --dry-run
```
