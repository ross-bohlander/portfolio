import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PROJECTS } from '../../../shared/data/projects.data';
import { SquadDashboard } from '../squad-dashboard/squad-dashboard';
import { YieldCurveDashboard } from '../yield-curve-dashboard/yield-curve-dashboard';
import { AqiDashboard } from '../aqi-dashboard/aqi-dashboard';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, MatButtonModule, MatIconModule, SquadDashboard, YieldCurveDashboard, AqiDashboard],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);

  protected readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: null,
  });

  protected readonly project = computed(() => {
    const slug = this.slug();
    return slug ? PROJECTS.find((project) => project.slug === slug) : undefined;
  });
}
