import { Component, computed, input, signal } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AttributeRow } from '../../../../shared/models/squad-data.model';

const ATTRIBUTE_KEYS = [
  'passing',
  'vision',
  'decisions',
  'off_the_ball',
  'dribbling',
  'finishing',
  'composure',
  'work_rate',
  'stamina',
  'pace',
  'acceleration',
  'strength',
  'heading',
  'jumping',
] as const satisfies readonly (keyof AttributeRow)[];

const ATTRIBUTE_COLORS = [
  '#3f51b5',
  '#ff4081',
  '#4caf50',
  '#ff9800',
  '#9c27b0',
  '#00bcd4',
  '#795548',
  '#607d8b',
  '#e91e63',
  '#8bc34a',
  '#ffc107',
  '#2196f3',
  '#673ab7',
  '#009688',
];

@Component({
  selector: 'app-attribute-trend-chart',
  imports: [BaseChartDirective, MatFormFieldModule, MatSelectModule],
  templateUrl: './attribute-trend-chart.html',
  styleUrl: './attribute-trend-chart.scss',
})
export class AttributeTrendChart {
  readonly data = input.required<AttributeRow[]>();

  protected readonly players = computed(() => [...new Set(this.data().map((row) => row.name))].sort());

  protected readonly selectedPlayer = signal<string>('');

  protected readonly chartType = 'line' as const;

  protected readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Attribute Progression' },
    },
    scales: {
      y: { beginAtZero: true, suggestedMax: 20 },
    },
  };

  protected readonly chartData = computed<ChartData<'line'>>(() => {
    const player = this.selectedPlayer() || this.players()[0] || '';
    const rows = this.data()
      .filter((row) => row.name === player)
      .sort((a, b) => a.loaded_at.localeCompare(b.loaded_at));

    return {
      labels: rows.map((row) => new Date(row.loaded_at).toLocaleDateString()),
      datasets: ATTRIBUTE_KEYS.map((key, i) => ({
        label: key,
        data: rows.map((row) => row[key]),
        borderColor: ATTRIBUTE_COLORS[i % ATTRIBUTE_COLORS.length],
        tension: 0.2,
      })),
    };
  });
}
