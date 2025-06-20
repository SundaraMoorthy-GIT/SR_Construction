import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymodewiseColComponent } from './paymodewise-col.component';

describe('PaymodewiseColComponent', () => {
  let component: PaymodewiseColComponent;
  let fixture: ComponentFixture<PaymodewiseColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymodewiseColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymodewiseColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
