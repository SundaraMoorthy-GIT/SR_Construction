import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageEntryComponent } from './mileage-entry.component';

describe('MileageEntryComponent', () => {
  let component: MileageEntryComponent;
  let fixture: ComponentFixture<MileageEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MileageEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
