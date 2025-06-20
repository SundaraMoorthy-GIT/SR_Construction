import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockReportComponent } from './stock-report.component';
import { CategorywiseStockComponent } from './categorywise-stock/categorywise-stock.component';
import { CurrentStockComponent } from './current-stock/current-stock.component';
import { ItemwiseStockComponent } from './itemwise-stock/itemwise-stock.component';


const routes: Routes = [
{ path: '', component: StockReportComponent },
{ path: 'categorywise-stock', component: CategorywiseStockComponent },
{ path: 'current-stock', component: CurrentStockComponent },
{ path: 'itemwise-stock', component: ItemwiseStockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockReportRoutingModule { }
