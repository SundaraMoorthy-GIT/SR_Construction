import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JcbDetailsComponent } from './jcb-details.component';

describe('JcbDetailsComponent', () => {
  let component: JcbDetailsComponent;
  let fixture: ComponentFixture<JcbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JcbDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
