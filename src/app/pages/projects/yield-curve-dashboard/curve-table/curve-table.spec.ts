import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveTable } from './curve-table';

describe('CurveTable', () => {
  let component: CurveTable;
  let fixture: ComponentFixture<CurveTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurveTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CurveTable);
    fixture.componentRef.setInput('points', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
