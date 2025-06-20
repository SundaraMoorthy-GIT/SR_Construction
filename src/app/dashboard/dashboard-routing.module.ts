import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AccountsComponent } from './accounts/accounts.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'default', component: DefaultComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'stock', component: StockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
