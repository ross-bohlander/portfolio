export interface ParameterMeta {
  label: string;
  unit: string;
  window: string;
}

// Matches EPA Table 6's averaging window per pollutant (see stg_openaq_measurements/mart_max_values
// for how each is computed): PM is a 24-hr average, NO2/SO2 are a daily max 1-hr, O3 is a daily max 8-hr.
const PARAMETER_META: Record<string, ParameterMeta> = {
  pm25: { label: 'PM2.5', unit: 'µg/m³', window: '24-hr avg' },
  pm10: { label: 'PM10', unit: 'µg/m³', window: '24-hr avg' },
  no2: { label: 'NO2', unit: 'ppb', window: 'max 1-hr' },
  so2: { label: 'SO2', unit: 'ppb', window: 'max 1-hr' },
  o3: { label: 'Ozone', unit: 'ppm', window: 'max 8-hr' },
};

export function metaForParameter(parameter: string): ParameterMeta {
  return PARAMETER_META[parameter] ?? { label: parameter.toUpperCase(), unit: '', window: '' };
}
