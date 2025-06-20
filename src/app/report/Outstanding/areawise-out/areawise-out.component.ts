import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-areawise-out',
  templateUrl: './areawise-out.component.html',
  styleUrls: ['./areawise-out.component.scss']
})
export class AreawiseOutComponent implements OnInit {

  constructor(public appservice:AppService) { }
  export_excel()
  {
 
  //  this.appservice.Excel_Data.Header=this.appservice.Areawise_out_Export;
   this.appservice.Excel_Data.items=this.appservice.Areawise_Out
   this.appservice.Excel_Data.Report_Name="Areawise Out"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  // this.appservice.Excel_Data.Header=this.appservice.Areawise_out_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Areawise_Out
  this.appservice.Excel_Data.Report_Name="Areawise Out"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
