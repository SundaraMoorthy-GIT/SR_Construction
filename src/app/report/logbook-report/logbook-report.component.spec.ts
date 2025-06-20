import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookReportComponent } from './logbook-report.component';

describe('LogbookReportComponent', () => {
  let component: LogbookReportComponent;
  let fixture: ComponentFixture<LogbookReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogbookReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
