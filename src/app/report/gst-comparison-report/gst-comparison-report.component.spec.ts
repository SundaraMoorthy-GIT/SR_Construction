import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstComparisonReportComponent } from './gst-comparison-report.component';

describe('GstComparisonReportComponent', () => {
  let component: GstComparisonReportComponent;
  let fixture: ComponentFixture<GstComparisonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstComparisonReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstComparisonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
