export interface CurvePoint {
  curve_date: string;
  maturity_label: string;
  maturity_months: number;
  yield_pct: number;
}

export interface SpreadRow {
  curve_date: string;
  yield_3m: number | null;
  yield_2y: number;
  yield_10y: number;
  spread_10y_2y: number;
  spread_10y_3m: number | null;
}
