import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-einvoice',
  templateUrl: './einvoice.component.html',
  styleUrls: ['./einvoice.component.scss']
})
export class EinvoiceComponent {

  public rtbresponce="";
  public richtextbox1="";
  public Doc_No="";
  public Doc_Date="";
  public IRN_No="";
  public cancelrmrk="";
  public cancelrsncode="1";

  public ewaybill=false;

  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.Doc_No=this.appservice.einvoice_Data.sal_bill_no;
    this.Doc_Date=this.appservice.einvoice_Data.sal_bill_date;
    if(this.appservice.einvoice_Data.sal_irn!="")
    {
      this.ewaybill=true;
      this.IRN_No=this.appservice.einvoice_Data.sal_irn;
      this.cancelrsncode=this.appservice.einvoice_Data.dc_cancelrsncode;
      this.cancelrmrk=this.appservice.einvoice_Data.dc_cancelrmrk;
    }
  }


  select_Ledger(rowData) {
    this.appservice.from_customer_page=true;
    this.appservice.Selected_Customer = rowData;
    this.appservice.back();
  }

  public Responce:any ={};
  GetAuthToken() {
    this.appservice.getc("Api/EInvoice/GetAuthTokenAsync").subscribe((res: any) => {
      if(res.RespObj)
      {
       // Access specific properties
       this.Responce = res.RespObj;

       // Convert the entire response object to a string (for example purposes)
       this.rtbresponce = JSON.stringify(this.Responce.EwbApiLoginDetails, null, 2); // Pretty-printed JSON string
      }
      else
      {
        this.Responce = res;
        this.rtbresponce = JSON.stringify(this.Responce, null, 2);
      }
    });
  
  }


  // public Responce:any ={};
  GetGen_DC_EWB() {
    this.appservice.get("Api/EInvoice/Gen_IRN?InvoiceNo="+this.Doc_No).subscribe((res: any) => {
       // Access specific properties
       this.Responce = res;

       // Convert the entire response object to a string (for example purposes)
       this.rtbresponce = JSON.stringify(this.Responce.Response, null, 2); // Pretty-printed JSON string
       this.richtextbox1 = JSON.stringify(this.Responce.Data, null, 2); // Pretty-printed JSON string
    });
  
  }


  // public Responce:any ={};
  Get_DC_CancelEWB() {
    this.appservice.get("Api/EInvoice/Get_DC_CancelEWB?ewayBillNo="+this.IRN_No +"&cancelrsncode="+this.cancelrsncode+"&cancelrmrk="+this.cancelrmrk+"&User="+this.appservice.CREATED_BY).subscribe((res: any) => {
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
