import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-entrywise-col',
  templateUrl: './entrywise-col.component.html',
  styleUrls: ['./entrywise-col.component.scss']
})
export class EntrywiseColComponent implements OnInit {
  public btndisable: boolean = false;


  constructor(public appservice:AppService) { 
       if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }


    this.appservice.get_Collections_Details();
  }
  export_excel()
  {
 
  //  this.appservice.Excel_Data.Header=this.appservice.Entrywise_Collection_Export;
   this.appservice.Excel_Data.items=this.appservice.Collection_Row
   this.appservice.Excel_Data.Report_Name="Entrywise Collection ("+ this.appservice.S_From+" to "+this.appservice.S_To+")";
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  // this.appservice.Excel_Data.Header=this.appservice.Entrywise_Collection_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Collection_Row
  this.appservice.Excel_Data.Report_Name="Entrywise Collection"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
