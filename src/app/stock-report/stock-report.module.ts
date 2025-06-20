import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StockReportRoutingModule } from './stock-report-routing.module';
import { CurrentStockComponent } from './current-stock/current-stock.component';
import { CategorywiseStockComponent } from './categorywise-stock/categorywise-stock.component';
import { ItemwiseStockComponent } from './itemwise-stock/itemwise-stock.component';


@NgModule({
  declarations: [CurrentStockComponent, CategorywiseStockComponent, ItemwiseStockComponent],
  imports: [
    CommonModule,
    StockReportRoutingModule,
    FormsModule,
    SharedModule
    
  ]
})
export class StockReportModule { }
