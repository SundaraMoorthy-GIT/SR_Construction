import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipperDetailsComponent } from './tipper-details.component';

describe('TipperDetailsComponent', () => {
  let component: TipperDetailsComponent;
  let fixture: ComponentFixture<TipperDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipperDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
