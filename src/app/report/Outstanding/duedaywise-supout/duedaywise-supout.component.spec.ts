import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuedaywiseSupoutComponent } from './duedaywise-supout.component';

describe('DuedaywiseSupoutComponent', () => {
  let component: DuedaywiseSupoutComponent;
  let fixture: ComponentFixture<DuedaywiseSupoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuedaywiseSupoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuedaywiseSupoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
