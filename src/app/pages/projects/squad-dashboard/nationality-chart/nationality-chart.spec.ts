import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityChart } from './nationality-chart';

describe('NationalityChart', () => {
  let component: NationalityChart;
  let fixture: ComponentFixture<NationalityChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalityChart],
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
