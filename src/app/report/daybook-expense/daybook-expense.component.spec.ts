import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybookExpenseComponent } from './daybook-expense.component';

describe('DaybookExpenseComponent', () => {
  let component: DaybookExpenseComponent;
  let fixture: ComponentFixture<DaybookExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaybookExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaybookExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
