import { Component, computed, input } from '@angular/core';

import { PollutantAqi, PollutantMaxValue } from '../../../../shared/models/aqi.model';
import { aqiBandForValue } from '../../../../shared/utils/aqi-colors';
import { metaForParameter } from '../../../../shared/utils/aqi-parameters';

interface BarRow {
  parameter: string;
  label: string;
  aqiValue: number;
  rawText: string;
  isMainPollutant: boolean;
  color: string;
  widthPercent: number;
}

interface AxisTick {
  value: number;
  label: string;
}

// EPA category breakpoints (Table 1): Good/Moderate/USG/Unhealthy/Very Unhealthy end here,
// Hazardous is the open-ended 301+ bucket.
const CATEGORY_THRESHOLDS = [50, 100, 150, 200, 300];

@Component({
  selector: 'app-aqi-chart',
  imports: [],
  templateUrl: './aqi-chart.html',
  styleUrl: './aqi-chart.scss',
})
export class AqiChart {
  readonly pollutantAqi = input.required<PollutantAqi[]>();
  readonly maxValues = input<PollutantMaxValue[]>([]);

  // 300 is the typical top (index runs to 500); extend it on real Hazardous days instead of
  // clipping the bar, rounding up to the next clean 100 so ticks stay round numbers.
  protected readonly axisMax = computed(() => {
    const highest = Math.max(0, ...this.pollutantAqi().map((row) => row.aqi_value));
    return highest > 300 ? Math.ceil(highest / 100) * 100 : 300;
  });

  protected readonly axisTicks = computed<AxisTick[]>(() => {
    const max = this.axisMax();
    const ticks: AxisTick[] = [];
    for (let value = 0; value <= max; value += 100) {
      ticks.push({ value, label: value === 300 && max === 300 ? '300+' : String(value) });
    }
    return ticks;
  });

  protected readonly thresholdPercents = computed(() =>
    CATEGORY_THRESHOLDS.filter((threshold) => threshold < this.axisMax()).map(
      (threshold) => (threshold / this.axisMax()) * 100
    )
  );

  protected readonly rows = computed<BarRow[]>(() => {
    const sorted = [...this.pollutantAqi()].sort((a, b) => b.aqi_value - a.aqi_value);
    const rawByParameter = new Map(this.maxValues().map((row) => [row.parameter, row.max_value]));
    const mainPollutant = sorted[0]?.parameter;
    const max = this.axisMax();

    return sorted.map((row) => {
      const meta = metaForParameter(row.parameter);
      const raw = rawByParameter.get(row.parameter);
      return {
        parameter: row.parameter,
        label: meta.label,
        aqiValue: row.aqi_value,
        rawText: raw !== undefined ? `${raw} ${meta.unit} · ${meta.window}` : '',
        isMainPollutant: row.parameter === mainPollutant,
        color: aqiBandForValue(row.aqi_value).background,
        widthPercent: Math.min(100, (row.aqi_value / max) * 100),
      };
    });
  });
}
