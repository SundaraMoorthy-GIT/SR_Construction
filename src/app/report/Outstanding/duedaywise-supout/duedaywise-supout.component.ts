import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-duedaywise-supout',
  templateUrl: './duedaywise-supout.component.html',
  styleUrls: ['./duedaywise-supout.component.scss']
})
export class DuedaywiseSupoutComponent {
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
  export_excel(data)
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Duedaywise_Payable_out_Export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Duedaywise Outstanding";
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Duedaywise_Payable_out_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="Duedaywise Outstanding";
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
