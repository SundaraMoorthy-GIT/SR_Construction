import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseDetailsComponent } from './inhouse-details.component';

describe('InhouseDetailsComponent', () => {
  let component: InhouseDetailsComponent;
  let fixture: ComponentFixture<InhouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhouseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
