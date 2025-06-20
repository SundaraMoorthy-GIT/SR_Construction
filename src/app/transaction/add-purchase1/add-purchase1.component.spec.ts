import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchase1Component } from './add-purchase1.component';

describe('AddPurchase1Component', () => {
  let component: AddPurchase1Component;
  let fixture: ComponentFixture<AddPurchase1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchase1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
