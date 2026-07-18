import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { YieldCurveData } from '../../../shared/services/yield-curve-data';
import { CurvePoint } from '../../../shared/models/yield-curve.model';
import { YieldCurveChart } from './yield-curve-chart/yield-curve-chart';
import { SpreadChart } from './spread-chart/spread-chart';
import { CurveTable } from './curve-table/curve-table';

@Component({
  selector: 'app-yield-curve-dashboard',
  imports: [YieldCurveChart, SpreadChart, CurveTable, MatCardModule, MatSliderModule],
  templateUrl: './yield-curve-dashboard.html',
  styleUrl: './yield-curve-dashboard.scss',
})
export class YieldCurveDashboard {
  private readonly yieldCurveData = inject(YieldCurveData);

  protected readonly currentCurve = toSignal(this.yieldCurveData.getCurrentCurve(), { initialValue: [] });
  protected readonly yieldHistory = toSignal(this.yieldCurveData.getYieldHistory(), { initialValue: [] });
  protected readonly spread = toSignal(this.yieldCurveData.getSpread(), { initialValue: [] });

  protected readonly dates = computed(() => [...new Set(this.yieldHistory().map((row) => row.curve_date))].sort());
  protected readonly maxIndex = computed(() => Math.max(this.dates().length - 1, 0));

  // null = "showing the latest curve" (backed directly by mart_current_curve);
  // once the user drags the slider this holds an explicit index into dates().
  protected readonly selectedIndex = signal<number | null>(null);
  protected readonly sliderIndex = computed(() => this.selectedIndex() ?? this.maxIndex());
  protected readonly selectedDate = computed(() => this.dates()[this.sliderIndex()] ?? '');

  protected readonly displayedCurve = computed<CurvePoint[]>(() => {
    if (this.selectedIndex() === null) {
      return this.currentCurve();
    }
    const date = this.selectedDate();
    return this.yieldHistory().filter((row) => row.curve_date === date);
  });

  protected setSelectedIndex(index: number): void {
    this.selectedIndex.set(index);
  }
}
