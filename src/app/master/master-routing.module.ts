import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { RawMaterialDetailsComponent } from './raw-material-details/raw-material-details.component';
 import { ProductDetailsComponent } from './product-details/product-details.component';
 import { AddProductComponent } from './add-product/add-product.component';
 import { CustomerDetailsComponent } from './customer-details/customer-details.component';
 import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
 import { AddCustomerComponent } from './add-customer/add-customer.component';
 import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
 import { AddEmployeeComponent } from './add-employee/add-employee.component';
 import { ContractordetailsComponent } from './contractordetails/contractordetails.component';
 import { AddContractorComponent } from './add-contractor/add-contractor.component';
 import { VechiledetailsComponent } from './vechiledetails/vechiledetails.component';
 import { AddVechileComponent } from './add-vechile/add-vechile.component';
 import { BomDetailsComponent } from './bom-details/bom-details.component';
 import { AddBomComponent } from './add-bom/add-bom.component';
 import { BankDetailsComponent } from './bank-details/bank-details.component';
 import { AddBankComponent } from './add-bank/add-bank.component';
 import { MachinerDetailsComponent } from './machiner-details/machiner-details.component';
 import { AddMachinerComponent } from './add-machiner/add-machiner.component';
 import { TransportRatingMasterComponent } from './transport-rating-master/transport-rating-master.component';
 import { AddRatingMasterComponent } from './add-rating-master/add-rating-master.component';
 import { LedgerdetailsComponent } from './ledgerdetails/ledgerdetails.component';
 import { AddLedgerComponent } from './add-ledger/add-ledger.component';
 import { LedgerGroupComponent } from './ledger-group/ledger-group.component';
 import { AddLedgerGroupComponent } from './add-ledger-group/add-ledger-group.component';
 import { TyreDetailsComponent } from './tyre-details/tyre-details.component';
 import { AddTyreComponent } from './add-tyre/add-tyre.component';
 import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
const routes: Routes = [
  { path: 'branch-details', component: BranchDetailsComponent },
  { path: 'add-branch', component: AddBranchComponent },
  { path: 'tyre-details', component: TyreDetailsComponent },
  { path: 'add-tyre', component: AddTyreComponent },
  { path: 'ledger-details', component: LedgerdetailsComponent },
  { path: 'add-ledger', component: AddLedgerComponent },
  { path: 'ledger-group', component: LedgerGroupComponent },
  { path: 'add-ledger-group', component: AddLedgerGroupComponent },
  { path: '', component: MasterComponent },
  { path: 'raw-material-master', component: RawMaterialDetailsComponent },
   { path: 'product-details', component: ProductDetailsComponent },
   { path: 'add-product', component: AddProductComponent },
   { path: 'customer-details', component: CustomerDetailsComponent },
   { path: 'supplier-details', component: SupplierDetailsComponent },
   { path: 'add-customer', component: AddCustomerComponent },
   { path: 'employee-details', component: EmployeeDetailsComponent },
   { path: 'add-employee', component: AddEmployeeComponent },
   { path: 'contractordetails', component: ContractordetailsComponent },
   { path: 'add-contractor', component: AddContractorComponent },
   { path: 'vechiledetails', component: VechiledetailsComponent },
   { path: 'add-vechile', component: AddVechileComponent },
   { path: 'bom-details', component: BomDetailsComponent },
   { path: 'add-bom', component: AddBomComponent },
   { path: 'bank-details', component: BankDetailsComponent },
   { path: 'add-bank', component: AddBankComponent },
   { path: 'machiner-details', component: MachinerDetailsComponent },
   { path: 'add-machiner', component: AddMachinerComponent },
   { path: 'transport-rating-master', component: TransportRatingMasterComponent },
   { path: 'add-rating-master', component: AddRatingMasterComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
