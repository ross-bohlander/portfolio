import { Component, computed, input } from '@angular/core';

import { DailyAqi } from '../../../../shared/models/aqi.model';
import { aqiBandForCategory, categoryDisplayLabel } from '../../../../shared/utils/aqi-colors';
import { metaForParameter } from '../../../../shared/utils/aqi-parameters';

@Component({
  selector: 'app-aqi-summary',
  imports: [],
  templateUrl: './aqi-summary.html',
  styleUrl: './aqi-summary.scss',
})
export class AqiSummary {
  readonly daily = input<DailyAqi | null>(null);

  protected readonly band = computed(() => {
    const daily = this.daily();
    return daily ? aqiBandForCategory(daily.aqi_category) : undefined;
  });

  protected readonly categoryLabel = computed(() => {
    const daily = this.daily();
    return daily ? categoryDisplayLabel(daily.aqi_category) : '';
  });

  protected readonly mainPollutantLabel = computed(() => {
    const daily = this.daily();
    return daily ? metaForParameter(daily.main_pollutant).label : '';
  });
}
