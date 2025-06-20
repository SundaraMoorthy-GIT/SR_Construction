import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-details',
  templateUrl: './production-details.component.html',
  styleUrls: ['./production-details.component.scss']
})
export class ProductionDetailsComponent implements OnInit {

  public showSearch = false;
  isload: boolean = false;
   public btndisable: boolean = false;
  constructor(public appservice: AppService, public confirmationService: ConfirmationService, public router: Router) {
      if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    try
    {
    if (appservice.Production_Row.length <= 0) {
      this.appservice.get_Production_Details();
    }
  }catch{
    this.appservice.get_Production_Details();
  }
  }

  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/production-entry']);
  }

  load_page()
  {
    this.router.navigate(['/transaction/production-entry']);
  }

  open_pdf(data) {

    var parm="User=" + this.appservice.CREATED_BY + "&Company=" + this.appservice.Company + "&File_Name="+data.Bill_No.replace(/[^a-zA-Z0-9 ]/g, "_")+"&File_Type=pdf&Bill_No="+data.Bill_No;
    window.open(this.appservice.Server_URL+"PDF/Export_Invoice?"+parm, "_blank");

  }


  public Rows = [];

  veiw_data(data) {

  }

  datas: any = {};
  rows = [];
  edit_data(data) {

    this.appservice.header_Row=data;

   
    this.appservice.get("Api/transaction/get_Production_Entry_details?Pro_No=" + data.pur_purchase_no).subscribe((res: any) => {
      this.appservice.Details_Row = JSON.parse(res).record;
      this.appservice.isEdit=true;
      this.router.navigate(['/transaction/production-entry']);
      
    });

  }


  delete_data(data) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(data.pur_purchase_no)
      }
    });
  }



  Delete(item) {
    
    this.appservice.get("Api/Transaction/delete_Production?Pro_No=" + item + "&User_Name=" + this.appservice.CREATED_BY).subscribe((res: any) => {
      this.appservice.get_Production_Details();
    });
  }
  export_excel(data)
  {
    this.appservice.Production_Export =  this.appservice.get_grid_fields_of('Production');

 
   this.appservice.Excel_Data.Header=this.appservice.Production_Export;
   this.appservice.Excel_Data.items=this.appservice.Production_Row
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Production_Export =  this.appservice.get_grid_fields_of('Production');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Net_Amt');
  this.appservice.Excel_Data.Header=this.appservice.Production_Export;
  this.appservice.Excel_Data.items=this.appservice.Production_Row
  this.appservice.export_pdf();
  }




  ngOnInit(): void {
    this.appservice.isEdit = false;
  }

}
