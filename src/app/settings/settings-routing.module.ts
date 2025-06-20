import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSettupComponent } from './page-settup/page-settup.component';
import { SettingsComponent } from './settings.component';
import { AreaMappingComponent } from './area-mapping/area-mapping.component';
import { FieldsSettingComponent } from './fields-setting/fields-setting.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { CompanyMenuMapingComponent } from './company-menu-maping/company-menu-maping.component';
// import { CompanyMasterComponent } from './company-master/company-master.component';
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
// import { GroupMappingComponent } from './group-mapping/group-mapping.component';
// import { AddGroupMappingComponent } from './add-group-mapping/add-group-mapping.component';
// import { LedgerMappingComponent } from './ledger-mapping/ledger-mapping.component';
// import { AddLedgerMappingComponent } from './add-ledger-mapping/add-ledger-mapping.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'add-branch', component: AddBranchComponent },
  { path: 'branch-details', component: BranchDetailsComponent },
  // { path: 'ledger-mapping', component: LedgerMappingComponent },
  // { path: 'add-ledger-mapping', component: AddLedgerMappingComponent },

   { path: 'seraial-no-settings', component: SeraialNoSettingsComponent },
  // { path: 'add-serial-no', component: AddSerialNoComponent },
  { path: 'repost', component: RepostComponent },
  // { path: 'group-mapping', component: GroupMappingComponent },
  // { path: 'add-group-mapping', component: AddGroupMappingComponent },
  { path: 'page-settup', component: PageSettupComponent },
  { path: 'area-mapping', component: AreaMappingComponent },
  { path: 'field-setting', component: FieldsSettingComponent },
  { path: 'add-menu', component: AddMenuComponent },
  { path: 'menu-details', component: MenuDetailsComponent },
  { path: 'company-menus', component: CompanyMenuMapingComponent },
  // { path: 'company-master', component: CompanyMasterComponent },
  { path: 'add-company-master', component: AddCompanyMasterComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'backup', component: BackupComponent },
  { path: 'theme-setting', component: ThemeSettingComponent },
  { path: 'sms-setting', component: SmsSettingComponent },
  { path: 'gmail-setting', component: GmailSettingComponent },
  { path: 'template-setting', component: TemplateSettingComponent },
   { path: 'variable-setting', component: VariableSettingsComponent },
  // { path: 'add_variable-setting', component: AddVariableSettingsComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
