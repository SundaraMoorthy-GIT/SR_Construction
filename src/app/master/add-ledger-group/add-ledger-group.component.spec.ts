import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLedgerGroupComponent } from './add-ledger-group.component';

describe('AddLedgerGroupComponent', () => {
  let component: AddLedgerGroupComponent;
  let fixture: ComponentFixture<AddLedgerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLedgerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLedgerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
