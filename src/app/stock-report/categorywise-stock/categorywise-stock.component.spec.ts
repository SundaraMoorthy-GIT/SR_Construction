import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywiseStockComponent } from './categorywise-stock.component';

describe('CategorywiseStockComponent', () => {
  let component: CategorywiseStockComponent;
  let fixture: ComponentFixture<CategorywiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorywiseStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
