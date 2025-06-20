import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBookEntryComponent } from './log-book-entry.component';

describe('LogBookEntryComponent', () => {
  let component: LogBookEntryComponent;
  let fixture: ComponentFixture<LogBookEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogBookEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogBookEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
