import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addgst2bComponent } from './addgst2b.component';

describe('Addgst2bComponent', () => {
  let component: Addgst2bComponent;
  let fixture: ComponentFixture<Addgst2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addgst2bComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addgst2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
