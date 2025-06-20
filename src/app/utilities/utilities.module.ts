import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UtilitiesRoutingModule } from './utilities-routing.module';
import { UtilitiesComponent } from './utilities.component';
// import { UploadItemsComponent } from './upload-items/upload-items.component';
// import { UploadEmplyeesComponent } from './upload-emplyees/upload-emplyees.component';
// import { UploadSupplierComponent } from './upload-supplier/upload-supplier.component';


@NgModule({
  declarations: [UtilitiesComponent//, UploadItemsComponent, UploadEmplyeesComponent, UploadSupplierComponent
],
  imports: [
    CommonModule,
    UtilitiesRoutingModule,
    SharedModule,
  ]
})
export class UtilitiesModule { }
