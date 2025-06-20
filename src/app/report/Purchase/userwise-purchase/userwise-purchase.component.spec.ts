import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwisePurchaseComponent } from './userwise-purchase.component';

describe('UserwisePurchaseComponent', () => {
  let component: UserwisePurchaseComponent;
  let fixture: ComponentFixture<UserwisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserwisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
