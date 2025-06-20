import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpoyeeSalaryDetailsComponent } from './empoyee-salary-details.component';

describe('EmpoyeeSalaryDetailsComponent', () => {
  let component: EmpoyeeSalaryDetailsComponent;
  let fixture: ComponentFixture<EmpoyeeSalaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpoyeeSalaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpoyeeSalaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
