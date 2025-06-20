import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-userwise-purchase',
  templateUrl: './userwise-purchase.component.html',
  styleUrls: ['./userwise-purchase.component.scss']
})
export class UserwisePurchaseComponent {
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
 
   this.appservice.Excel_Data.Header=this.appservice.Userwise_Purchase_Export;
   this.appservice.Excel_Data.items=this.appservice.userwise_Purchase_Sum_Row
   this.appservice.Excel_Data.Report_Name="Userwise Purchase"
   this.appservice.export_excel();
 
  }


  export_pdf()
 {

  this.appservice.Excel_Data.Header=this.appservice.Userwise_Purchase_Export;
  this.appservice.Excel_Data.items=this.appservice.userwise_Purchase_Sum_Row
  this.appservice.Excel_Data.Report_Name="Userwise Purchase"
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }


}
