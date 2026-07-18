export interface NationalityRow {
  nationality: string;
  count: number;
  pct_of_squad: number;
}

export interface AgeDistributionRow {
  age_classification: string;
  raw_count: number;
  pct_of_squad: number;
  average_age: number;
}

export interface AttributeRow {
  name: string;
  position: string;
  age: number;
  passing: number;
  vision: number;
  decisions: number;
  off_the_ball: number;
  dribbling: number;
  finishing: number;
  composure: number;
  work_rate: number;
  stamina: number;
  pace: number;
  acceleration: number;
  strength: number;
  heading: number;
  jumping: number;
  loaded_at: string;
}

export interface ComplianceViolation {
  name: string;
  age: number;
  agreed_playing_time: string;
  starts: number;
  salary: number;
  contract_begin_date: string;
  contract_end_date: string;
}

export type ComplianceTier = 'over_30' | 'over_32' | 'over_34';

export type ComplianceViolationWithTier = ComplianceViolation & { tier: ComplianceTier };
