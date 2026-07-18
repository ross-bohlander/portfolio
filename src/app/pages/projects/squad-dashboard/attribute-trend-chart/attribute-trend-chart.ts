import { Component, computed, input, signal } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
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

function humanize(key: string): string {
  return key
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

@Component({
  selector: 'app-attribute-trend-chart',
  imports: [NgxEchartsDirective, MatFormFieldModule, MatSelectModule],
  templateUrl: './attribute-trend-chart.html',
  styleUrl: './attribute-trend-chart.scss',
})
export class AttributeTrendChart {
  readonly data = input.required<AttributeRow[]>();

  protected readonly players = computed(() => [...new Set(this.data().map((row) => row.name))].sort());

  protected readonly selectedPlayer = signal<string>('');

  // A stable reference bound to [options] so ngx-echarts only initializes
  // the chart once; all reactive updates flow through [merge] instead,
  // which avoids a create-vs-update race when chartOption() changes shortly
  // after init (e.g. once async data arrives).
  protected readonly initOptions: EChartsOption = {};

  protected readonly chartOption = computed<EChartsOption>(() => {
    const player = this.selectedPlayer() || this.players()[0] || '';
    const rows = this.data()
      .filter((row) => row.name === player)
      .sort((a, b) => a.loaded_at.localeCompare(b.loaded_at));

    const dates = rows.map((row) => new Date(row.loaded_at).toLocaleDateString());

    return {
      title: { text: 'Attribute Progression', left: 'center', textStyle: { fontSize: 13 } },
      tooltip: { trigger: 'axis' },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 'middle',
        textStyle: { fontSize: 11 },
      },
      grid: { left: 40, right: 140, top: 40, bottom: 30 },
      xAxis: { type: 'category', data: dates },
      yAxis: { type: 'value', min: 0, max: 20 },
      series: ATTRIBUTE_KEYS.map((key, i) => ({
        name: humanize(key),
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: rows.map((row) => row[key]),
        color: ATTRIBUTE_COLORS[i % ATTRIBUTE_COLORS.length],
      })),
    };
  });
}
