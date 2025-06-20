import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymodewisePurchaseComponent } from './paymodewise-purchase.component';

describe('PaymodewisePurchaseComponent', () => {
  let component: PaymodewisePurchaseComponent;
  let fixture: ComponentFixture<PaymodewisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymodewisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymodewisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
