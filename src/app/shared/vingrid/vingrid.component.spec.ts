import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VingridComponent } from './vingrid.component';

describe('VingridComponent', () => {
  let component: VingridComponent;
  let fixture: ComponentFixture<VingridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VingridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VingridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
