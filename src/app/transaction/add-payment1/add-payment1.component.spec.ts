import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayment1Component } from './add-payment1.component';

describe('AddPayment1Component', () => {
  let component: AddPayment1Component;
  let fixture: ComponentFixture<AddPayment1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayment1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
