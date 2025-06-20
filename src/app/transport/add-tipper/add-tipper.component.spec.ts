import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipperComponent } from './add-tipper.component';

describe('AddTipperComponent', () => {
  let component: AddTipperComponent;
  let fixture: ComponentFixture<AddTipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
