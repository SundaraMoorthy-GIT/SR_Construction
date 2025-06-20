import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkEntryDetailsComponent } from './bunk-entry-details.component';

describe('BunkEntryDetailsComponent', () => {
  let component: BunkEntryDetailsComponent;
  let fixture: ComponentFixture<BunkEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunkEntryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunkEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
