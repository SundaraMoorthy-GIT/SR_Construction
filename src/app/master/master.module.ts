import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RawMaterialDetailsComponent } from './raw-material-details/raw-material-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
 import { SharedModule } from '../shared/shared.module';
 import { FormsModule } from '@angular/forms';
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
// import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [MasterComponent, AddProductComponent, RawMaterialDetailsComponent, ProductDetailsComponent, CustomerDetailsComponent, SupplierDetailsComponent, AddCustomerComponent, EmployeeDetailsComponent, AddEmployeeComponent, ContractordetailsComponent, 
    AddContractorComponent, VechiledetailsComponent, AddVechileComponent, BomDetailsComponent, AddBomComponent, BankDetailsComponent, AddBankComponent, MachinerDetailsComponent, AddMachinerComponent, TransportRatingMasterComponent, AddRatingMasterComponent, LedgerdetailsComponent, AddLedgerComponent, LedgerGroupComponent, AddLedgerGroupComponent, TyreDetailsComponent, AddTyreComponent, AddBranchComponent, BranchDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MasterRoutingModule,
    SharedModule,
   

  ]
})
export class MasterModule { }
