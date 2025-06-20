import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkReportComponent } from './bunk-report.component';

describe('BunkReportComponent', () => {
  let component: BunkReportComponent;
  let fixture: ComponentFixture<BunkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
