import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SquadData } from './squad-data';

describe('SquadData', () => {
  let service: SquadData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SquadData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
