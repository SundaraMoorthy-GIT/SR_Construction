import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vindropdown1Component } from './vindropdown1.component';

describe('Vindropdown1Component', () => {
  let component: Vindropdown1Component;
  let fixture: ComponentFixture<Vindropdown1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vindropdown1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vindropdown1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
