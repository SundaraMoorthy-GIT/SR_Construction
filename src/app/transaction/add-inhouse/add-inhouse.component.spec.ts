import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInhouseComponent } from './add-inhouse.component';

describe('AddInhouseComponent', () => {
  let component: AddInhouseComponent;
  let fixture: ComponentFixture<AddInhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
