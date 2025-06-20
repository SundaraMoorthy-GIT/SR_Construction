import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonwiseOutComponent } from './salespersonwise-out.component';

describe('SalespersonwiseOutComponent', () => {
  let component: SalespersonwiseOutComponent;
  let fixture: ComponentFixture<SalespersonwiseOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonwiseOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonwiseOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
