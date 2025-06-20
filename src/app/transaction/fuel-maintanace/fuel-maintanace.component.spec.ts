import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelMaintanaceComponent } from './fuel-maintanace.component';

describe('FuelMaintanaceComponent', () => {
  let component: FuelMaintanaceComponent;
  let fixture: ComponentFixture<FuelMaintanaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelMaintanaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelMaintanaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
