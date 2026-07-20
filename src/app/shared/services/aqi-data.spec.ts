import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AqiData } from './aqi-data';

describe('AqiData', () => {
  let service: AqiData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AqiData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
