import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { YieldCurveData } from '../../shared/services/yield-curve-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly yieldCurveData = inject(YieldCurveData);

  protected readonly currentCurve = toSignal(this.yieldCurveData.getCurrentCurve(), { initialValue: [] });
  protected readonly asOfDate = computed(() => this.currentCurve()[0]?.curve_date ?? '—');
}
