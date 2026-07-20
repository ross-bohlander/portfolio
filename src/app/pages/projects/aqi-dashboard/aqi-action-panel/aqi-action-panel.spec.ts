import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiActionPanel } from './aqi-action-panel';

describe('AqiActionPanel', () => {
  let component: AqiActionPanel;
  let fixture: ComponentFixture<AqiActionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqiActionPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AqiActionPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
