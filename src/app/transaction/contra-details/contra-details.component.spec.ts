import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraDetailsComponent } from './contra-details.component';

describe('ContraDetailsComponent', () => {
  let component: ContraDetailsComponent;
  let fixture: ComponentFixture<ContraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
