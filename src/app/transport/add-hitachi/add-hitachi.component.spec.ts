import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHitachiComponent } from './add-hitachi.component';

describe('AddHitachiComponent', () => {
  let component: AddHitachiComponent;
  let fixture: ComponentFixture<AddHitachiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHitachiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHitachiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
