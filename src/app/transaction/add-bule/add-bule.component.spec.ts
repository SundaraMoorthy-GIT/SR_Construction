import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuleComponent } from './add-bule.component';

describe('AddBuleComponent', () => {
  let component: AddBuleComponent;
  let fixture: ComponentFixture<AddBuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
