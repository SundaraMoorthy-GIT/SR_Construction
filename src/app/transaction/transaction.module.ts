import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { AddEstimateComponent } from './add-estimate/add-estimate.component';
import { AddPurchase1Component } from './add-purchase1/add-purchase1.component';
import { MaterialMovementComponent } from './material-movement/material-movement.component';
import { AddMaterialMovementComponent } from './add-material-movement/add-material-movement.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { MachinerDetailsComponent } from './machiner-details/machiner-details.component';
import { AddMachinerComponent } from './add-machiner/add-machiner.component';
import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { EmpoyeeSalaryDetailsComponent } from './empoyee-salary-details/empoyee-salary-details.component';
import { AddEmpoyeeSalaryComponent } from './add-empoyee-salary/add-empoyee-salary.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetails1Component } from './payment-details1/payment-details1.component';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddPayment1Component } from './add-payment1/add-payment1.component';
import { AddDepositComponent } from './add-deposit/add-deposit.component';
import { InhouseDetailsComponent } from './inhouse-details/inhouse-details.component';
import { AddInhouseComponent } from './add-inhouse/add-inhouse.component';
import { ResourceAllocationComponent } from './resource-allocation/resource-allocation.component';
import { AddResourceAllocationComponent } from './add-resource-allocation/add-resource-allocation.component';
import { GrnDetailsComponent } from './grn-details/grn-details.component';
import { GrnEntryComponent } from './grn-entry/grn-entry.component';
import { ContraDetailsComponent } from './contra-details/contra-details.component';
import { AddContraComponent } from './add-contra/add-contra.component';
import { Gst2bDetailsComponent } from './gst2b-details/gst2b-details.component';
import { Addgst2bComponent } from './addgst2b/addgst2b.component';
import { UploadGst2bComponent } from './upload-gst2b/upload-gst2b.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { ProductionEntryComponent } from './production-entry/production-entry.component';
import { TyreDetailsComponent } from './tyre-details/tyre-details.component';
import { ReTyreEntryComponent } from './re-tyre-entry/re-tyre-entry.component';
import { FuelMaintanaceComponent } from './fuel-maintanace/fuel-maintanace.component';
import { FuelMaintanaceEntryComponent } from './fuel-maintanace-entry/fuel-maintanace-entry.component';
import { MileageDetailsComponent } from './mileage-details/mileage-details.component';
import { MileageEntryComponent } from './mileage-entry/mileage-entry.component';
import { LogBookEntryComponent } from './log-book-entry/log-book-entry.component';
import { LogBookDetailsComponent } from './log-book-details/log-book-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { AddBunkComponent } from './add-bunk/add-bunk.component';
import { BunkDetailsComponent } from './bunk-details/bunk-details.component';
import { AddBunkEntryComponent } from './add-bunk-entry/add-bunk-entry.component';
import { BunkEntryDetailsComponent } from './bunk-entry-details/bunk-entry-details.component';
import { MaterialIssueComponent } from './material-issue/material-issue.component';
import { MaterialIssueDetailsComponent } from './material-issue-details/material-issue-details.component';
import { AddBuleComponent } from './add-bule/add-bule.component';
import { BuleDetailsComponent } from './bule-details/bule-details.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { AddSalesComponent } from './add-sales/add-sales.component';

@NgModule({
  declarations: [TransactionComponent, PurchaseDetailsComponent, AddPurchaseComponent, EstimateDetailsComponent, AddEstimateComponent, AddPurchase1Component, MaterialMovementComponent, AddMaterialMovementComponent, AddExpenseComponent, ExpenseDetailsComponent, MachinerDetailsComponent, AddMachinerComponent, ContractorDetailsComponent, AddContractorComponent, EmpoyeeSalaryDetailsComponent, AddEmpoyeeSalaryComponent, AddPaymentComponent, PaymentDetailsComponent, PaymentDetails1Component, DepositDetailsComponent, IncomeDetailsComponent, AddIncomeComponent, AddPayment1Component, AddDepositComponent, InhouseDetailsComponent, AddInhouseComponent, ResourceAllocationComponent, AddResourceAllocationComponent, GrnDetailsComponent, GrnEntryComponent, ContraDetailsComponent, AddContraComponent, Gst2bDetailsComponent, Addgst2bComponent, UploadGst2bComponent, ProductionDetailsComponent, ProductionEntryComponent, TyreDetailsComponent, ReTyreEntryComponent, FuelMaintanaceComponent, FuelMaintanaceEntryComponent, MileageDetailsComponent, MileageEntryComponent, LogBookEntryComponent, LogBookDetailsComponent, LoanDetailsComponent, AddLoanComponent, AddBunkComponent, BunkDetailsComponent, AddBunkEntryComponent, BunkEntryDetailsComponent, MaterialIssueComponent, MaterialIssueDetailsComponent, AddBuleComponent, BuleDetailsComponent,
    SalesDetailsComponent,AddSalesComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    FormsModule,


  ]
})
export class TransactionModule { }
