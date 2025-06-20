import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
  import { HttpClient } from '@angular/common/http';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Location } from '@angular/common';
@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.scss']
})
export class DayBookComponent implements OnInit {
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
this.appservice.get_day_Book();
this.appservice.cr;
this.appservice.db;
this.appservice.Total;

  }
  export_excel()
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Daybook_Export;
  //  this.appservice.Excel_Data.items=this.appservice.Day_Reports_GF
   this.appservice.Excel_Data.Report_Name="DAY BOOK REPORTS"
   this.appservice.Excel_Data.items=this.appservice.Day_Book_Row
   this.appservice.export_excel();
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Daybook_Export;
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.Total;
  this.appservice.Excel_Data.items=this.appservice.Day_Book_Row
  this.appservice.Excel_Data.Report_Name="DAY BOOK REPORTS("+ this.appservice.date_display(this.appservice.S_From)+" to "+this.appservice.date_display(this.appservice.S_To)+")";
  this.appservice.export_pdf();
  }
  ngOnInit(): void {
  }

}
