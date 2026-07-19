# Treasury Yield Curve — Implementation Plan

A live, self-updating fixed-income data project for the portfolio site. It mirrors the
existing **Squad Planner** pipeline architecture (dbt marts → JSON in `public/data/` →
`ngx-echarts`) but swaps the warehouse target to **BigQuery** (permanent free tier, so the
live chart never rots) and replaces manual/Snowflake orchestration with a **scheduled
GitHub Actions workflow**.

## Decision summary

- **Skip real Snowflake.** A pipeline that dies with a trial account is a screenshot, not a
  portfolio piece. Only build a parallel stripped-down Snowflake case study if you are
  actively interviewing for a role that lists Snowflake by name and want the specific
  talking point. Otherwise, spend the saved time on the frontend, which is where a
  portfolio site actually gets judged.
- **Warehouse target: BigQuery** (`dbt-bigquery`). Free forever (10 GB storage, 1 TB
  query/mo, sandbox needs no card). A yield-curve dataset is tiny — the limits are
  irrelevant. Closest analog to "cloud warehouse" for résumé purposes. (Postgres via
  Supabase/Neon and DuckDB/MotherDuck were considered and rejected: weaker "modern data
  stack" signal.)
- **No live query API.** Export marts to JSON at the end of the Actions run and commit them
  to `public/data/`, served statically alongside the Angular build. A live BigQuery-backed
  Cloud Run endpoint is a documented **stretch goal**, not the first pass.

## Target architecture

```
Treasury.gov par-yield feed (XML/CSV, no key)
        │  Python ingestion
        ▼
BigQuery: raw daily observations (wide)
        │  dbt-core → dbt-bigquery
        ▼
staging (long: date, maturity, yield) → marts (current curve, full history, 10Y-2Y spread)
        │  dbt run + dbt test + docs generate
        ▼
export marts → JSON  →  commit to portfolio/public/data/
        │  (all steps run daily in GitHub Actions)
        ▼
Angular: YieldCurveData service (HttpClient) → ngx-echarts components
```

## Repository layout

Implemented as **`portfolio/pipeline/`**, inside the same repo as the Angular app — not as
a sibling folder outside it. Squad Planner's pipeline lives outside the repo because its
JSON exports are run and committed manually; this pipeline needs GitHub Actions to run it
and commit the output back automatically, which is far simpler as a single-repo checkout
than wiring a second repo with cross-repo push credentials.

```
portfolio/
├─ public/data/                        # committed JSON marts, served statically
├─ src/app/pages/projects/
│  └─ yield-curve-dashboard/           # mirrors squad-dashboard/
├─ pipeline/
│  ├─ ingest/treasury_ingest.py
│  ├─ dbt/                             # dbt-bigquery project
│  │  ├─ models/staging/treasury_yields/
│  │  ├─ models/marts/
│  │  ├─ tests/
│  │  └─ profiles.yml                  # env_var-driven, no secrets committed
│  ├─ export/export_marts.py
│  └─ requirements.txt
└─ .github/workflows/yield-curve-pipeline.yml
```

---

## Phase 1 — Ingestion (Python → BigQuery)

**Source:** Treasury.gov's own par-yield-curve feed (XML/CSV, no key required). For a
fixed-income audience, pulling straight from Treasury reads slightly better than routing
through FRED and is worth the small extra parsing effort. FRED (`DGS1MO`…`DGS30`, free key)
is the fallback if the Treasury feed proves flaky.

- `treasury_ingest.py`: fetch the daily par-yield curve, parse the wide row
  (date + one column per maturity: 1M, 2M, 3M, 4M, 6M, 1Y, 2Y, 3Y, 5Y, 7Y, 10Y, 20Y, 30Y),
  land raw observations into a BigQuery `raw` table via a `WRITE_TRUNCATE` load job — every
  run re-fetches the full history (1990-present, a few thousand rows, trivially cheap) and
  replaces the table wholesale, rather than incrementally upserting.
- Auth: a GCP service account with BigQuery Data Editor + Job User; key JSON stored as a
  GitHub Actions secret. Load via `google-cloud-bigquery`.
- **Note (learned from a real run):** the original design used a staged `MERGE` for a true
  incremental upsert, which is arguably the more "production" pattern — but BigQuery blocks
  all DML (`MERGE`/`UPDATE`/`INSERT`/`DELETE`) on a project with no billing account attached,
  even within the free-tier query/storage limits. A `load_table_from_json` **load job**
  faces no such restriction, so the full-refetch-and-truncate approach keeps the pipeline on
  the true no-billing-account free tier. Worth revisiting if the dataset ever grows past
  "refetch the whole thing daily" being the obviously cheap option.

**Done when:** `raw_treasury_par_yields` in BigQuery holds the full multi-year history after
a run, without requiring a billing account on the GCP project.

## Phase 2 — Transformation (dbt-core → BigQuery)

- **Source + freshness:** declare the `raw` table as a dbt source with a
  `source freshness` check (warn/error thresholds so a stalled feed surfaces).
- **Staging** (`stg_yields`): reshape the wide Treasury format into **long** form
  (`date`, `maturity_label`, `maturity_months`, `yield_pct`). `maturity_months` gives a
  numeric x-axis for correct curve spacing.
- **Marts:**
  - `mart_current_curve` — latest available date's full curve (the snapshot chart).
  - `mart_yield_history` — full long-form history (time-series / animated curve view).
  - `mart_spread_10y_2y` — 10Y-2Y spread series (add 10Y-3M as a second column). This is
    the standard inversion/recession chart and signals domain fluency to anyone in fixed
    income who lands on the page.
- **Tests:** `not_null` (date, maturity, yield), `accepted_range` on `yield_pct`
  (e.g. -5 to 25), plus the source freshness check above.
- **Docs:** `dbt docs generate` — the static docs site is worth linking from the project
  page regardless of warehouse choice. Commit/publish it (e.g. GitHub Pages) and add the
  link to the `Project.repoUrl`/a docs URL.

**Done when:** `dbt build` (run + test) passes green and the three marts materialize.

## Phase 3 — Orchestration (GitHub Actions)

Single scheduled workflow, daily, cron timed **after** Treasury's EOD publish
(~late afternoon US Eastern; run a bit later in UTC to be safe). Replaces Snowpipe/Tasks
entirely and costs nothing at this repo size.

Steps:
1. Checkout, set up Python, `pip install -r requirements.txt`.
2. Write the service-account key from a secret to a temp file; export
   `GOOGLE_APPLICATION_CREDENTIALS`.
3. `python ingest/treasury_ingest.py`
4. `dbt build` (= `dbt run` + `dbt test`) against BigQuery.
5. `python export/export_marts.py` → writes JSON files.
6. Commit changed JSON in `portfolio/public/data/` back to the repo (skip commit if no
   diff, e.g. a market holiday).

Add `workflow_dispatch` for manual runs and a `concurrency` guard so overlapping runs can't
race the commit.

**Done when:** a manual dispatch produces a green run that commits refreshed JSON.

## Phase 4 — Serving to Angular

- `export_marts.py` queries each mart and writes:
  - `public/data/yield_current_curve.json`
  - `public/data/yield_history.json`
  - `public/data/yield_spread.json`
- Mirror the existing `SquadData` service pattern exactly — a new
  `src/app/shared/services/yield-curve-data.ts` with `HttpClient.get<T>()` against
  `/data/<file>.json`, plus typed row models in
  `src/app/shared/models/yield-curve.model.ts`.
- No live API, no backend to host or maintain. (Stretch goal: a Cloud Run function querying
  BigQuery on demand to demonstrate API design — added surface area, deferred.)

## Phase 5 — Angular frontend

New feature area under `src/app/pages/projects/yield-curve-dashboard/`, structured like
`squad-dashboard/` (a container component composing chart sub-components, `toSignal` over
the data service, Material for layout/toggles).

- **Charting: `ngx-echarts`** (already a dependency — `echarts@^6`, `ngx-echarts@^22`).
  Handles multi-series time data well and looks polished with low integration overhead.
  - `yield-curve-chart` — the curve (yield vs. maturity) for the current date, with a date
    slider/toggle to scrub history. Numeric x-axis by `maturity_months`.
  - `spread-chart` — 10Y-2Y (and 10Y-3M) spread line with a zero reference line and shaded
    inversion regions.
  - Optional stretch: a hand-built **D3** "curve shape over time" animated component for a
    more distinctive signal — at the cost of managing D3 inside Angular's change detection
    yourself. Default to ngx-echarts first.
- **Tabular view:** `mat-table` over the current curve / recent history — sortable with
  minimal work.
- Register the new project: add an entry to
  [projects.data.ts](../src/app/shared/data/projects.data.ts) (`category: 'personal'`,
  tags `['BigQuery', 'dbt', 'Python', 'GitHub Actions']`, with `repoUrl` and the dbt-docs
  link), and wire the dashboard into
  [projects.ts](../src/app/pages/projects/projects.ts) the way `SquadDashboard` is today.
- Follow the dataviz skill for palette/axes/legend before writing chart code.

**Done when:** the project page renders the live curve, spread chart, and table from the
committed JSON, and a fresh Actions run visibly updates them.

---

## Parallel option — Snowflake case study (only if needed)

If a role you are applying to **right now** lists Snowflake by name: build a stripped-down
version there in parallel — the dbt SQL is mostly portable — purely for
docs/screenshots/write-up, and treat it as a **separate case study**, not the thing powering
the live page. Otherwise don't split effort; go straight to BigQuery.

## Suggested order of work

1. GCP project + BigQuery sandbox + service account (Phase 1 auth).
2. Ingestion script + historical backfill (Phase 1).
3. dbt project, staging + marts + tests + docs (Phase 2).
4. Export script + JSON contract (Phase 4 data side).
5. GitHub Actions wiring end-to-end (Phase 3).
6. Angular service, dashboard, charts, project registration (Phase 5).
7. (Optional) D3 animated curve and/or Cloud Run API stretch goals.
