import { Project } from '../models/project.model';

// TODO: flesh out each project, add real repo/live links and screenshots.
export const PROJECTS: Project[] = [
  {
    slug: 'squad-planner',
    name: 'Squad Planner',
    summary: 'Snowflake + dbt ELT pipeline turning a football manager HTML export into nationality, age, and attribute-progression marts.',
    tags: ['Snowflake', 'dbt', 'Python', 'SQL'],
  },
];
