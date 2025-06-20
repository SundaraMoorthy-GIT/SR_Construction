import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStandingCustomersComponent } from './out-standing-customers.component';

describe('OutStandingCustomersComponent', () => {
  let component: OutStandingCustomersComponent;
  let fixture: ComponentFixture<OutStandingCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStandingCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStandingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
