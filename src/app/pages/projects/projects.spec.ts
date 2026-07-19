import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideEchartsCore } from 'ngx-echarts';

import { Projects } from './projects';
import { installResizeObserverStub } from '../../shared/testing/resize-observer-stub';

installResizeObserverStub();

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
