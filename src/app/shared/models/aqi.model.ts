export interface PollutantMaxValue {
  parameter: string;
  max_value: number;
}

export interface PollutantAqi {
  parameter: string;
  aqi_value: number;
}

export interface DailyAqi {
  aqi_category: string;
  max_value: number;
  main_pollutant: string;
}

export interface PollutantGuidance {
  aqi_category: string;
  max_value: number;
  main_pollutant: string;
  sensitive_groups: string;
  cautionary_statement: string;
}

export interface AqiMeta {
  generated_at: string;
}
