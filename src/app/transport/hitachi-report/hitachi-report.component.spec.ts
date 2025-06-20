import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitachiReportComponent } from './hitachi-report.component';

describe('HitachiReportComponent', () => {
  let component: HitachiReportComponent;
  let fixture: ComponentFixture<HitachiReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitachiReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitachiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
