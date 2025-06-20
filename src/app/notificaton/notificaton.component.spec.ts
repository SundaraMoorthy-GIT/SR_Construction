import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatonComponent } from './notificaton.component';

describe('NotificatonComponent', () => {
  let component: NotificatonComponent;
  let fixture: ComponentFixture<NotificatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
