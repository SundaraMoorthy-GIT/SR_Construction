import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTyreEntryComponent } from './re-tyre-entry.component';

describe('ReTyreEntryComponent', () => {
  let component: ReTyreEntryComponent;
  let fixture: ComponentFixture<ReTyreEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReTyreEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTyreEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
