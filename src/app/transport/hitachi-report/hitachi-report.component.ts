import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hitachi-report',
  templateUrl: './hitachi-report.component.html',
  styleUrls: ['./hitachi-report.component.scss']
})
export class HitachiReportComponent implements OnInit {
   
  public btndisable: boolean = false;
  
  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
      if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    this.appservice.S_Type="Hitachi";
    this.appservice.get_Vehicle_Rpt("Hitachi");
    this.appservice.get_Transport_Report();
  
  }

  public Hitachi_Reports_GF = [
    { Field: 'tpt_date', Name: 'Date', Align: '' },
    { Field: 'tpt_projectname', Name: 'Project Name', Align: '' },
    //{ Field: 'tpt_transport', Name: 'Transport', Align: '' },
    { Field: 'tpt_opening', Name: 'Opening ', Align: '' },
    { Field: 'tpt_closing', Name: 'Closing ', Align: '' },
    { Field: 'Rate', Name: 'Rate ', Align: '' },
    { Field: 'tpt_tothours', Name: 'Hours ', Align: '' },
    { Field: 'tpt_amount', Name: 'Amount ', Align: 'right' },
    //{ Field: 'tpt_remarks', Name: 'Remarks', Align: '' },
  ];

  public S_Transport="";
  public refRow:any ={};
  onChange(data)
  {
    this.refRow=this.appservice.Transport_Rpt_Rows.filter(e => e.value == data)[0];
    this.S_Transport=this.refRow.label;
  }
  
  export_excel(data)
  {
  //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');

  this.appservice.Excel_Data.FileName=this.S_Transport;
  this.appservice.Excel_Data.Report_Name="Hitachi Reports";
  this.appservice.Excel_Data.Group_Name=this.S_Transport;
   this.appservice.Excel_Data.Header=this.Hitachi_Reports_GF ;
   this.appservice.Excel_Data.items=this.appservice.Transport_Report_Row
   this.appservice.export_excel_1();
 
  }


  
  export_pdf(data)
 {

  // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount= "Total Amount : "+this.appservice.sum_of(data,'tpt_amount');
  this.appservice.Excel_Data.FileName=this.S_Transport;
  this.appservice.Excel_Data.Report_Name="Hitachi Reports \n " +this.S_Transport;
  this.appservice.Excel_Data.Header=this.Hitachi_Reports_GF;
  this.appservice.Excel_Data.items=this.appservice.Transport_Report_Row
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
