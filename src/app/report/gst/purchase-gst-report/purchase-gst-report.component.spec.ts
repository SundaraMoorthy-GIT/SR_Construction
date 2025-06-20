import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGstReportComponent } from './purchase-gst-report.component';

describe('PurchaseGstReportComponent', () => {
  let component: PurchaseGstReportComponent;
  let fixture: ComponentFixture<PurchaseGstReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseGstReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseGstReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
