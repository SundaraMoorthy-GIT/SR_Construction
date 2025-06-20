import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHsnwiseTaxComponent } from './purchase-hsnwise-tax.component';

describe('PurchaseHsnwiseTaxComponent', () => {
  let component: PurchaseHsnwiseTaxComponent;
  let fixture: ComponentFixture<PurchaseHsnwiseTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHsnwiseTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseHsnwiseTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
