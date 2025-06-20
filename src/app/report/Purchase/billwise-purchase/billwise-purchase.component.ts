import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-billwise-purchase',
  templateUrl: './billwise-purchase.component.html',
  styleUrls: ['./billwise-purchase.component.scss']
})
export class BillwisePurchaseComponent {
  public btndisable: boolean = false;

  constructor(public appservice:AppService) { 
      if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    try
    {
    if (appservice.Itemwise_purchase_Row.length <= 0) {
      this.appservice.get_Purchase_Report();
    }
  }catch{
    this.appservice.get_Purchase_Report();
  }
  }

  Print_Bill(data)
  {
    this.appservice.get("Api/Hotel/Reprint_takeaway?Bill_No="+data).subscribe((res: any) => {
    
    });
  }


  
  export_excel()
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Billwise_Purchase_Export;
   this.appservice.Excel_Data.items=this.appservice.Billwise_Purchase_Sum_Row
   this.appservice.Excel_Data.Report_Name="Billwise Sales"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Billwise_Purchase_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.Billwise_Purchase_Sum_Row
  this.appservice.Excel_Data.Report_Name="Billwise Sales"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }



}
