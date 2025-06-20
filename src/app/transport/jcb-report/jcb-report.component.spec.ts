import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JcbReportComponent } from './jcb-report.component';

describe('JcbReportComponent', () => {
  let component: JcbReportComponent;
  let fixture: ComponentFixture<JcbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JcbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
