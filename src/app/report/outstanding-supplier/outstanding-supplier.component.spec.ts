import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingSupplierComponent } from './outstanding-supplier.component';

describe('OutstandingSupplierComponent', () => {
  let component: OutstandingSupplierComponent;
  let fixture: ComponentFixture<OutstandingSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
