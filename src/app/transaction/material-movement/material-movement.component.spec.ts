import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMovementComponent } from './material-movement.component';

describe('MaterialMovementComponent', () => {
  let component: MaterialMovementComponent;
  let fixture: ComponentFixture<MaterialMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
