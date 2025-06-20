import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinledgerComponent } from './vinledger.component';

describe('VinledgerComponent', () => {
  let component: VinledgerComponent;
  let fixture: ComponentFixture<VinledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
