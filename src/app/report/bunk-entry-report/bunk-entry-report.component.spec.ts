import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkEntryReportComponent } from './bunk-entry-report.component';

describe('BunkEntryReportComponent', () => {
  let component: BunkEntryReportComponent;
  let fixture: ComponentFixture<BunkEntryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunkEntryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BunkEntryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
