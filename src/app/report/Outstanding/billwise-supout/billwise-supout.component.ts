import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-billwise-supout',
  templateUrl: './billwise-supout.component.html',
  styleUrls: ['./billwise-supout.component.scss']
})
export class BillwiseSupoutComponent {
  public btndisable: boolean = false;



 constructor(public appservice:AppService) { 
        if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }



    this.appservice.get_Payable_OutStanding();
  }

  Customer_Pending_pdf(data,cusid) {


    window.open(this.appservice.Server_URL + "home/print_outstanding_bills?From=" + this.appservice.S_From + "&To=" + 
      this.appservice.S_To+"&type=PURCHASE"+"&report="+data + "&Company=" + this.appservice.Company+"&cusid="+cusid, "_blank");

  }
  export_excel(data)
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Billwise_Payable_outstanding_Export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Billwise Outstanding";
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Billwise_Payable_outstanding_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="Billwise Outstanding";
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
