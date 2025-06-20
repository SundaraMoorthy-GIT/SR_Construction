import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gst2bDetailsComponent } from './gst2b-details.component';

describe('Gst2bDetailsComponent', () => {
  let component: Gst2bDetailsComponent;
  let fixture: ComponentFixture<Gst2bDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gst2bDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gst2bDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
