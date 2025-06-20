import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetails1Component } from './payment-details1.component';

describe('PaymentDetails1Component', () => {
  let component: PaymentDetails1Component;
  let fixture: ComponentFixture<PaymentDetails1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetails1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
