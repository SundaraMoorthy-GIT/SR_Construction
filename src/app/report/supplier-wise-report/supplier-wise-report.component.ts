import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-supplier-wise-report',
  templateUrl: './supplier-wise-report.component.html',
  styleUrls: ['./supplier-wise-report.component.scss']
})
export class SupplierWiseReportComponent implements OnInit {

 
  constructor(public appservice: AppService) {

    this.appservice.Cus_Type="Supplier";
   this.appservice.get_SLedger_Master();
    try {

      if (appservice.Supplier_Wise_Expense_Report_Row.length <= 0) {
        appservice.get_Supplier_Wise_Expense_Report();
      }

    }
    catch{
      appservice.get_Supplier_Wise_Expense_Report();
    }

  }

  Print_Report() 
  {
   window.open(this.appservice.Server_URL+"report/Print_Supplier_Expenses?From=" + this.appservice.S_From + "&To=" + this.appservice.S_To + "&Supplier=" + this.appservice.S_Supplier +"&Company="+this.appservice.Company, "_blank");
  }

  export_excel()
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Supplier_Wise_Expense_Report_Export;
   this.appservice.Excel_Data.items=this.appservice.Supplier_Wise_Expense_Report_Row
   this.appservice.Excel_Data.Report_Name="Supplier-Wise Expense Report"
   this.appservice.export_excel();
 
  }


  export_pdf()
 {

  this.appservice.Excel_Data.Header=this.appservice.Supplier_Wise_Expense_Report_Export;
  this.appservice.Excel_Data.items=this.appservice.Supplier_Wise_Expense_Report_Row
  this.appservice.Excel_Data.Report_Name="Supplier-Wise Expense Report"
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
