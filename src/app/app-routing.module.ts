import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { ForgotPasswordComponent } from './components/pages/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/pages/authentication/reset-password/reset-password.component';
import { ReferenceDetailsComponent } from './master/reference-details/reference-details.component';
import { ReferencMasterComponent } from './master/referenc-master/referenc-master.component';
import { UserMasterComponent } from './master/user-master/user-master.component';
import { AddUserComponent } from './master/add-user/add-user.component';
import { RoleRolesPermissionsComponent } from './role-roles-permissions/role-roles-permissions.component';
import { UpdateCompanyDetailsComponent } from './update-company-details/update-company-details.component';
import { AuthenticationComponent } from './components/pages/authentication/authentication/authentication.component';
import { NotificatonComponent } from './notificaton/notificaton.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InvalidLicenceComponent } from './invalid-licence/invalid-licence.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
 import { EWayBillComponent } from './eway-bill/eway-bill.component';
 import { AddItemsComponent } from './add-items/add-items.component';
import { AddItems1Component } from './add-items1/add-items1.component';
import { EinvoiceComponent } from './einvoice/einvoice.component';
//import { LogBookEntryComponent } from './transction/log-book-entry/log-book-entry.component';





const routes: Routes = [
  { path: 'add-role', component: AddRoleComponent },
  { path: 'add-price', component: AddPriceComponent },
  { path: 'invalid-licence', component: InvalidLicenceComponent },
  { path: 'customer-search', component: CustomerSearchComponent },
  { path: 'project-search', component: ProjectSearchComponent },
  { path: 'add-item', component: AddItemsComponent },
  { path: 'add-item1', component: AddItems1Component },
  //{ path: 'log-book-entry', component: LogBookEntryComponent },
   { path: 'eway-bill', component: EWayBillComponent },
      { path: 'einvoice', component: EinvoiceComponent },
  { path: 'reference', component: ReferenceDetailsComponent },
  { path: 'add-reference', component: ReferencMasterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-company', component: UpdateCompanyDetailsComponent },
  { path: 'user-details', component: UserMasterComponent,data: {animation: 'HomePage'}  },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'role-permissions', component: RoleRolesPermissionsComponent, data: {animation: 'AboutPage'}  },
  { path: 'notification', component: NotificatonComponent },
  { path: 'role-master', component: RoleMasterComponent ,data: {animation: 'FilterPage'} },
  { path: '', component: LoginComponent },
  {
    path: 'authentication', component: AuthenticationComponent,
    children: [
      { path: 'login', pathMatch: 'full', data: { breadcrumb: 'Login' }, component: LoginComponent },
      { path: 'register', data: { breadcrumb: 'Register' }, component: RegisterComponent },
      { path: 'forgot-password', data: { breadcrumb: 'Forgot Password' }, component: ForgotPasswordComponent },
      { path: 'reset-password', data: { breadcrumb: 'Reset Password' }, component: ResetPasswordComponent },
    ]
  },

  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  { path: 'utilities', loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule) },
  { path: 'collection', loadChildren: () => import('./collection/collection.module').then(m => m.CollectionModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  { path: 'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'transport', loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule) },
  { path: 'report', loadChildren: () => import('./stock-report/stock-report.module').then(m => m.StockReportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
