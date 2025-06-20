import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-salespersonwise-out',
  templateUrl: './salespersonwise-out.component.html',
  styleUrls: ['./salespersonwise-out.component.scss']
})
export class SalespersonwiseOutComponent implements OnInit {

  constructor(public appservice:AppService) { }
  export_excel()
  {
 
  //  this.appservice.Excel_Data.Header=this.appservice.Salespersonwise_out_Export;
   
   this.appservice.Excel_Data.items=this.appservice.Sales_Personwise_Out
   this.appservice.Excel_Data.Report_Name="Customerwise Out"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  // this.appservice.Excel_Data.Header=this.appservice.Salespersonwise_out_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Sales_Personwise_Out
  this.appservice.Excel_Data.Report_Name="Customerwise Out"
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
