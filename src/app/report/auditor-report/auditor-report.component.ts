import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auditor-report',
  templateUrl: './auditor-report.component.html',
  styleUrls: ['./auditor-report.component.scss']
})
export class AuditorReportComponent { 
  x=6;
  public showSearch = false;
  selectedCar: string; 
  constructor(public appservice: AppService) {if(this.appservice.W_width<501)
    {this.x=5;
    }
    else
    {
    this.x=0;
    }
this.appservice.get_Auditor_pruchase_Reports();
// this.appservice.Total_KM1;
// this.appservice.Total_KM2;
// this.appservice.Total_KM;

  }


  export_excel(data)
  {
   this.appservice.Excel_Data.Header=this.appservice.Pur_Export1;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Purchase Reports";
   this.appservice.export_excel();
 
  }



  export_pdf(data)
 {
  this.appservice.Excel_Data.Header=this.appservice.Pur_Export1;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'INV_Value');
   this.appservice.Excel_Data.Report_Name=" Purchase Reports("+ this.appservice.date_display(this.appservice.S_From)+" to "+this.appservice.date_display(this.appservice.S_To)+")";
  this.appservice.export_pdf();
  }
  ngOnInit(): void {
  }

}