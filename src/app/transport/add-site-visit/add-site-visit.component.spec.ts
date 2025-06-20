import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteVisitComponent } from './add-site-visit.component';

describe('AddSiteVisitComponent', () => {
  let component: AddSiteVisitComponent;
  let fixture: ComponentFixture<AddSiteVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSiteVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
