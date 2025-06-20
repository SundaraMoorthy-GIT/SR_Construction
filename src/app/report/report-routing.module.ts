import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { DayBookComponent } from './Ledger/day-book/day-book.component';
import { SupplierLedgerComponent } from './Ledger/supplier-ledger/supplier-ledger.component';
import { EntrywiseColComponent } from './Collection/entrywise-col/entrywise-col.component';
import { CustomerwiseColComponent } from './Collection/customerwise-col/customerwise-col.component';
import { AreawiseColComponent } from './Collection/areawise-col/areawise-col.component';
import { UserwiseColComponent } from './Collection/userwise-col/userwise-col.component';
import { PaymodewiseColComponent } from './Collection/paymodewise-col/paymodewise-col.component';
import { BillwiseOutComponent } from './Outstanding/billwise-out/billwise-out.component';
import { CustomerwiseOutComponent } from './Outstanding/customerwise-out/customerwise-out.component';
import { AreawiseOutComponent } from './Outstanding/areawise-out/areawise-out.component';
import { SalespersonwiseOutComponent } from './Outstanding/salespersonwise-out/salespersonwise-out.component';
import { DuedaywiseOutComponent } from './Outstanding/duedaywise-out/duedaywise-out.component';
import { OutStandingCustomersComponent } from './Outstanding/out-standing-customers/out-standing-customers.component';
import { GstComparisonReportComponent } from './gst-comparison-report/gst-comparison-report.component';
import { LogbookReportComponent } from './logbook-report/logbook-report.component';
import { BunkReportComponent } from './bunk-report/bunk-report.component';
import { BunkEntryReportComponent } from './bunk-entry-report/bunk-entry-report.component';
import { AuditorReportComponent } from './auditor-report/auditor-report.component';
import { VehicleFuelReportComponent } from './vehicle-fuel-report/vehicle-fuel-report.component';
import { SupplierWiseReportComponent } from './supplier-wise-report/supplier-wise-report.component';
 import { TyreReoprtComponent } from './tyre-report/tyre-report.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { BlueComponent } from './blue/blue.component';
import { BillwisePurchaseComponent } from './Purchase/billwise-purchase/billwise-purchase.component';
import { DaywisePurchaseComponent } from './Purchase/daywise-purchase/daywise-purchase.component';
import { ItemwisePurchaseComponent } from './Purchase/itemwise-purchase/itemwise-purchase.component';
import { PaymodewisePurchaseComponent } from './Purchase/paymodewise-purchase/paymodewise-purchase.component';
import { SupplierwisePurchaseComponent } from './Purchase/supplierwise-purchase/supplierwise-purchase.component';
import { UserwisePurchaseComponent } from './Purchase/userwise-purchase/userwise-purchase.component';
import { OutstandingSupplierComponent } from './outstanding-supplier/outstanding-supplier.component';
import { BillwiseSupoutComponent } from './Outstanding/billwise-supout/billwise-supout.component';
import { SupplierwiseOutComponent } from './Outstanding/supplierwise-out/supplierwise-out.component';
import { DuedaywiseSupoutComponent } from './Outstanding/duedaywise-supout/duedaywise-supout.component';
import { PurchaseGstReportComponent } from './gst/purchase-gst-report/purchase-gst-report.component';
import { SalesGstReportComponent } from './gst/sales-gst-report/sales-gst-report.component';
import { SalesGstOneComponent } from './gst/sales-gst-one/sales-gst-one.component';
import { PurchaseGstOneComponent } from './gst/purchase-gst-one/purchase-gst-one.component';
import { PurchaseHsnwiseTaxComponent } from './gst/purchase-hsnwise-tax/purchase-hsnwise-tax.component';
import { SalesHsnwiseTaxComponent } from './gst/sales-hsnwise-tax/sales-hsnwise-tax.component';

const routes: Routes = [
  { path: '', component: ReportComponent },

    { path: 'purchase-gst-report', component: PurchaseGstReportComponent },
    { path: 'purchase-gst-one', component: PurchaseGstOneComponent },
    { path: 'purchase-hsnwise-tax', component: PurchaseHsnwiseTaxComponent },

    { path: 'sales-gst-report', component: SalesGstReportComponent },
    { path: 'sales-gst-one', component: SalesGstOneComponent },
    { path: 'sales-hsnwise-tax', component: SalesHsnwiseTaxComponent },

  { path: 'billwise-supout', component: BillwiseSupoutComponent },
  { path: 'duedaywise-supout', component: DuedaywiseSupoutComponent },
  { path: 'supplierwise-out', component: SupplierwiseOutComponent },
    { path: 'itemwise-purchase', component: ItemwisePurchaseComponent },
    { path: 'billwise-purchase', component: BillwisePurchaseComponent },
    { path: 'userwise-purchase', component: UserwisePurchaseComponent },
    { path: 'daywise-purchase', component: DaywisePurchaseComponent },
    { path: 'paymodewise-purchase', component: PaymodewisePurchaseComponent },
    { path: 'supplierwise-purchase', component: SupplierwisePurchaseComponent },


 { path: 'supplier-ledger', component: SupplierLedgerComponent },
 { path: 'day-book', component: DayBookComponent },

 { path: 'gst-comparison-reports', component: GstComparisonReportComponent },
 //Collection
 { path: 'customerwise-col', component: CustomerwiseColComponent },
 { path: 'entrywise-col', component: EntrywiseColComponent },
 { path: 'userwise-col', component: UserwiseColComponent },
 { path: 'areawise-col', component: AreawiseColComponent },
 { path: 'paymodewise-col', component: PaymodewiseColComponent },
 //Outstanding
{ path: 'billwise-out', component: BillwiseOutComponent },
{ path: 'customerwise-out', component: CustomerwiseOutComponent },
{ path: 'salespersonwise-out', component: SalespersonwiseOutComponent },
{ path: 'duedaywise-out', component: DuedaywiseOutComponent },
{ path: 'areawise-out', component: AreawiseOutComponent },
{ path: 'Outstanding-customer', component: OutStandingCustomersComponent },

//log book//
{ path: 'logbook-report', component: LogbookReportComponent },
{ path: 'bunk-report', component: BunkReportComponent },
 { path: 'Tyre-report', component: TyreReoprtComponent },
{ path: 'bunk-entry-report', component: BunkEntryReportComponent },
{ path: 'auditor-report', component: AuditorReportComponent },
//log book //
{ path: 'vehicle-fuel-report', component: VehicleFuelReportComponent },
{ path: 'supplier-wise-vehicle-report', component: SupplierWiseReportComponent },
{ path: 'stock-in-report', component: StockInComponent },
{ path: 'blue-report', component: BlueComponent },


    { path: 'outstanding-supplier', component: OutstandingSupplierComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
