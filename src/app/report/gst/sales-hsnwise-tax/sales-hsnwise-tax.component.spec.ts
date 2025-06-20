import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHsnwiseTaxComponent } from './sales-hsnwise-tax.component';

describe('SalesHsnwiseTaxComponent', () => {
  let component: SalesHsnwiseTaxComponent;
  let fixture: ComponentFixture<SalesHsnwiseTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesHsnwiseTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesHsnwiseTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
