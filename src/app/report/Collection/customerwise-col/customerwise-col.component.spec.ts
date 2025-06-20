import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwiseColComponent } from './customerwise-col.component';

describe('CustomerwiseColComponent', () => {
  let component: CustomerwiseColComponent;
  let fixture: ComponentFixture<CustomerwiseColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerwiseColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerwiseColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
