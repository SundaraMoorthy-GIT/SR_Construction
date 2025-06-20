import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBookDetailsComponent } from './log-book-details.component';

describe('LogBookDetailsComponent', () => {
  let component: LogBookDetailsComponent;
  let fixture: ComponentFixture<LogBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogBookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
