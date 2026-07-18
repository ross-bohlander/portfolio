import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancePanel } from './compliance-panel';

describe('CompliancePanel', () => {
  let component: CompliancePanel;
  let fixture: ComponentFixture<CompliancePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompliancePanel],
    }).compileComponents();

    fixture = TestBed.createComponent(CompliancePanel);
    fixture.componentRef.setInput('violations', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
