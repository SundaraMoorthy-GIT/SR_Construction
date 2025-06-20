import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywisePurchaseComponent } from './daywise-purchase.component';

describe('DaywisePurchaseComponent', () => {
  let component: DaywisePurchaseComponent;
  let fixture: ComponentFixture<DaywisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywisePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaywisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
