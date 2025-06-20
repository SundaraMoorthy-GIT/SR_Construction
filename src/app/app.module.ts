import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard/dashboard.component';
import { EcommerceComponent } from './components/pages/dashboard/ecommerce/ecommerce.component';
import { AuthenticationComponent } from './components/pages/authentication/authentication/authentication.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { LoginWithImageComponent } from './components/pages/authentication/login-with-image/login-with-image.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { RegisterWithImageComponent } from './components/pages/authentication/register-with-image/register-with-image.component';
import { ForgotPasswordComponent } from './components/pages/authentication/forgot-password/forgot-password.component';
import { ForgotPasswordWithImageComponent } from './components/pages/authentication/forgot-password-with-image/forgot-password-with-image.component';
import { ResetPasswordComponent } from './components/pages/authentication/reset-password/reset-password.component';
import { ResetPasswordWithImageComponent } from './components/pages/authentication/reset-password-with-image/reset-password-with-image.component';
import { ReferenceDetailsComponent } from './master/reference-details/reference-details.component';
import { ReferencMasterComponent } from './master/referenc-master/referenc-master.component';
import {FileUploadModule} from 'primeng/fileupload';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { UserMasterComponent } from './master/user-master/user-master.component';
import { AddUserComponent } from './master/add-user/add-user.component';
import { MyDatePickerModule } from 'mydatepicker';
import { RoleRolesPermissionsComponent } from './role-roles-permissions/role-roles-permissions.component';
import { UpdateCompanyDetailsComponent } from './update-company-details/update-company-details.component';
import { NotificatonComponent } from './notificaton/notificaton.component';
import { AddItem1Component } from './master/add-item1/add-item1.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InvalidLicenceComponent } from './invalid-licence/invalid-licence.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { AddPriceComponent } from './add-price/add-price.component';
 import { EWayBillComponent } from './eway-bill/eway-bill.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { AddItems1Component } from './add-items1/add-items1.component';
import { EinvoiceComponent } from './einvoice/einvoice.component';
//import { LogBookEntryComponent } from './transction/log-book-entry/log-book-entry.component';
// import { TransportComponent } from './transport/transport.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    EcommerceComponent,EWayBillComponent,
    AuthenticationComponent,
    LoginComponent,
    LoginWithImageComponent,
    RegisterComponent,
    RegisterWithImageComponent,
    ForgotPasswordComponent,
    ForgotPasswordWithImageComponent,
    ResetPasswordComponent,
    ResetPasswordWithImageComponent,
    ReferenceDetailsComponent,
    ReferencMasterComponent,
    UserMasterComponent,
    AddUserComponent,
    UpdateCompanyDetailsComponent,
    RoleRolesPermissionsComponent,
    NotificatonComponent,
    AddItem1Component,
    RoleMasterComponent,
    SettingDashboardComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    InvalidLicenceComponent,
    AddRoleComponent,
    CustomerSearchComponent,
    ProjectSearchComponent,
    ProjectReportComponent,
    AddPriceComponent,
    AddItemsComponent,
    AddItems1Component,EinvoiceComponent,
    //LogBookEntryComponent
    //,TransportComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DropdownModule,
    MultiSelectModule,
    RouterModule ,
    FormsModule ,
    ReactiveFormsModule,
    
    HttpClientModule,
    TableModule,
    FileUploadModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
    
    ConfirmDialogModule,
    MyDatePickerModule,
   
  ],

 
  providers: [DatePipe,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


 export  interface Order_DB_ {
  Pending: number;
  Delivery: number;
  T_Pending: number;
  T_Orders: number;
  Y_Orders: number;
  Y_Pending: number;
  Y_Delivery: number
}
