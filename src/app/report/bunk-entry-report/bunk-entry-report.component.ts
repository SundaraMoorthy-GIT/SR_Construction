import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bunk-entry-report',
  templateUrl: './bunk-entry-report.component.html',
  styleUrls: ['./bunk-entry-report.component.scss']
})
export class BunkEntryReportComponent {

  public showSearch = false;
   public btndisable: boolean = false;
selectedCar: string; 
  x=6;
  constructor(public appservice: AppService) {if(this.appservice.W_width<501)
    {
      if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }this.x=5;
    }
    else
    {
    this.x=0;
    }
this.appservice.get_Bunk_daily_Entry_reports();
// this.appservice.Total_KM1;
// this.appservice.Total_KM2;
// this.appservice.Total_KM;

  }


   
  export_excel(data)
  {
    this.appservice.Excel_Data.Header=this.appservice.Daily_Bunk_Export;
    this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
    this.appservice.Excel_Data.Report_Name="BUNK Entry REPORTS";
    this.appservice.export_excel();

  }


  export_pdf(data)
 {
  this.appservice.Excel_Data.Header=this.appservice.Daily_Bunk_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'dbe_bunk_Amount');
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="BUNK Entry REPORTS("+ this.appservice.date_display(this.appservice.S_From)+" to "+this.appservice.date_display(this.appservice.S_To)+")";
  this.appservice.Excel_Data.Report_Name="BUNK Entry REPORTS";
  this.appservice.export_pdf()
  }
  ngOnInit(): void {
  }

}