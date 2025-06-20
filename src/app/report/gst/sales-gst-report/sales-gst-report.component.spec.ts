import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGstReportComponent } from './sales-gst-report.component';

describe('SalesGstReportComponent', () => {
  let component: SalesGstReportComponent;
  let fixture: ComponentFixture<SalesGstReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGstReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesGstReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
