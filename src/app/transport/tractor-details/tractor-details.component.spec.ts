import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractorDetailsComponent } from './tractor-details.component';

describe('TractorDetailsComponent', () => {
  let component: TractorDetailsComponent;
  let fixture: ComponentFixture<TractorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TractorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
