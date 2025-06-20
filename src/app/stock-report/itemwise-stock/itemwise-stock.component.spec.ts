import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwiseStockComponent } from './itemwise-stock.component';

describe('ItemwiseStockComponent', () => {
  let component: ItemwiseStockComponent;
  let fixture: ComponentFixture<ItemwiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemwiseStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemwiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
