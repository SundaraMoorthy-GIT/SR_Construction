import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { TipperDetailsComponent } from './tipper-details/tipper-details.component';
import { AddTipperComponent } from './add-tipper/add-tipper.component';
import { JcbDetailsComponent } from './jcb-details/jcb-details.component';
import { AddJcbComponent } from './add-jcb/add-jcb.component';
import { VehicleEntryComponent } from './vehicle-entry/vehicle-entry.component';
import { AddVehicleEntryComponent } from './add-vehicle-entry/add-vehicle-entry.component';
import { SiteVisitDetailsComponent } from './site-visit-details/site-visit-details.component';
import { AddSiteVisitComponent } from './add-site-visit/add-site-visit.component';
import { TipperReportComponent } from './tipper-report/tipper-report.component';
import { TractorReportComponent } from './tractor-report/tractor-report.component';
import { JcbReportComponent } from './jcb-report/jcb-report.component';
import { HitachiReportComponent } from './hitachi-report/hitachi-report.component';
import { TractorDetailsComponent } from './tractor-details/tractor-details.component';
import { AddTractorComponent } from './add-tractor/add-tractor.component';
import { HitachiDetailsComponent } from './hitachi-details/hitachi-details.component';
import { AddHitachiComponent } from './add-hitachi/add-hitachi.component';
import { AddBunkComponent } from '../transaction/add-bunk/add-bunk.component';
import { AddBunkEntryComponent } from './add-bunk-entry/add-bunk-entry.component';

const routes: Routes = [
  { path: '', component: TransportComponent },
  { path: 'tipper-details', component: TipperDetailsComponent },
  { path: 'add-tipper', component: AddTipperComponent },
  { path: 'jcb-details', component: JcbDetailsComponent },
  { path: 'add-jcb', component: AddJcbComponent },
  { path: 'vehicle-entry', component: VehicleEntryComponent },
  { path: 'add-vehicle-entry', component: AddVehicleEntryComponent },
  { path: 'site-visit-details', component: SiteVisitDetailsComponent },
  { path: 'add-site-visit', component: AddSiteVisitComponent },
  { path: 'tipper-report', component: TipperReportComponent },
  { path: 'tractor-report', component: TractorReportComponent },
  { path: 'jcb-report', component: JcbReportComponent },
  { path: 'hitachi-report', component: HitachiReportComponent },
  { path: 'tractor-details', component: TractorDetailsComponent },
  { path: 'add-tractor', component: AddTractorComponent },
  { path: 'hitachi-details', component: HitachiDetailsComponent },
  { path: 'add-hitachi', component: AddHitachiComponent },
  {path:'add-bunk-entry',component:AddBunkEntryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
