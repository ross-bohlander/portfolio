import { Component, computed, input } from '@angular/core';

import { PollutantGuidance } from '../../../../shared/models/aqi.model';
import { aqiBandForCategory } from '../../../../shared/utils/aqi-colors';

@Component({
  selector: 'app-aqi-action-panel',
  imports: [],
  templateUrl: './aqi-action-panel.html',
  styleUrl: './aqi-action-panel.scss',
})
export class AqiActionPanel {
  readonly guidance = input<PollutantGuidance | null>(null);

  // EPA reserves cautionary/sensitive-group reporting for pollutants with an AQI above 100.
  protected readonly visible = computed(() => (this.guidance()?.max_value ?? 0) > 100);
  protected readonly band = computed(() => {
    const guidance = this.guidance();
    return guidance ? aqiBandForCategory(guidance.aqi_category) : undefined;
  });
}
