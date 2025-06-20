import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillwiseOutComponent } from './billwise-out.component';

describe('BillwiseOutComponent', () => {
  let component: BillwiseOutComponent;
  let fixture: ComponentFixture<BillwiseOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillwiseOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillwiseOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
