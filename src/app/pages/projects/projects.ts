import { Component, signal } from '@angular/core';

import { PROJECTS } from '../../shared/data/projects.data';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects: Project[] = PROJECTS;
  protected readonly activeSlug = signal<string>(PROJECTS[0]?.slug ?? '');

  // TODO: a method to update activeSlug() when a tab is clicked,
  // and a template that renders one tab button per project + the
  // active project's detail (image, summary, tags, links).
}
