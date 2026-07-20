import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AqiMeta, DailyAqi, PollutantAqi, PollutantGuidance, PollutantMaxValue } from '../models/aqi.model';

const DATA_URL = '/data';

@Service()
export class AqiData {
  private readonly http = inject(HttpClient);

  getMaxValues() {
    return this.http.get<PollutantMaxValue[]>(`${DATA_URL}/mart_max_values.json`);
  }

  getPollutantAqi() {
    return this.http.get<PollutantAqi[]>(`${DATA_URL}/mart_aqi.json`);
  }

  getDailyAqi() {
    return this.http.get<DailyAqi[]>(`${DATA_URL}/mart_max_aqi.json`);
  }

  getPollutantGuidance() {
    return this.http.get<PollutantGuidance[]>(`${DATA_URL}/mart_pollutant_guidance.json`);
  }

  getMeta() {
    return this.http.get<AqiMeta>(`${DATA_URL}/mart_openaq_meta.json`);
  }
}
