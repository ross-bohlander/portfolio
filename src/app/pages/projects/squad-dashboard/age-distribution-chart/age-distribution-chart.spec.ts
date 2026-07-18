import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AgeDistributionChart } from './age-distribution-chart';

describe('AgeDistributionChart', () => {
  let component: AgeDistributionChart;
  let fixture: ComponentFixture<AgeDistributionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeDistributionChart],
      providers: [provideCharts(withDefaultRegisterables())],
    }).compileComponents();

    fixture = TestBed.createComponent(AgeDistributionChart);
    fixture.componentRef.setInput('squadData', []);
    fixture.componentRef.setInput('firstTeamData', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
