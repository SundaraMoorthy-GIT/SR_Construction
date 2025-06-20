import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PageSettupComponent } from './page-settup/page-settup.component';
import { AreaMappingComponent } from './area-mapping/area-mapping.component';
import { FieldsSettingComponent } from './fields-setting/fields-setting.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { CompanyMenuMapingComponent } from './company-menu-maping/company-menu-maping.component';
// import { CompanyMasterComponent } from './company-master/company-master.component';
import { SharedModule } from '../shared/shared.module';
import { AddCompanyMasterComponent } from './add-company-master/add-company-master.component';
import { InvoiceComponent } from './template/invoice/invoice.component';
import { PurchaseComponent } from './template/purchase/purchase.component';
import { ProformaComponent } from './template/proforma/proforma.component';
import { SeraialNoSettingsComponent } from './seraial-no-settings/seraial-no-settings.component';
// import { AddSerialNoComponent } from './add-serial-no/add-serial-no.component';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { BackupComponent } from './backup/backup.component';
import { SmsSettingComponent } from './sms-setting/sms-setting.component';
import { GmailSettingComponent } from './gmail-setting/gmail-setting.component';
import { TemplateSettingComponent } from './template-setting/template-setting.component';
 import { VariableSettingsComponent } from './variable-settings/variable-settings.component';
// import { AddVariableSettingsComponent } from './add-variable-settings/add-variable-settings.component';
import { RepostComponent } from './repost/repost.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
// import { GroupMappingComponent } from './group-mapping/group-mapping.component';
// import { AddGroupMappingComponent } from './add-group-mapping/add-group-mapping.component';
// import { LedgerMappingComponent } from './ledger-mapping/ledger-mapping.component';
// import { AddLedgerMappingComponent } from './add-ledger-mapping/add-ledger-mapping.component';


@NgModule({
  declarations: [SettingsComponent, PageSettupComponent, AreaMappingComponent, FieldsSettingComponent,
    //CompanyMasterComponent, 
    AddCompanyMasterComponent, MenuDetailsComponent, AddMenuComponent, CompanyMenuMapingComponent, InvoiceComponent, PurchaseComponent, ProformaComponent,SeraialNoSettingsComponent, 
    //AddSerialNoComponent, 
    ThemeSettingComponent, BackupComponent, SmsSettingComponent, GmailSettingComponent, TemplateSettingComponent,RepostComponent, 
     VariableSettingsComponent, BranchDetailsComponent, AddBranchComponent, 
    // AddVariableSettingsComponent, GroupMappingComponent, AddGroupMappingComponent, LedgerMappingComponent, AddLedgerMappingComponent
    ],
  
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
    
  ]
})
export class SettingsModule { }
