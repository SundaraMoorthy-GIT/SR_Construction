import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGstOneComponent } from './purchase-gst-one.component';

describe('PurchaseGstOneComponent', () => {
  let component: PurchaseGstOneComponent;
  let fixture: ComponentFixture<PurchaseGstOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseGstOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseGstOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
