import { Component, computed, input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { AgeDistributionRow } from '../../../../shared/models/squad-data.model';

const CATEGORY_ORDER = [
  'Developmental Youth',
  'Developed Youth',
  'Approaching Prime',
  'Prime',
  'Mentor',
];

@Component({
  selector: 'app-age-distribution-chart',
  imports: [BaseChartDirective],
  templateUrl: './age-distribution-chart.html',
  styleUrl: './age-distribution-chart.scss',
})
export class AgeDistributionChart {
  readonly squadData = input.required<AgeDistributionRow[]>();
  readonly firstTeamData = input.required<AgeDistributionRow[]>();

  protected readonly chartType = 'bar' as const;

  protected readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Age Distribution: Squad vs First Team' },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  // First Team is a subset of the full squad, so stacking "everyone else" +
  // "First Team" reproduces the Full Squad total while shading how much of
  // it is First Team.
  protected readonly chartData = computed<ChartData<'bar'>>(() => {
    const squadBy = new Map(this.squadData().map((row) => [row.age_classification, row.raw_count]));
    const firstTeamBy = new Map(this.firstTeamData().map((row) => [row.age_classification, row.raw_count]));

    const firstTeamCounts = CATEGORY_ORDER.map((category) => firstTeamBy.get(category) ?? 0);
    const restOfSquadCounts = CATEGORY_ORDER.map(
      (category, i) => (squadBy.get(category) ?? 0) - firstTeamCounts[i]
    );

    return {
      labels: CATEGORY_ORDER,
      datasets: [
        {
          label: 'Rest of Squad',
          data: restOfSquadCounts,
          backgroundColor: '#c5cae9',
        },
        {
          label: 'First Team',
          data: firstTeamCounts,
          backgroundColor: '#ff4081',
        },
      ],
    };
  });
}
