import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-bunk-report',
  templateUrl: './bunk-report.component.html',
  styleUrls: ['./bunk-report.component.scss']
})
export class BunkReportComponent implements OnInit {
  x=6;

  public showSearch = false;
  public btndisable: boolean = false;

  constructor(public appservice: AppService) {if(this.appservice.W_width<501)
    {
           if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
this.x=5;
    }
    else
    {
    this.x=0;
    }
this.appservice.get_Bunk_Entry_Reports();
// this.appservice.Total_KM1;
// this.appservice.Total_KM2;
// this.appservice.Total_KM;

  }
  export_excel(data)
  {
    this.appservice.Excel_Data.Header=this.appservice.bunk_export1;
    this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
    this.appservice.Excel_Data.Report_Name="BUNK REPORTS";
    this.appservice.export_excel();

  }


  export_pdf(data)
 {
  this.appservice.Excel_Data.Header=this.appservice.bunk_export1;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name=" BUNK REPORTS("+ this.appservice.date_display(this.appservice.S_From)+" to "+this.appservice.date_display(this.appservice.S_To)+")";
  this.appservice.Excel_Data.Report_Name=" BUNK REPORTS";
  this.appservice.export_pdf()
  }
  ngOnInit(): void {
  }

}