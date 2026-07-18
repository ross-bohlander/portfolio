import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CurvePoint, SpreadRow } from '../models/yield-curve.model';

const DATA_URL = '/data';

@Service()
export class YieldCurveData {
  private readonly http = inject(HttpClient);

  getCurrentCurve() {
    return this.http.get<CurvePoint[]>(`${DATA_URL}/mart_current_curve.json`);
  }

  getYieldHistory() {
    return this.http.get<CurvePoint[]>(`${DATA_URL}/mart_yield_history.json`);
  }

  getSpread() {
    return this.http.get<SpreadRow[]>(`${DATA_URL}/mart_spread_10y_2y.json`);
  }
}
