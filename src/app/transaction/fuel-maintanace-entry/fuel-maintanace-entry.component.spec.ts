import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelMaintanaceEntryComponent } from './fuel-maintanace-entry.component';

describe('FuelMaintanaceEntryComponent', () => {
  let component: FuelMaintanaceEntryComponent;
  let fixture: ComponentFixture<FuelMaintanaceEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelMaintanaceEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelMaintanaceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
