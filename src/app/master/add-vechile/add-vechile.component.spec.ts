import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVechileComponent } from './add-vechile.component';

describe('AddVechileComponent', () => {
  let component: AddVechileComponent;
  let fixture: ComponentFixture<AddVechileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVechileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVechileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
