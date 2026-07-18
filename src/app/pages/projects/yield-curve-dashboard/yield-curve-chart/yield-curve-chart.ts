import { Component, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

import { CurvePoint } from '../../../../shared/models/yield-curve.model';

@Component({
  selector: 'app-yield-curve-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './yield-curve-chart.html',
  styleUrl: './yield-curve-chart.scss',
})
export class YieldCurveChart {
  readonly points = input.required<CurvePoint[]>();
  readonly dateLabel = input<string>('');

  // Stable reference for [options] (init-only); reactive updates go through
  // [merge] to avoid a create-vs-update race in ngx-echarts.
  protected readonly initOptions: EChartsOption = {};

  protected readonly chartOption = computed<EChartsOption>(() => {
    const sorted = [...this.points()].sort((a, b) => a.maturity_months - b.maturity_months);

    return {
      title: {
        text: this.dateLabel() ? `Par Yield Curve — ${this.dateLabel()}` : 'Par Yield Curve',
        left: 'center',
        textStyle: { fontSize: 13 },
      },
      tooltip: { trigger: 'axis' },
      grid: { left: 50, right: 24, top: 40, bottom: 30 },
      xAxis: { type: 'category', data: sorted.map((p) => p.maturity_label) },
      yAxis: { type: 'value', name: 'Yield (%)' },
      series: [
        {
          name: 'Par Yield',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          data: sorted.map((p) => p.yield_pct),
          color: '#3f51b5',
        },
      ],
    };
  });
}
