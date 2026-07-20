import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    slug: 'openaq-aqi',
    name: 'Indianapolis AQI Dashboard',
    shortSummary: 'Self-updating EPA AQI pipeline from OpenAQ data.',
    summary:
      "DuckDB + dbt pipeline pulling OpenAQ sensor data for Indianapolis, converting each pollutant's daily summary value (24-hour average for PM, daily max 8-hour for ozone, daily max 1-hour for NO2 and SO2) into an EPA AQI value via seeded breakpoint tables, and surfacing the day's worst pollutant and category.",
    tags: ['DuckDB', 'dbt', 'Python'],
    category: 'personal',
    repoUrl: 'https://github.com/ross-bohlander/portfolio/tree/develop/pipeline/openaq',
    liveUrl: '/projects/openaq-aqi',
  },
  {
    slug: 'yield-curve',
    name: 'Treasury Yield Curve',
    shortSummary: 'Daily par-yield feed on BigQuery, cron-refreshed.',
    summary:
      'Self-updating ELT pipeline pulling daily par-yield-curve rates straight from Treasury.gov into BigQuery, modeled with dbt into curve, history, and 10Y-2Y/10Y-3M spread marts, refreshed daily by GitHub Actions.',
    tags: ['BigQuery', 'dbt', 'Python', 'GitHub Actions'],
    category: 'personal',
    repoUrl: 'https://github.com/ross-bohlander/portfolio/tree/develop/pipeline',
    liveUrl: '/projects/yield-curve',
  },
  {
    slug: 'squad-planner',
    name: 'Squad Planner',
    shortSummary: 'Game-export squad analysis, Snowflake + dbt.',
    summary: 'Snowflake + dbt ELT pipeline turning a football manager HTML export into nationality, age, and attribute-progression marts.',
    tags: ['Snowflake', 'dbt', 'Python', 'SQL'],
    category: 'personal',
    repoUrl: 'https://github.com/ross-bohlander/portfolio/tree/develop/pipeline/squad_planner',
    liveUrl: '/projects/squad-planner',
  },
  {
    slug: 'accounting-platform-migration',
    name: 'Enterprise Accounting Platform Migration',
    shortSummary: 'Migrated core accounting and reporting pipelines.',
    summary:
      "Leading the ETL workstream for the firm's transition to a new accounting system — documenting legacy processes, producing source-to-target diagrams and sample files, refactoring production interfaces, and building reusable SQL functions that map warehouse data to the target platform's standards.",
    tags: ['SQL Server', 'ETL', 'Source-to-Target Mapping'],
    category: 'professional',
  },
  {
    slug: 'fee-automation',
    name: 'Futures and Options Fee Automation',
    shortSummary: 'Automated fee calculation and reconciliation.',
    summary:
      'End-to-end workflow that ingests broker fee files, applies configurable fee and matching rules, stages and reconciles transactions in SQL, imports completed records into the accounting system, and generates automated trade tickets — eliminating repetitive manual fee entry and lowering the risk of inaccurate transaction records.',
    tags: ['Python', 'SQL', 'Automation'],
    category: 'professional',
  },
  {
    slug: 'commingled-fund-processing',
    name: 'Commingled Fund Processing Automation',
    shortSummary: 'Automated processing for commingled fund flows.',
    summary:
      'Replaced a legacy Access-based workflow with Python, Perl, and SQL automation for daily NAV ingestion, historical-data-based fund pricing, subscription and redemption activity, accounting imports, and custodian-to-internal market-value reconciliation — centralizing a fragmented process and improving accuracy and auditability.',
    tags: ['Python', 'Perl', 'SQL', 'ETL'],
    category: 'professional',
  },
  {
    slug: 'collateral-margin-integration',
    name: 'Collateral and Margin Integration',
    shortSummary: 'Integrated collateral and margin across systems.',
    summary:
      'File-generation, ingestion, and secure-transfer workflows for collateral positions, agreements, interest, margin, and payment instructions, along with SQL-based account and counterparty mappings and accounting-system integrations — replacing manual preparation and review steps and reducing operational risk.',
    tags: ['SQL', 'SFTP', 'Integration'],
    category: 'professional',
  },
];
