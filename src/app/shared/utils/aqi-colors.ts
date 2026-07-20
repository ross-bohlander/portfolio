// EPA ColorVision Assist AQI palette (colorblind-friendly alternative to the standard AQI colors).
export interface AqiBand {
  category: string;
  max: number;
  background: string;
  foreground: string;
}

export const AQI_BANDS: AqiBand[] = [
  { category: 'GOOD', max: 50, background: 'rgb(158, 255, 145)', foreground: '#000' },
  { category: 'MODERATE', max: 100, background: 'rgb(255, 201, 5)', foreground: '#000' },
  { category: 'UNHEALTHY FOR SENSITIVE', max: 150, background: 'rgb(255, 130, 5)', foreground: '#000' },
  { category: 'UNHEALTHY', max: 200, background: 'rgb(240, 34, 0)', foreground: '#fff' },
  { category: 'VERY UNHEALTHY', max: 300, background: 'rgb(137, 9, 151)', foreground: '#fff' },
  { category: 'HAZARDOUS', max: Infinity, background: 'rgb(100, 0, 21)', foreground: '#fff' },
];

const BAND_BY_CATEGORY = new Map(AQI_BANDS.map((band) => [band.category, band]));

// Our seeded category text is abbreviated (matches the EPA breakpoints CSV); this restates it
// in the full official wording (Table 1) for display.
const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  GOOD: 'Good',
  MODERATE: 'Moderate',
  'UNHEALTHY FOR SENSITIVE': 'Unhealthy for Sensitive Groups',
  UNHEALTHY: 'Unhealthy',
  'VERY UNHEALTHY': 'Very Unhealthy',
  HAZARDOUS: 'Hazardous',
};

export function aqiBandForCategory(category: string): AqiBand | undefined {
  return BAND_BY_CATEGORY.get(category.toUpperCase());
}

export function categoryDisplayLabel(category: string): string {
  return CATEGORY_DISPLAY_LABELS[category.toUpperCase()] ?? category;
}

export function aqiBandForValue(aqiValue: number): AqiBand {
  return AQI_BANDS.find((band) => aqiValue <= band.max) ?? AQI_BANDS[AQI_BANDS.length - 1];
}
