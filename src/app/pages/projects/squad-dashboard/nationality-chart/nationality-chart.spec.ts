import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { NationalityChart } from './nationality-chart';
import { installResizeObserverStub } from '../../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('NationalityChart', () => {
  let component: NationalityChart;
  let fixture: ComponentFixture<NationalityChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalityChart],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
    }).compileComponents();

    fixture = TestBed.createComponent(NationalityChart);
    fixture.componentRef.setInput('data', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
