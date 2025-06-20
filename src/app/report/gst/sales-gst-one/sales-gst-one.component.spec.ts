import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGstOneComponent } from './sales-gst-one.component';

describe('SalesGstOneComponent', () => {
  let component: SalesGstOneComponent;
  let fixture: ComponentFixture<SalesGstOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGstOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesGstOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
