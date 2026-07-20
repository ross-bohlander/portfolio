import { Component, computed, input } from '@angular/core';

import { AqiMeta, DailyAqi } from '../../../../shared/models/aqi.model';
import { aqiBandForCategory, categoryDisplayLabel } from '../../../../shared/utils/aqi-colors';
import { metaForParameter } from '../../../../shared/utils/aqi-parameters';
import { relativeDayLabel } from '../../../../shared/utils/relative-time';

@Component({
  selector: 'app-aqi-summary',
  imports: [],
  templateUrl: './aqi-summary.html',
  styleUrl: './aqi-summary.scss',
})
export class AqiSummary {
  readonly daily = input<DailyAqi | null>(null);
  readonly meta = input<AqiMeta | null>(null);

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

  // The ingest job always targets the day before generated_at (see
  // pipeline/openaq/openaq_ingest.py), so that's the reading's effective date.
  protected readonly sampleLabel = computed(() => {
    const meta = this.meta();
    if (!meta) return 'sample';
    const generatedAt = new Date(meta.generated_at);
    const readingDate = new Date(generatedAt.getTime() - 86400000);
    return `sample, ${relativeDayLabel(readingDate)}`;
  });
}
