import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiSummary } from './aqi-summary';

describe('AqiSummary', () => {
  let component: AqiSummary;
  let fixture: ComponentFixture<AqiSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqiSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(AqiSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
