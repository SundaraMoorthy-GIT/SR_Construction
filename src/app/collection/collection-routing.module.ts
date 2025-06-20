import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
 import { CollectionHomeComponent } from './collection-home/collection-home.component';
// import { CustomerOverviewComponent } from './customer-overview/customer-overview.component';
// import { OverviewPendingComponent } from './overview-pending/overview-pending.component';
// import { OverviewTransactionComponent } from './overview-transaction/overview-transaction.component';
// import { LoanwiseOutstandingComponent } from './loanwise-outstanding/loanwise-outstanding.component';
// import { EmiLoanDetailsComponent } from './emi-loan-details/emi-loan-details.component';
// import { EmiLoanIssueTwoComponent } from './emi-loan-issue-two/emi-loan-issue-two.component';
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

const routes: Routes = [
  // { path: 'customerwise-out', component: CustomerwiseOutComponent },
  // { path: 'gst-report', component: GstReportComponent },
  // { path: 'overall-out', component: OverallOutstandingComponent },

  // { path: 'search-customer', component: SearchCustomerComponent },
  // { path: 'bank-statement', component: BankStatementComponent },

  // { path: 'journal-details', component: JournalDetailsComponent },
  // { path: 'journal-entry', component: JournalEntryComponent },

  // { path: 'areawise-out', component: AreawiseOutComponent },
  // { path: 'voucher-entry', component: VoucherEntryComponent },
  // { path: 'voucher-details', component: VoucherDetailsComponent },
  // { path: 'capital-entry', component: CapitalEntryComponent },
  // { path: 'capital-details', component: CapitalDetailsComponent },
  // { path: 'deposit-entry', component: DepositEntryComponent },
  // { path: 'deposit-details', component: DepositDetailsComponent },
  // { path: 'deposit-return-entry', component: DepositReturnEntryComponent },
  // { path: 'deposit-return-details', component: DepositReturnDetailsComponent },
  // { path: 'loan-issue', component: LoanIssueEntryComponent },
  // { path: 'loan-issue-details', component: LoanIssueDetailsComponent },
  // { path: 'loan-collection', component: LoanCollectionEntryComponent },
  // { path: 'loan-collection-details', component: LoanCollectionDetailsComponent },
  // { path: 'emi-loan-issue', component: EmiLoanIssueComponent },
  // { path: 'emi-loan-issue-two', component: EmiLoanIssueTwoComponent },

  // { path: 'emi-loan-issue-details', component: EmiLoanDetailsComponent },

  // { path: 'emi-loan-collection', component: EmiLoanCollectionComponent },
  // { path: 'customer_overview', component: CustomerOverviewComponent },
  // { path: 'overview-pending', component: OverviewPendingComponent },
  // { path: 'overview-transaction', component: OverviewTransactionComponent },
  // { path: 'loanwise-outstanding', component: LoanwiseOutstandingComponent },

  // { path: 'group_details', component: GroupDetailsComponent },
  // { path: 'action_details', component: ActionDetailsComponent },
  // { path: 'action_entry', component: ActionEntryComponent },
  // { path: 'group-entry', component: GroupEntryComponent },
   { path: 'collection-home', component: CollectionHomeComponent },

  { path: '', component: CollectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
