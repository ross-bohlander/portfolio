import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

interface Skill {
  name: string;
  status: 'done' | 'pending';
  note: string;
}

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly skills: Skill[] = [
    { name: 'SQL', status: 'done', note: 'Squad planner' },
    { name: 'Snowflake', status: 'done', note: 'Squad planner' },
    { name: 'dbt', status: 'done', note: 'Squad planner' },
    { name: 'Python', status: 'done', note: 'Squad planner' },
    { name: 'Angular', status: 'pending', note: 'In progress' },
    { name: 'FRED API', status: 'pending', note: 'Planned' },
  ];
}
