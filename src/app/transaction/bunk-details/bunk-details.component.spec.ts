import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkDetailsComponent } from './bunk-details.component';

describe('BunkDetailsComponent', () => {
  let component: BunkDetailsComponent;
  let fixture: ComponentFixture<BunkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunkDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
