import { Component, computed, input } from '@angular/core';

import { ComplianceTier, ComplianceViolationWithTier } from '../../../../shared/models/squad-data.model';

const TIER_LABELS: Record<ComplianceTier, string> = {
  over_30: 'Over 30: contract exceeds 3 years',
  over_32: 'Over 32: contract exceeds 2 years',
  over_34: 'Over 34: contract exceeds 1 year',
};

interface ViolationRow extends ComplianceViolationWithTier {
  contractYears: number;
  ruleLabel: string;
}

@Component({
  selector: 'app-compliance-panel',
  imports: [],
  templateUrl: './compliance-panel.html',
  styleUrl: './compliance-panel.scss',
})
export class CompliancePanel {
  readonly violations = input.required<ComplianceViolationWithTier[]>();

  protected readonly rows = computed<ViolationRow[]>(() =>
    this.violations()
      .map((violation) => ({
        ...violation,
        contractYears: this.yearsBetween(violation.contract_begin_date, violation.contract_end_date),
        ruleLabel: TIER_LABELS[violation.tier],
      }))
      .sort((a, b) => b.age - a.age)
  );

  private yearsBetween(start: string, end: string): number {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    return Math.round((ms / (1000 * 60 * 60 * 24 * 365.25)) * 10) / 10;
  }
}
