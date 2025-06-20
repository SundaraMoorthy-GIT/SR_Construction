import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
// import { LoanIssueEntryComponent } from './loan-issue-entry/loan-issue-entry.component';
// import { LoanIssueDetailsComponent } from './loan-issue-details/loan-issue-details.component';
// import { LoanCollectionEntryComponent } from './loan-collection-entry/loan-collection-entry.component';
// import { LoanCollectionDetailsComponent } from './loan-collection-details/loan-collection-details.component';
// import { EmiLoanIssueComponent } from './emi-loan-issue/emi-loan-issue.component';
// import { EmiLoanCollectionComponent } from './emi-loan-collection/emi-loan-collection.component';
// import { GroupDetailsComponent } from './group-details/group-details.component';
// import { GroupEntryComponent } from './group-entry/group-entry.component';
// import { ActionDetailsComponent } from './action-details/action-details.component';
// import { ActionEntryComponent } from './action-entry/action-entry.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { CollectionHomeComponent } from './collection-home/collection-home.component';
// import { CustomerOverviewComponent } from './customer-overview/customer-overview.component';
// import { OverviewPendingComponent } from './overview-pending/overview-pending.component';
// import { OverviewTransactionComponent } from './overview-transaction/overview-transaction.component';
// import { LoanwiseOutstandingComponent } from './loanwise-outstanding/loanwise-outstanding.component';
// import { EmiLoanDetailsComponent } from './emi-loan-details/emi-loan-details.component';
// import { EmiLoanIssueTwoComponent } from './emi-loan-issue-two/emi-loan-issue-two.component';
// import { EmiLoanTwoComponent } from './emi-loan-two/emi-loan-two.component';
// import { DepositEntryComponent } from './deposit-entry/deposit-entry.component';
// import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
// import { DepositReturnEntryComponent } from './deposit-return-entry/deposit-return-entry.component';
// import { DepositReturnDetailsComponent } from './deposit-return-details/deposit-return-details.component';
// import { CapitalEntryComponent } from './capital-entry/capital-entry.component';
// import { CapitalDetailsComponent } from './capital-details/capital-details.component';
// import { VoucherEntryComponent } from './voucher-entry/voucher-entry.component';
// import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
// import { CustomerwiseOutComponent } from './customerwise-out/customerwise-out.component';
// import { AreawiseOutComponent } from './areawise-out/areawise-out.component';
// import { JournalDetailsComponent } from './journal-details/journal-details.component';
// import { JournalEntryComponent } from './journal-entry/journal-entry.component';
// import { SearchCustomerComponent } from './search-customer/search-customer.component';
// import { BankStatementComponent } from './bank-statement/bank-statement.component';
// import { GstReportComponent } from './gst-report/gst-report.component';
// import { OverallOutstandingComponent } from './overall-outstanding/overall-outstanding.component';




@NgModule({
  declarations: [CollectionComponent,CollectionHomeComponent
    //,LoanIssueEntryComponent, LoanIssueDetailsComponent, LoanCollectionEntryComponent, LoanCollectionDetailsComponent, EmiLoanIssueComponent, EmiLoanCollectionComponent, GroupDetailsComponent, ActionDetailsComponent, ActionEntryComponent,GroupEntryComponent,  CustomerOverviewComponent, OverviewPendingComponent, OverviewTransactionComponent, LoanwiseOutstandingComponent, EmiLoanDetailsComponent, EmiLoanIssueTwoComponent, EmiLoanTwoComponent, DepositEntryComponent, DepositDetailsComponent, DepositReturnEntryComponent, DepositReturnDetailsComponent, CapitalEntryComponent, CapitalDetailsComponent, VoucherEntryComponent, VoucherDetailsComponent, CustomerwiseOutComponent, AreawiseOutComponent, JournalDetailsComponent, JournalEntryComponent, SearchCustomerComponent, BankStatementComponent, GstReportComponent, OverallOutstandingComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule,
    FormsModule,


  ],
})
export class CollectionModule { }
