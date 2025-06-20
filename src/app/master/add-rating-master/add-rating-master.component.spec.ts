import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatingMasterComponent } from './add-rating-master.component';

describe('AddRatingMasterComponent', () => {
  let component: AddRatingMasterComponent;
  let fixture: ComponentFixture<AddRatingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRatingMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
