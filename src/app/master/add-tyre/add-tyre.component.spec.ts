import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTyreComponent } from './add-tyre.component';

describe('AddTyreComponent', () => {
  let component: AddTyreComponent;
  let fixture: ComponentFixture<AddTyreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTyreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTyreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
