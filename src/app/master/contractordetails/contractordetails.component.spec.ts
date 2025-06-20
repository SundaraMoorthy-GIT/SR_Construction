import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractordetailsComponent } from './contractordetails.component';

describe('ContractordetailsComponent', () => {
  let component: ContractordetailsComponent;
  let fixture: ComponentFixture<ContractordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractordetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
