import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-daywise-purchase',
  templateUrl: './daywise-purchase.component.html',
  styleUrls: ['./daywise-purchase.component.scss']
})
export class DaywisePurchaseComponent {
  public btndisable: boolean = false;

  constructor( public appservice:AppService) {
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
 
   this.appservice.Excel_Data.Header=this.appservice.Daywise_Purchase_Export;
   this.appservice.Excel_Data.items=this.appservice.Date_wise_Purchase_Row
   this.appservice.Excel_Data.Report_Name="Daywise Purchase"
   this.appservice.export_excel();
 
  }

w
  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Daywise_Purchase_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Date_wise_Purchase_Row
  this.appservice.Excel_Data.Report_Name="Daywise Purchase"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
