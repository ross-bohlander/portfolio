import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { SpreadChart } from './spread-chart';
import { installResizeObserverStub } from '../../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('SpreadChart', () => {
  let component: SpreadChart;
  let fixture: ComponentFixture<SpreadChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadChart],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
    }).compileComponents();

    fixture = TestBed.createComponent(SpreadChart);
    fixture.componentRef.setInput('data', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
