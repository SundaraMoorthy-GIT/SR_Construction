import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuleDetailsComponent } from './bule-details.component';

describe('BuleDetailsComponent', () => {
  let component: BuleDetailsComponent;
  let fixture: ComponentFixture<BuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
