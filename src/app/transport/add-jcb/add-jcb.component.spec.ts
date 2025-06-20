import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJcbComponent } from './add-jcb.component';

describe('AddJcbComponent', () => {
  let component: AddJcbComponent;
  let fixture: ComponentFixture<AddJcbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJcbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJcbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
