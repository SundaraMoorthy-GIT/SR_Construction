import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwiseOutComponent } from './supplierwise-out.component';

describe('SupplierwiseOutComponent', () => {
  let component: SupplierwiseOutComponent;
  let fixture: ComponentFixture<SupplierwiseOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierwiseOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierwiseOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
