import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-vehicle-fuel-report',
  templateUrl: './vehicle-fuel-report.component.html',
  styleUrls: ['./vehicle-fuel-report.component.scss']
})
export class VehicleFuelReportComponent implements OnInit {

  public showSearch = false;
  public btndisable: boolean = false;
  constructor(public appservice: AppService) {
         if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }



    try {

      if (appservice.Fuel_Entry_Report_Row.length <= 0) {
        appservice.get_Fuel_Entry_Report();
      }

    }
    catch{
      appservice.get_Fuel_Entry_Report();
    }

  }

  Print_Report() 
  {
   //window.open(this.appservice.Server_URL+"report/Print_Fuel_Expenses?From=" + this.appservice.S_From + "&To=" + this.appservice.S_To +"&Company="+this.appservice.Company, "_blank");
  }

  export_excel(data)
  {
   // window.open(this.appservice.Server_URL+"report/Print_Fuel_Expenses?From=" + this.appservice.S_From + "&To=" + this.appservice.S_To +"&Company="+this.appservice.Company, "_blank");
   this.appservice.Excel_Data.Header=this.appservice.Fuel_Entry_Report_Export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="Fuel Entry Report"
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Excel_Data.Header=this.appservice.Fuel_Entry_Report_Export;
  this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
  this.appservice.Excel_Data.Report_Name="Fuel Entry Report"
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
