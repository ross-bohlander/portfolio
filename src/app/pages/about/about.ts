import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  // Tier 1 — the stack I reach for daily and would stake a project on.
  protected readonly coreStack: string[] = ['Python', 'SQL (T-SQL)', 'dbt', 'Snowflake', 'BigQuery', 'GitHub Actions'];

  // Tier 2 — tools I've shipped with but wouldn't lead on.
  protected readonly alsoWorkWith: string[] = [
    'pandas',
    'Perl',
    'ETL/ELT',
    'GCP',
    'SQL Server',
    'DuckDB',
    'Data modeling',
    'Git',
    'Azure DevOps',
    'CI/CD',
    'Docker',
    'Control-M',
    'Linux',
    'Tableau',
    'Power BI',
    'Matplotlib',
    'Excel',
  ];

  protected readonly currentlyBuilding: string[] = ['Angular', 'Databricks'];

  protected readonly certifications: { name: string; issuer: string }[] = [
    { name: 'Snowflake Data Engineering Professional', issuer: 'Snowflake · 2026' },
  ];
}
