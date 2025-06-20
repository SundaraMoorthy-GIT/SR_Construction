import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-supplierwise-purchase',
  templateUrl: './supplierwise-purchase.component.html',
  styleUrls: ['./supplierwise-purchase.component.scss']
})
export class SupplierwisePurchaseComponent {
  public btndisable: boolean = false;

 constructor(public appservice: AppService) {
   if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }


  }
 export_excel()
 {

  this.appservice.Excel_Data.Header=this.appservice.Supplierwise_purchase_Export;
  this.appservice.Excel_Data.items=this.appservice.Supplierwise_Purchase
  this.appservice.Excel_Data.Report_Name="Supplierwise Purchase"
  this.appservice.export_excel();

 }


 export_pdf(data)
{

 this.appservice.Excel_Data.Header=this.appservice.Supplierwise_purchase_Export;
 this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
 this.appservice.Excel_Data.items=this.appservice.Supplierwise_Purchase
 this.appservice.Excel_Data.Report_Name="Supplierwise Purchase"
 this.appservice.export_pdf();
 }

  ngOnInit(): void {
  }

}
