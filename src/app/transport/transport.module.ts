import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TipperDetailsComponent } from './tipper-details/tipper-details.component';
import { AddTipperComponent } from './add-tipper/add-tipper.component';
import { JcbDetailsComponent } from './jcb-details/jcb-details.component';
import { AddJcbComponent } from './add-jcb/add-jcb.component';
import { VehicleEntryComponent } from './vehicle-entry/vehicle-entry.component';
import { AddVehicleEntryComponent } from './add-vehicle-entry/add-vehicle-entry.component';
import { SiteVisitDetailsComponent } from './site-visit-details/site-visit-details.component';
import { AddSiteVisitComponent } from './add-site-visit/add-site-visit.component';
import { BunkDetailsComponent } from './bunk-details/bunk-details.component';
import { AddBunkEntryComponent } from './add-bunk-entry/add-bunk-entry.component';
import { TipperReportComponent } from './tipper-report/tipper-report.component';
import { TractorReportComponent } from './tractor-report/tractor-report.component';
import { JcbReportComponent } from './jcb-report/jcb-report.component';
import { HitachiReportComponent } from './hitachi-report/hitachi-report.component';
import { TractorDetailsComponent } from './tractor-details/tractor-details.component';
import { AddTractorComponent } from './add-tractor/add-tractor.component';
import { HitachiDetailsComponent } from './hitachi-details/hitachi-details.component';
import { AddHitachiComponent } from './add-hitachi/add-hitachi.component';





@NgModule({
  declarations: [TransportComponent,TipperDetailsComponent, AddTipperComponent, JcbDetailsComponent, AddJcbComponent, VehicleEntryComponent, AddVehicleEntryComponent, SiteVisitDetailsComponent, AddSiteVisitComponent, BunkDetailsComponent, AddBunkEntryComponent, TipperReportComponent, TractorReportComponent, JcbReportComponent, HitachiReportComponent, TractorDetailsComponent, AddTractorComponent, HitachiDetailsComponent, AddHitachiComponent],
  imports: [
    CommonModule,
    TransportRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TransportModule { }
