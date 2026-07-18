import { Component, computed, input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { NationalityRow } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-nationality-chart',
  imports: [BaseChartDirective],
  templateUrl: './nationality-chart.html',
  styleUrl: './nationality-chart.scss',
})
export class NationalityChart {
  readonly data = input.required<NationalityRow[]>();

  protected readonly chartType = 'bar' as const;

  protected readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Nationality Breakdown' },
    },
    scales: {
      x: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  protected readonly chartData = computed<ChartData<'bar'>>(() => {
    const sorted = [...this.data()].sort((a, b) => b.count - a.count);

    return {
      labels: sorted.map((row) => row.nationality),
      datasets: [
        {
          label: 'Players',
          data: sorted.map((row) => row.count),
          backgroundColor: '#3f51b5',
        },
      ],
    };
  });

  protected readonly chartHeight = computed(() => Math.max(this.data().length * 24, 200));
}
