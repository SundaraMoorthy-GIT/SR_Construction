import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsSettingComponent } from './fields-setting.component';

describe('FieldsSettingComponent', () => {
  let component: FieldsSettingComponent;
  let fixture: ComponentFixture<FieldsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
