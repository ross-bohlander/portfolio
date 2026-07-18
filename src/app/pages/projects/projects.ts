import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PROJECTS } from '../../shared/data/projects.data';
import { Project } from '../../shared/models/project.model';
import { SquadDashboard } from './squad-dashboard/squad-dashboard';
import { YieldCurveDashboard } from './yield-curve-dashboard/yield-curve-dashboard';

@Component({
  selector: 'app-projects',
  imports: [SquadDashboard, YieldCurveDashboard, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects: Project[] = PROJECTS;

  protected readonly personalProjects = computed(() =>
    this.projects.filter((project) => project.category === 'personal')
  );
  protected readonly professionalProjects = computed(() =>
    this.projects.filter((project) => project.category === 'professional')
  );

  protected readonly activeSlug = signal<string>(PROJECTS[0]?.slug ?? '');

  protected readonly activeProject = computed(() =>
    this.projects.find((project) => project.slug === this.activeSlug())
  );

  protected selectProject(slug: string): void {
    this.activeSlug.set(slug);
  }
}
