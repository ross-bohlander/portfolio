import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiChart } from './aqi-chart';

describe('AqiChart', () => {
  let component: AqiChart;
  let fixture: ComponentFixture<AqiChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqiChart],
    }).compileComponents();

    fixture = TestBed.createComponent(AqiChart);
    fixture.componentRef.setInput('pollutantAqi', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
