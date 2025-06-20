import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpoyeeSalaryComponent } from './add-empoyee-salary.component';

describe('AddEmpoyeeSalaryComponent', () => {
  let component: AddEmpoyeeSalaryComponent;
  let fixture: ComponentFixture<AddEmpoyeeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpoyeeSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpoyeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
