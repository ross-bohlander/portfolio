import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { YieldCurveChart } from './yield-curve-chart';
import { installResizeObserverStub } from '../../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('YieldCurveChart', () => {
  let component: YieldCurveChart;
  let fixture: ComponentFixture<YieldCurveChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YieldCurveChart],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
    }).compileComponents();

    fixture = TestBed.createComponent(YieldCurveChart);
    fixture.componentRef.setInput('points', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
