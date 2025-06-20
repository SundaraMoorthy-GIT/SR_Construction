import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechiledetailsComponent } from './vechiledetails.component';

describe('VechiledetailsComponent', () => {
  let component: VechiledetailsComponent;
  let fixture: ComponentFixture<VechiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VechiledetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VechiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
