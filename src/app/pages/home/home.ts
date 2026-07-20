import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AqiData } from '../../shared/services/aqi-data';
import { aqiBandForValue, categoryDisplayLabel } from '../../shared/utils/aqi-colors';

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly aqiData = inject(AqiData);

  private readonly dailyAqi = toSignal(this.aqiData.getDailyAqi(), { initialValue: [] });
  private readonly meta = toSignal(this.aqiData.getMeta(), { initialValue: null });

  protected readonly daily = computed(() => this.dailyAqi()[0] ?? null);

  protected readonly band = computed(() => {
    const daily = this.daily();
    return daily ? aqiBandForValue(daily.max_value) : undefined;
  });

  protected readonly categoryLabel = computed(() => {
    const daily = this.daily();
    return daily ? categoryDisplayLabel(daily.aqi_category) : '';
  });

  protected readonly refreshedLabel = computed(() => {
    const meta = this.meta();
    return meta ? relativeTime(meta.generated_at) : '';
  });
}
