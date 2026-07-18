import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    slug: 'squad-planner',
    name: 'Squad Planner',
    summary: 'Snowflake + dbt ELT pipeline turning a football manager HTML export into nationality, age, and attribute-progression marts.',
    tags: ['Snowflake', 'dbt', 'Python', 'SQL'],
    category: 'personal',
  },
  {
    slug: 'accounting-platform-migration',
    name: 'Enterprise Accounting Platform Migration',
    summary:
      "Leading the ETL workstream for the firm's transition to a new accounting system — documenting legacy processes, producing source-to-target diagrams and sample files, refactoring production interfaces, and building reusable SQL functions that map warehouse data to the target platform's standards.",
    tags: ['SQL Server', 'ETL', 'Source-to-Target Mapping'],
    category: 'professional',
  },
  {
    slug: 'fee-automation',
    name: 'Futures and Options Fee Automation',
    summary:
      'End-to-end workflow that ingests broker fee files, applies configurable fee and matching rules, stages and reconciles transactions in SQL, imports completed records into the accounting system, and generates automated trade tickets — eliminating repetitive manual fee entry and lowering the risk of inaccurate transaction records.',
    tags: ['Python', 'SQL', 'Automation'],
    category: 'professional',
  },
  {
    slug: 'commingled-fund-processing',
    name: 'Commingled Fund Processing Automation',
    summary:
      'Replaced a legacy Access-based workflow with Python, Perl, and SQL automation for daily NAV ingestion, historical-data-based fund pricing, subscription and redemption activity, accounting imports, and custodian-to-internal market-value reconciliation — centralizing a fragmented process and improving accuracy and auditability.',
    tags: ['Python', 'Perl', 'SQL', 'ETL'],
    category: 'professional',
  },
  {
    slug: 'collateral-margin-integration',
    name: 'Collateral and Margin Integration',
    summary:
      'File-generation, ingestion, and secure-transfer workflows for collateral positions, agreements, interest, margin, and payment instructions, along with SQL-based account and counterparty mappings and accounting-system integrations — replacing manual preparation and review steps and reducing operational risk.',
    tags: ['SQL', 'SFTP', 'Integration'],
    category: 'professional',
  },
];
