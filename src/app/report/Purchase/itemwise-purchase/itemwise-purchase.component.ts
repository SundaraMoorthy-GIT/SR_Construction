import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-itemwise-purchase',
  templateUrl: './itemwise-purchase.component.html',
  styleUrls: ['./itemwise-purchase.component.scss']
})
export class ItemwisePurchaseComponent {
  public btndisable: boolean = false;


 constructor(public appservice:AppService) {
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
 
   this.appservice.Excel_Data.Header=this.appservice. Itemwise_Purchase_Export;
   this.appservice.Excel_Data.items=this.appservice.Item_wise_purchase_Row
   this.appservice.Excel_Data.Report_Name="Itemwise Purchase"
   this.appservice.export_excel();
 
  }


  Print_Data()
  {
    

    window.open(this.appservice.Server_URL+"report/Print_profit_Report?From="+this.appservice.S_From+"&To="+this.appservice.S_To+"&Company="+this.appservice.Company, "_blank");
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice. Itemwise_Purchase_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 this.appservice.Excel_Data.Total_Amount="Purchse : "+this.appservice.sum_of(data,'Amount')+" Sales : "+this.appservice.sum_of(data,'S_Rate')+" Profit : "+this.appservice.sum_of(data,'Profit');;
  this.appservice.Excel_Data.items=this.appservice.Item_wise_purchase_Row
  this.appservice.Excel_Data.Report_Name="Itemwise Purchase"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
