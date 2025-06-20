import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueDetailsComponent } from './material-issue-details.component';

describe('MaterialIssueDetailsComponent', () => {
  let component: MaterialIssueDetailsComponent;
  let fixture: ComponentFixture<MaterialIssueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIssueDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
