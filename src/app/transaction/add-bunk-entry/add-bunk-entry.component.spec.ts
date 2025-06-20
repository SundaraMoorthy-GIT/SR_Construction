import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBunkEntryComponent } from './add-bunk-entry.component';

describe('AddBunkEntryComponent', () => {
  let component: AddBunkEntryComponent;
  let fixture: ComponentFixture<AddBunkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBunkEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBunkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
