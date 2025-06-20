import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-purchase-gst-report',
  templateUrl: './purchase-gst-report.component.html',
  styleUrls: ['./purchase-gst-report.component.scss']
})
export class PurchaseGstReportComponent {

 isload: boolean = false;
 public btndisable: boolean = false;
  constructor(public appservice: AppService, public confirmationService: ConfirmationService, public router: Router) {
     if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }


    if (appservice.Purchase_Row.length <= 0) {
      this.appservice.get_Purchase_Details();
    }
  }


  

 
  export_excel(data)
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Purchase_Gst_Export;
   this.appservice.Excel_Data.items=this.appservice.Purchase_Row
   this.appservice.Excel_Data.Report_Name="Purchase GST"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Purchase_Gst_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Net_Amt');
  this.appservice.Excel_Data.items=this.appservice.Purchase_Row
  this.appservice.Excel_Data.Report_Name="Purchase GST"
  this.appservice.export_pdf();
  }

  

  ngOnInit(): void {
  }

}
