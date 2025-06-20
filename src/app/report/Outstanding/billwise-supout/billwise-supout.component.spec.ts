import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillwiseSupoutComponent } from './billwise-supout.component';

describe('BillwiseSupoutComponent', () => {
  let component: BillwiseSupoutComponent;
  let fixture: ComponentFixture<BillwiseSupoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillwiseSupoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillwiseSupoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
