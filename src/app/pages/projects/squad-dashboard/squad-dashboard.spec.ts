import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SquadDashboard } from './squad-dashboard';

describe('SquadDashboard', () => {
  let component: SquadDashboard;
  let fixture: ComponentFixture<SquadDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
