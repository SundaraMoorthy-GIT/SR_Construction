import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeraialNoSettingsComponent } from './seraial-no-settings.component';

describe('SeraialNoSettingsComponent', () => {
  let component: SeraialNoSettingsComponent;
  let fixture: ComponentFixture<SeraialNoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeraialNoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeraialNoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
