import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachinerComponent } from './add-machiner.component';

describe('AddMachinerComponent', () => {
  let component: AddMachinerComponent;
  let fixture: ComponentFixture<AddMachinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMachinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMachinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
