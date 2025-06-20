import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRatingMasterComponent } from './transport-rating-master.component';

describe('TransportRatingMasterComponent', () => {
  let component: TransportRatingMasterComponent;
  let fixture: ComponentFixture<TransportRatingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRatingMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRatingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
