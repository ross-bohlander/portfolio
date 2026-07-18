import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AttributeTrendChart } from './attribute-trend-chart';

describe('AttributeTrendChart', () => {
  let component: AttributeTrendChart;
  let fixture: ComponentFixture<AttributeTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeTrendChart],
      providers: [provideCharts(withDefaultRegisterables())],
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
