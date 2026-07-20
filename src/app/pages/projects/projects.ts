import { Component, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { PROJECTS } from '../../shared/data/projects.data';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, RouterLink],
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
}
