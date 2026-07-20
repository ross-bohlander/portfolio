import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AqiDashboard } from './aqi-dashboard';

describe('AqiDashboard', () => {
  let component: AqiDashboard;
  let fixture: ComponentFixture<AqiDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqiDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AqiDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
