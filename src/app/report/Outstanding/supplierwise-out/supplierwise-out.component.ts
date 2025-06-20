import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-supplierwise-out',
  templateUrl: './supplierwise-out.component.html',
  styleUrls: ['./supplierwise-out.component.scss']
})
export class SupplierwiseOutComponent {
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
 
   this.appservice.Excel_Data.Header=this.appservice.Supplierwise_outstanding_Export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Supplierwise Outstanding";
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Supplierwise_outstanding_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="Supplierwise Outstanding";
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }


}
