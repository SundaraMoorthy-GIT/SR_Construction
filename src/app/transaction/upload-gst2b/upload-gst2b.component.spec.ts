import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGst2bComponent } from './upload-gst2b.component';

describe('UploadGst2bComponent', () => {
  let component: UploadGst2bComponent;
  let fixture: ComponentFixture<UploadGst2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGst2bComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGst2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
