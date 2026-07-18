import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTrendChart } from './attribute-trend-chart';

describe('AttributeTrendChart', () => {
  let component: AttributeTrendChart;
  let fixture: ComponentFixture<AttributeTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeTrendChart],
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
