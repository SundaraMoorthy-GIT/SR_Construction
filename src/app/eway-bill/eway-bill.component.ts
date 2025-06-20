import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eway-bill',
  templateUrl: './eway-bill.component.html',
  styleUrls: ['./eway-bill.component.scss']
})
export class EWayBillComponent implements OnInit {



  public rtbresponce="";
  public richtextbox1="";
  public Doc_No="";
  public Doc_Date="";
  public ewaybill_No="";
  public cancelrmrk="";
  public cancelrsncode="1";

  public ewaybill=false;

  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.Doc_No=this.appservice.Eway_Bill_Data.dc_no;
    this.Doc_Date=this.appservice.Eway_Bill_Data.dc_date;
    if(this.appservice.Eway_Bill_Data.dc_ewaybill!="")
    {
      this.ewaybill=true;
      this.ewaybill_No=this.appservice.Eway_Bill_Data.dc_ewaybill;
      this.cancelrsncode=this.appservice.Eway_Bill_Data.dc_cancelrsncode;
      this.cancelrmrk=this.appservice.Eway_Bill_Data.dc_cancelrmrk;
    }
  }


  select_Ledger(rowData) {
    this.appservice.from_customer_page=true;
    this.appservice.Selected_Customer = rowData;
    this.appservice.back();
  }

  public Responce:any ={};
  GetAuthToken() {
    this.appservice.getc("Api/EInvoice/GetAuthToken").subscribe((res: any) => {
       // Access specific properties
       this.Responce = res.RespObj;

       // Convert the entire response object to a string (for example purposes)
       this.rtbresponce = JSON.stringify(this.Responce.EwbApiLoginDetails, null, 2); // Pretty-printed JSON string
    });
  
  }


  // public Responce:any ={};
  GetGen_DC_EWB() {
    this.appservice.get("Api/EInvoice/Gen_DC_EWB?DC_No="+this.Doc_No).subscribe((res: any) => {
       // Access specific properties
       this.Responce = res;

       // Convert the entire response object to a string (for example purposes)
       this.rtbresponce = JSON.stringify(this.Responce.Response, null, 2); // Pretty-printed JSON string
       this.richtextbox1 = JSON.stringify(this.Responce.Data, null, 2); // Pretty-printed JSON string
    });
  
  }


  // public Responce:any ={};
  Get_DC_CancelEWB() {
    this.appservice.get("Api/EInvoice/Get_DC_CancelEWB?ewayBillNo="+this.ewaybill_No +"&cancelrsncode="+this.cancelrsncode+"&cancelrmrk="+this.cancelrmrk+"&User="+this.appservice.CREATED_BY).subscribe((res: any) => {
       // Access specific properties
       this.Responce = res;

       // Convert the entire response object to a string (for example purposes)
       this.rtbresponce = JSON.stringify(this.Responce.Response, null, 2); // Pretty-printed JSON string
       this.richtextbox1 = JSON.stringify(this.Responce.Data, null, 2); // Pretty-printed JSON string
    });
  
  }

  ngOnInit(): void {
  }

}
