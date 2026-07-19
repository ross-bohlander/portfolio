import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { YieldCurveDashboard } from './yield-curve-dashboard';
import { installResizeObserverStub } from '../../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('YieldCurveDashboard', () => {
  let component: YieldCurveDashboard;
  let fixture: ComponentFixture<YieldCurveDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YieldCurveDashboard],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YieldCurveDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
