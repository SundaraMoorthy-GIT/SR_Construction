import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinerDetailsComponent } from './machiner-details.component';

describe('MachinerDetailsComponent', () => {
  let component: MachinerDetailsComponent;
  let fixture: ComponentFixture<MachinerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
