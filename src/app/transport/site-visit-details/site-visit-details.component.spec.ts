import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitDetailsComponent } from './site-visit-details.component';

describe('SiteVisitDetailsComponent', () => {
  let component: SiteVisitDetailsComponent;
  let fixture: ComponentFixture<SiteVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
