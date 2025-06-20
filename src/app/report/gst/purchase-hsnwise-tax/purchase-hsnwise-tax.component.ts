import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-purchase-hsnwise-tax',
  templateUrl: './purchase-hsnwise-tax.component.html',
  styleUrls: ['./purchase-hsnwise-tax.component.scss']
})
export class PurchaseHsnwiseTaxComponent {
  public btndisable: boolean = false;


isload: boolean = false;
  constructor(public appservice: AppService, public confirmationService: ConfirmationService, public router: Router) {
     if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    this.appservice.get_Pur_HSNWise_GST();

  }


  

  export_excel(data)
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Pur_HSNWise_Gst_Export;
   this.appservice.Excel_Data.items=this.appservice.Pur_HSNWise_GST_Row
   this.appservice.Excel_Data.Report_Name="HSNWise Tax"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Pur_HSNWise_Gst_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Net_Amt');
  this.appservice.Excel_Data.items=this.appservice.Pur_HSNWise_GST_Row
  this.appservice.Excel_Data.Report_Name="HSNWise Tax"
  this.appservice.export_pdf();
  }

  

  ngOnInit(): void {
  }

}
