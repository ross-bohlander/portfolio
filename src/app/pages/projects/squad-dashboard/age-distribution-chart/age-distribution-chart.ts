import { Component, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

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
  imports: [NgxEchartsDirective],
  templateUrl: './age-distribution-chart.html',
  styleUrl: './age-distribution-chart.scss',
})
export class AgeDistributionChart {
  readonly squadData = input.required<AgeDistributionRow[]>();
  readonly firstTeamData = input.required<AgeDistributionRow[]>();

  // Stable reference for [options] (init-only); reactive updates go through
  // [merge] to avoid a create-vs-update race in ngx-echarts.
  protected readonly initOptions: EChartsOption = {};

  // First Team is a subset of the full squad, so stacking "everyone else" +
  // "First Team" reproduces the Full Squad total while shading how much of
  // it is First Team.
  protected readonly chartOption = computed<EChartsOption>(() => {
    const squadBy = new Map(this.squadData().map((row) => [row.age_classification, row.raw_count]));
    const firstTeamBy = new Map(this.firstTeamData().map((row) => [row.age_classification, row.raw_count]));

    const firstTeamCounts = CATEGORY_ORDER.map((category) => firstTeamBy.get(category) ?? 0);
    const restOfSquadCounts = CATEGORY_ORDER.map(
      (category, i) => (squadBy.get(category) ?? 0) - firstTeamCounts[i]
    );

    return {
      title: { text: 'Age Distribution: Squad vs First Team', left: 'center', textStyle: { fontSize: 13 } },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { bottom: 0, textStyle: { fontSize: 11 } },
      grid: { left: 40, right: 24, top: 40, bottom: 80 },
      xAxis: { type: 'category', data: CATEGORY_ORDER, axisLabel: { rotate: 20 } },
      yAxis: { type: 'value', minInterval: 1 },
      series: [
        {
          name: 'Rest of Squad',
          type: 'bar',
          stack: 'total',
          data: restOfSquadCounts,
          color: '#c5cae9',
        },
        {
          name: 'First Team',
          type: 'bar',
          stack: 'total',
          data: firstTeamCounts,
          color: '#ff4081',
        },
      ],
    };
  });
}
