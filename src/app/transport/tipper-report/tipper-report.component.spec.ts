import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipperReportComponent } from './tipper-report.component';

describe('TipperReportComponent', () => {
  let component: TipperReportComponent;
  let fixture: ComponentFixture<TipperReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipperReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipperReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
