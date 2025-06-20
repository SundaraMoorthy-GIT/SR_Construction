import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBunkComponent } from './add-bunk.component';

describe('AddBunkComponent', () => {
  let component: AddBunkComponent;
  let fixture: ComponentFixture<AddBunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBunkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
