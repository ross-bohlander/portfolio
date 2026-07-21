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
  // Tier 1 — the headline tools: proven, production-grade, what I'd lead a project with.
  protected readonly coreStack: string[] = ['Python', 'SQL (T-SQL)', 'Snowflake', 'SQL Server', 'Git', 'CI/CD'];

  // Tier 2 — real, shipped experience; supporting cast rather than headline.
  protected readonly alsoWorkWith: string[] = [
    'pandas',
    'Perl',
    'dbt',
    'ETL/ELT',
    'GCP',
    'BigQuery',
    'DuckDB',
    'Data modeling',
    'Azure DevOps',
    'GitHub Actions',
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
