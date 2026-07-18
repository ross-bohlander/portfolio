import { Component, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

import { NationalityRow } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-nationality-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './nationality-chart.html',
  styleUrl: './nationality-chart.scss',
})
export class NationalityChart {
  readonly data = input.required<NationalityRow[]>();

  protected readonly chartHeight = computed(() => Math.max(this.data().length * 24, 200));

  // Stable reference for [options] (init-only); reactive updates go through
  // [merge] to avoid a create-vs-update race in ngx-echarts.
  protected readonly initOptions: EChartsOption = {};

  protected readonly chartOption = computed<EChartsOption>(() => {
    const sorted = [...this.data()].sort((a, b) => b.count - a.count);

    return {
      title: { text: 'Nationality Breakdown', left: 'center', textStyle: { fontSize: 13 } },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: 60, right: 24, top: 40, bottom: 30 },
      xAxis: { type: 'value', min: 0 },
      yAxis: { type: 'category', data: sorted.map((row) => row.nationality), inverse: true },
      series: [
        {
          name: 'Players',
          type: 'bar',
          data: sorted.map((row) => row.count),
          color: '#3f51b5',
          barMaxWidth: 18,
        },
      ],
    };
  });
}
