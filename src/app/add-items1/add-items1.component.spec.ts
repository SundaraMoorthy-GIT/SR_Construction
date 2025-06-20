import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItems1Component } from './add-items1.component';

describe('AddItems1Component', () => {
  let component: AddItems1Component;
  let fixture: ComponentFixture<AddItems1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItems1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItems1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
