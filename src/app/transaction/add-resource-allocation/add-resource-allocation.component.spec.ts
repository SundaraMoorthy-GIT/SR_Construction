import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourceAllocationComponent } from './add-resource-allocation.component';

describe('AddResourceAllocationComponent', () => {
  let component: AddResourceAllocationComponent;
  let fixture: ComponentFixture<AddResourceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResourceAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
