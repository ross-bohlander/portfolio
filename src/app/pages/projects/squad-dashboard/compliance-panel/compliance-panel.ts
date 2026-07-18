import { Component, input } from '@angular/core';

import { ComplianceViolationWithTier } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-compliance-panel',
  imports: [],
  templateUrl: './compliance-panel.html',
  styleUrl: './compliance-panel.scss',
})
export class CompliancePanel {
  readonly violations = input.required<ComplianceViolationWithTier[]>();

  // TODO: table (Name, Age, Contract Length, Rule Violated), one row per
  // violation(), maybe a severity badge keyed off tier.
}
