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
      // `grouped` is a real bar-controller option (draws datasets in the same
      // category slot instead of side-by-side) but isn't in chart.js's own
      // scale types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      x: { grouped: false } as any,
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  protected readonly chartData = computed<ChartData<'bar'>>(() => {
    const squadBy = new Map(this.squadData().map((row) => [row.age_classification, row.raw_count]));
    const firstTeamBy = new Map(this.firstTeamData().map((row) => [row.age_classification, row.raw_count]));

    return {
      labels: CATEGORY_ORDER,
      datasets: [
        {
          label: 'Full Squad',
          data: CATEGORY_ORDER.map((category) => squadBy.get(category) ?? 0),
          backgroundColor: '#3f51b5',
          categoryPercentage: 0.6,
          barPercentage: 1,
        },
        {
          label: 'First Team',
          data: CATEGORY_ORDER.map((category) => firstTeamBy.get(category) ?? 0),
          backgroundColor: '#ff4081',
          categoryPercentage: 0.6,
          barPercentage: 0.5,
        },
      ],
    };
  });
}
