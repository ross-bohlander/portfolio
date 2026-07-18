import { Component, computed, input } from '@angular/core';

import { CurvePoint } from '../../../../shared/models/yield-curve.model';

@Component({
  selector: 'app-curve-table',
  imports: [],
  templateUrl: './curve-table.html',
  styleUrl: './curve-table.scss',
})
export class CurveTable {
  readonly points = input.required<CurvePoint[]>();

  protected readonly rows = computed(() => [...this.points()].sort((a, b) => a.maturity_months - b.maturity_months));
}
