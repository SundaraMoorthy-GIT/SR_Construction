import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreReoprtComponent } from './tyre-report.component';

describe('TyreReoprtComponent', () => {
  let component: TyreReoprtComponent;
  let fixture: ComponentFixture<TyreReoprtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreReoprtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreReoprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
