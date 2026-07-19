import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface SkillGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly skillGroups: SkillGroup[] = [
    { category: 'Languages & Data', items: ['Python', 'SQL (T-SQL)', 'pandas', 'Perl'] },
    {
      category: 'Data Engineering',
      items: ['ETL/ELT', 'Snowflake', 'BigQuery', 'GCP', 'dbt', 'SQL Server', 'Data Modeling & Warehousing'],
    },
    {
      category: 'DevOps & Orchestration',
      items: ['Git', 'Azure DevOps', 'GitHub Actions', 'CI/CD', 'Docker', 'Control-M', 'Linux'],
    },
    { category: 'Reporting & Analytics', items: ['Tableau', 'Power BI', 'Matplotlib', 'Excel'] },
  ];

  protected readonly currentlyBuilding: string[] = ['Angular', 'databricks'];}
