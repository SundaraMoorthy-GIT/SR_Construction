import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerdetailsComponent } from './ledgerdetails.component';

describe('LedgerdetailsComponent', () => {
  let component: LedgerdetailsComponent;
  let fixture: ComponentFixture<LedgerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
