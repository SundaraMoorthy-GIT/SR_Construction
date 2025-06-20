import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractorReportComponent } from './tractor-report.component';

describe('TractorReportComponent', () => {
  let component: TractorReportComponent;
  let fixture: ComponentFixture<TractorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TractorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
