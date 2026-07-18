import { Component, input } from '@angular/core';

import { AgeDistributionRow } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-age-distribution-chart',
  imports: [],
  templateUrl: './age-distribution-chart.html',
  styleUrl: './age-distribution-chart.scss',
})
export class AgeDistributionChart {
  readonly squadData = input.required<AgeDistributionRow[]>();
  readonly firstTeamData = input.required<AgeDistributionRow[]>();

  // TODO: grouped bar chart, squad vs first team, by age_classification.
}
