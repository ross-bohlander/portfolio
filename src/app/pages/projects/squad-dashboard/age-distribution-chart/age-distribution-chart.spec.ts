import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { AgeDistributionChart } from './age-distribution-chart';
import { installResizeObserverStub } from '../../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('AgeDistributionChart', () => {
  let component: AgeDistributionChart;
  let fixture: ComponentFixture<AgeDistributionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeDistributionChart],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
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
