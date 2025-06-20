import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-logbook-report',
  templateUrl: './logbook-report.component.html',
  styleUrls: ['./logbook-report.component.scss']
})
export class LogbookReportComponent implements OnInit {
  x=6;
  public showSearch = false;
  public btndisable: boolean = false;

  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
       if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    if(this.appservice.W_width<501)
    {this.x=5;
    }
    else
    {
    this.x=0;
    }
this.appservice.get_Log_Book_Entry_Reports();
// this.appservice.Total_KM1;
// this.appservice.Total_KM2;
// this.appservice.Total_KM;

  }
  export_excel(data)
  {
   this.appservice.Excel_Data.Header=this.appservice.log_book_Export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Log BOOK REPORTS";
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {
  this.appservice.Excel_Data.Header=this.appservice.log_book_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Km : "+this.appservice.sum_of(data,'Total_Running_KM');
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="Log BOOK REPORTS("+ this.appservice.date_display(this.appservice.S_From)+" to "+this.appservice.date_display(this.appservice.S_To)+")";
  this.appservice.Excel_Data.Report_Name="Log BOOK REPORTS";
  this.appservice.export_pdf();
  
  }


  ngOnInit(): void {
  }

}
