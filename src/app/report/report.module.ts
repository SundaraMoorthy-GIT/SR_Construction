import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
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
import { BunkReportComponent } from './bunk-report/bunk-report.component';
import { LogbookReportComponent } from './logbook-report/logbook-report.component';
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
@NgModule({
  declarations: [ReportComponent,DayBookComponent,SupplierLedgerComponent,OutstandingSupplierComponent,
    EntrywiseColComponent,CustomerwiseColComponent,AreawiseColComponent,UserwiseColComponent,PaymodewiseColComponent, VehicleFuelReportComponent, SupplierWiseReportComponent, 
    BillwiseOutComponent,CustomerwiseOutComponent,AreawiseOutComponent,SalespersonwiseOutComponent,DuedaywiseOutComponent,OutStandingCustomersComponent, GstComparisonReportComponent, BunkReportComponent,LogbookReportComponent, BunkEntryReportComponent, AuditorReportComponent, TyreReoprtComponent, StockInComponent, BlueComponent, BillwisePurchaseComponent, DaywisePurchaseComponent, ItemwisePurchaseComponent, PaymodewisePurchaseComponent, SupplierwisePurchaseComponent, UserwisePurchaseComponent, BillwiseSupoutComponent, SupplierwiseOutComponent, DuedaywiseSupoutComponent, PurchaseGstReportComponent, SalesGstReportComponent, SalesGstOneComponent, PurchaseGstOneComponent, PurchaseHsnwiseTaxComponent, SalesHsnwiseTaxComponent
    
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    SharedModule,

  ]
})
export class ReportModule { }
