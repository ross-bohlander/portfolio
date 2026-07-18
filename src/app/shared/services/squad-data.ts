import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  AgeDistributionRow,
  AttributeRow,
  ComplianceTier,
  ComplianceViolation,
  NationalityRow,
} from '../models/squad-data.model';

const DATA_URL = '/data';

@Service()
export class SquadData {
  private readonly http = inject(HttpClient);

  getNationalities(firstTeamOnly = false) {
    const file = firstTeamOnly ? 'mart_nationalities_first_team' : 'mart_nationalities';
    return this.http.get<NationalityRow[]>(`${DATA_URL}/${file}.json`);
  }

  getAgeDistribution(firstTeamOnly = false) {
    const file = firstTeamOnly ? 'mart_age_distribution_first_team' : 'mart_age_distribution';
    return this.http.get<AgeDistributionRow[]>(`${DATA_URL}/${file}.json`);
  }

  getAttributes() {
    return this.http.get<AttributeRow[]>(`${DATA_URL}/mart_attributes.json`);
  }

  getComplianceViolations(tier: ComplianceTier) {
    return this.http.get<ComplianceViolation[]>(`${DATA_URL}/mart_contract_rule_${tier}.json`);
  }
}
