import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';

import { SquadData } from '../../../shared/services/squad-data';
import { ComplianceTier, ComplianceViolationWithTier } from '../../../shared/models/squad-data.model';
import { NationalityChart } from './nationality-chart/nationality-chart';
import { AgeDistributionChart } from './age-distribution-chart/age-distribution-chart';
import { AttributeTrendChart } from './attribute-trend-chart/attribute-trend-chart';
import { CompliancePanel } from './compliance-panel/compliance-panel';

const TIERS: ComplianceTier[] = ['over_30', 'over_32', 'over_34'];

@Component({
  selector: 'app-squad-dashboard',
  imports: [NationalityChart, AgeDistributionChart, AttributeTrendChart, CompliancePanel],
  templateUrl: './squad-dashboard.html',
  styleUrl: './squad-dashboard.scss',
})
export class SquadDashboard {
  private readonly squadData = inject(SquadData);

  protected readonly nationalities = toSignal(this.squadData.getNationalities(), { initialValue: [] });
  protected readonly nationalitiesFirstTeam = toSignal(this.squadData.getNationalities(true), { initialValue: [] });

  protected readonly ageDistribution = toSignal(this.squadData.getAgeDistribution(), { initialValue: [] });
  protected readonly ageDistributionFirstTeam = toSignal(this.squadData.getAgeDistribution(true), { initialValue: [] });

  protected readonly attributes = toSignal(this.squadData.getAttributes(), { initialValue: [] });

  protected readonly complianceViolations = toSignal(
    combineLatest(TIERS.map((tier) =>
      this.squadData.getComplianceViolations(tier).pipe(
        map((rows): ComplianceViolationWithTier[] => rows.map((row) => ({ ...row, tier })))
      )
    )).pipe(map((rowsByTier) => rowsByTier.flat())),
    { initialValue: [] as ComplianceViolationWithTier[] }
  );
}
