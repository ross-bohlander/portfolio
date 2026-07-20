import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AqiData } from '../../../shared/services/aqi-data';
import { AqiChart } from './aqi-chart/aqi-chart';
import { AqiSummary } from './aqi-summary/aqi-summary';
import { AqiActionPanel } from './aqi-action-panel/aqi-action-panel';

@Component({
  selector: 'app-aqi-dashboard',
  imports: [AqiChart, AqiSummary, AqiActionPanel, MatCardModule, DatePipe],
  templateUrl: './aqi-dashboard.html',
  styleUrl: './aqi-dashboard.scss',
})
export class AqiDashboard {
  private readonly aqiData = inject(AqiData);

  protected readonly maxValues = toSignal(this.aqiData.getMaxValues(), { initialValue: [] });
  protected readonly pollutantAqi = toSignal(this.aqiData.getPollutantAqi(), { initialValue: [] });
  protected readonly dailyAqi = toSignal(this.aqiData.getDailyAqi(), { initialValue: [] });
  protected readonly pollutantGuidance = toSignal(this.aqiData.getPollutantGuidance(), { initialValue: [] });
  protected readonly meta = toSignal(this.aqiData.getMeta(), { initialValue: null });

  protected readonly daily = computed(() => this.dailyAqi()[0] ?? null);
  protected readonly guidance = computed(() => this.pollutantGuidance()[0] ?? null);
}
