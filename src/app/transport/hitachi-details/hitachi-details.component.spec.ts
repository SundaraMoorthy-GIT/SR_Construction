import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitachiDetailsComponent } from './hitachi-details.component';

describe('HitachiDetailsComponent', () => {
  let component: HitachiDetailsComponent;
  let fixture: ComponentFixture<HitachiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitachiDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitachiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
