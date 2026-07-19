import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { YieldCurveData } from './yield-curve-data';

describe('YieldCurveData', () => {
  let service: YieldCurveData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(YieldCurveData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
