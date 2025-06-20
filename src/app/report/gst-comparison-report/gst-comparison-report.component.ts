import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gst-comparison-report',
  templateUrl: './gst-comparison-report.component.html',
  styleUrls: ['./gst-comparison-report.component.scss']
})
export class GstComparisonReportComponent implements OnInit {
  public showSearch = false;
   public btndisable: boolean = false;
  constructor(public confirmationService:ConfirmationService,public appservice:AppService,public router:Router) {
       if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    this.appservice.get_GST2b_comparison_reports();
    
    }


    public GST2b_Reports_GF__ = [
      { Field: 'Month', Name: 'Month', Align: '' },
      { Field: 'Name', Name: 'Name', Align: '' },
      { Field: 'GSTNo', Name: 'GSTNo', Align: '' },
      { Field: 'Amount', Name: 'Amount', Align: 'right' },
      { Field: 'BAmount', Name: '2BAmount ', Align: 'right' },
      { Field: 'Diff', Name: 'Diff ', Align: 'right' },
    ];
    export_excel(data)
  {
  //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');

  this.appservice.Excel_Data.FileName="GSTComparisonReports";
  this.appservice.Excel_Data.Report_Name="GST Comparison Reports";
   this.appservice.Excel_Data.Header=this.GST2b_Reports_GF__ ;
   this.appservice.Excel_Data.items=this.appservice.GST2b_comparison_Rows
   this.appservice.export_excel();
 
  }


  
  export_pdf(data)
 {

  // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  
  this.appservice.Excel_Data.Total_Amount= "Total Amount : "+this.appservice.sum_of(data,'Amount') +"  2BAmount : "+this.appservice.sum_of(data,'BAmount')+"  Diff : "+this.appservice.sum_of(data,'Diff');
  this.appservice.Excel_Data.FileName="GSTComparisonReports";
  this.appservice.Excel_Data.Report_Name="GST Comparison Reports";
  this.appservice.Excel_Data.Header=this.GST2b_Reports_GF__;
  this.appservice.Excel_Data.items=this.appservice.GST2b_comparison_Rows
  this.appservice.export_pdf();
  }

  ngOnInit(): void {
  }

}
