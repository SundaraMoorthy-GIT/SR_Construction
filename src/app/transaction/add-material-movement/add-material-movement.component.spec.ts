import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialMovementComponent } from './add-material-movement.component';

describe('AddMaterialMovementComponent', () => {
  let component: AddMaterialMovementComponent;
  let fixture: ComponentFixture<AddMaterialMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaterialMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
