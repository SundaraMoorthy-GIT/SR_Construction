import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrywiseColComponent } from './entrywise-col.component';

describe('EntrywiseColComponent', () => {
  let component: EntrywiseColComponent;
  let fixture: ComponentFixture<EntrywiseColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrywiseColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrywiseColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
