import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwisePurchaseComponent } from './supplierwise-purchase.component';

describe('SupplierwisePurchaseComponent', () => {
  let component: SupplierwisePurchaseComponent;
  let fixture: ComponentFixture<SupplierwisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierwisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierwisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
