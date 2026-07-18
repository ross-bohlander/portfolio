import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { NationalityChart } from './nationality-chart';

describe('NationalityChart', () => {
  let component: NationalityChart;
  let fixture: ComponentFixture<NationalityChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalityChart],
      providers: [provideCharts(withDefaultRegisterables())],
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
