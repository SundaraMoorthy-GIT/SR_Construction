import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MyDatePickerModule } from 'mydatepicker';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { VindropdownComponent } from './vindropdown/vindropdown.component';
import { Vindropdown1Component } from './vindropdown1/vindropdown1.component';
import { VingridComponent } from './vingrid/vingrid.component';
import { VinledgerComponent } from './vinledger/vinledger.component';
import { Vinledger1Component } from './vinledger1/vinledger1.component';

@NgModule({
  declarations: [VindropdownComponent, Vindropdown1Component, VingridComponent, VinledgerComponent, Vinledger1Component],
  imports: [
 
    CommonModule,
    FormsModule,
    DropdownModule,
    RouterModule ,
    FormsModule ,
    HttpClientModule,
    TableModule,
    FileUploadModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MyDatePickerModule,
    AutoCompleteModule,
    
  ],
  exports: [
    DropdownModule,
    MultiSelectModule,
    RouterModule ,
    FormsModule ,
    HttpClientModule,
    TableModule,
    FileUploadModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MyDatePickerModule,
    VindropdownComponent,
    Vindropdown1Component,
    VingridComponent,
    VinledgerComponent,
    Vinledger1Component
  ],
})
export class SharedModule { }
