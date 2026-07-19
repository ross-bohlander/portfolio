import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { AttributeTrendChart } from './attribute-trend-chart';
import { installResizeObserverStub } from '../../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('AttributeTrendChart', () => {
  let component: AttributeTrendChart;
  let fixture: ComponentFixture<AttributeTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeTrendChart],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeTrendChart);
    fixture.componentRef.setInput('data', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
