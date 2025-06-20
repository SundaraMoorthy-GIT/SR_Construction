import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-billwise-out',
  templateUrl: './billwise-out.component.html',
  styleUrls: ['./billwise-out.component.scss']
})
export class BillwiseOutComponent implements OnInit {

  constructor(public appservice:AppService) { 

    this.appservice.get_OutStanding();
  }
  
  Ledger_Balance_pdf(){
  
  // var parm="Date=" + this.appservice.S_To + "&Sales_person=" + this.appservice.S_Sales + "&Area=" + this.appservice.S_Area + "&Customer=0&Area_Map=" + this.appservice.Area_Map + "&Rights=" + this.appservice.Rights_Name + "&User_ID=" + this.appservice.Current_User.UM_ID + "&Order_by=Bill_Date"+"&Company=" + this.appservice.Company  ;
  // window.open(this.appservice.Server_URL+"report/PRS_Balance_Ledger?"+parm,"_blank");

  }
  export_excel()
  {
 
  //  this.appservice.Excel_Data.Header=this.appservice.Billwise_out_Export;
   this.appservice.Excel_Data.items=this.appservice.Billwise_Out
   this.appservice.Excel_Data.Report_Name="Billwise Out"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  // this.appservice.Excel_Data.Header=this.appservice.Billwise_out_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Billwise_Out
  this.appservice.Excel_Data.Report_Name="Billwise Out"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
