import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailSettingComponent } from './gmail-setting.component';

describe('GmailSettingComponent', () => {
  let component: GmailSettingComponent;
  let fixture: ComponentFixture<GmailSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
