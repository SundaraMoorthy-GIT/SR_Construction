import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidLicenceComponent } from './invalid-licence.component';

describe('InvalidLicenceComponent', () => {
  let component: InvalidLicenceComponent;
  let fixture: ComponentFixture<InvalidLicenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidLicenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
