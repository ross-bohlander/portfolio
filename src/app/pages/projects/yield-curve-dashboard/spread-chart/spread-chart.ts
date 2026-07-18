import { Component, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

import { SpreadRow } from '../../../../shared/models/yield-curve.model';

@Component({
  selector: 'app-spread-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './spread-chart.html',
  styleUrl: './spread-chart.scss',
})
export class SpreadChart {
  readonly data = input.required<SpreadRow[]>();

  // Stable reference for [options] (init-only); reactive updates go through
  // [merge] to avoid a create-vs-update race in ngx-echarts.
  protected readonly initOptions: EChartsOption = {};

  protected readonly chartOption = computed<EChartsOption>(() => {
    const rows = [...this.data()].sort((a, b) => a.curve_date.localeCompare(b.curve_date));

    return {
      title: { text: '10Y-2Y / 10Y-3M Term Spread', left: 'center', textStyle: { fontSize: 13 } },
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0 },
      grid: { left: 50, right: 24, top: 40, bottom: 60 },
      xAxis: { type: 'time' },
      yAxis: { type: 'value', name: 'Spread (pts)' },
      dataZoom: [{ type: 'inside' }, { type: 'slider', height: 18, bottom: 28 }],
      series: [
        {
          name: '10Y-2Y',
          type: 'line',
          showSymbol: false,
          sampling: 'lttb',
          color: '#3f51b5',
          data: rows.map((r) => [r.curve_date, r.spread_10y_2y]),
          markLine: {
            symbol: 'none',
            silent: true,
            data: [{ yAxis: 0 }],
            lineStyle: { color: '#9e9e9e', type: 'dashed' },
            label: { show: false },
          },
          markArea: {
            silent: true,
            itemStyle: { color: 'rgba(211, 47, 47, 0.08)' },
            data: [[{ yAxis: 0 }, { yAxis: 'min' }]],
          },
        },
        {
          name: '10Y-3M',
          type: 'line',
          showSymbol: false,
          sampling: 'lttb',
          color: '#ff9800',
          data: rows.filter((r) => r.spread_10y_3m !== null).map((r) => [r.curve_date, r.spread_10y_3m]),
        },
      ],
    };
  });
}
