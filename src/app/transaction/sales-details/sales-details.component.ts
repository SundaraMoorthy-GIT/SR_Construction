import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit {

  
  isload: boolean = false;

  Print_Format_Data=[];

  constructor(public appservice: AppService, public confirmationService: ConfirmationService, public router: Router) {

    this.appservice.S_Bill_Type=this.appservice.DF_Bill_Type;
      this.appservice.get_Sale_Details();
      this.Print_Format_Data=appservice.get_Print_type('sales');
    
  }
PRI(data)
{
  var parm = "User=" + this.appservice.CREATED_BY + "&Company=" + this.appservice.Company + "&File_Name=" + data.Bill_No.replace(/[^a-zA-Z0-9 ]/g, "_") + "&File_Type=pdf&Bill_No=" + data.Bill_No;
      window.open(this.appservice.Server_URL + "report/Print_Sales_Bills_Tally_Foramt?" + parm, "_blank");

}


  load_page()
  {
    this.router.navigate([this.appservice.Sales_Entry_Page]);
  }
  e_way(data)
  {
    this.router.navigate(['/sales/e-way-bill']);
  }


  Print(Format,data) {
    this.appservice.Bill_Format=Format;
    this.appservice.open_pdf(data);

    }


    Close_Customer_Module()
    {
      $('#Customer_Module').modal('hide');
    }
  
    Open_Customer_Module(data)
    {
      this.appservice.Sales_Item_Rowdata=data.sal_bill_no;
  
      this.appservice.Saleswise_Details();
  
      $('#Customer_Module').modal('show');
    }
 
  open_pdf_two(data) {

    
    if(this.appservice.Bill_Format1=="Format1")
    {
      var parm="User=" + this.appservice.CREATED_BY + "&Company=" + this.appservice.Company + "&File_Name="+data.Bill_No.replace(/[^a-zA-Z0-9 ]/g, "_")+"&File_Type=pdf&Bill_No="+data.Bill_No;
      window.open(this.appservice.Server_URL+"report/Print_Sales_Bills_Tally_Foramt?"+parm,"_blank");
      
    }
    else  if(this.appservice.Bill_Format1=="Format2"){
      var parm="User=" + this.appservice.CREATED_BY + "&Company=" + this.appservice.Company + "&File_Name="+data.Bill_No.replace(/[^a-zA-Z0-9 ]/g, "_")+"&File_Type=pdf&Bill_No="+data.Bill_No;
    window.open(this.appservice.Server_URL+"PDF/Export_Invoice_1?"+parm, "_blank");

    }
    else  if(this.appservice.Bill_Format1=="Format3"){
      var parm="User=" + this.appservice.CREATED_BY + "&Company=" + this.appservice.Company + "&File_Name="+data.Bill_No.replace(/[^a-zA-Z0-9 ]/g, "_")+"&File_Type=pdf&Bill_No="+data.Bill_No;
    window.open(this.appservice.Server_URL+"PDF/Export_Invoice_2?"+parm, "_blank");

    }
    else  if(this.appservice.Bill_Format1=="Format4"){
     window.open(this.appservice.Server_URL+"report/Print_Sales_Bills?Bill_No="+data.Bill_No+"&Company="+this.appservice.Company, "_blank");

    }
    else  if(this.appservice.Bill_Format1=="Format5"){
      window.open(this.appservice.Server_URL+"report/Print_Sales_Bills1?Bill_No="+data.Bill_No+"&Company="+this.appservice.Company, "_blank");
     }
     else  if(this.appservice.Bill_Format1=="Format6"){
      window.open(this.appservice.Server_URL+"report/PRS_Bill2?Bill_No="+data.Bill_No+"&Company="+this.appservice.Company, "_blank");
 
     }
  }

P
  public Rows = [];

  veiw_data(data) {

  }
      einvoice(data)
      {
      this.appservice.einvoice_Data=data;
      return this.router.navigate(['/einvoice']);
      }
  datas: any = {};
  rows = [];
  edit_data(data) {


    this.appservice.header_Row=data;

   
    this.appservice.get("Api/Invoice/get_Sales_Entry_details?Bill_No=" + data.sal_bill_no).subscribe((res: any) => {
      this.appservice.Details_Row = JSON.parse(res).record;
      this.appservice.isEdit=true;
      this.router.navigate([this.appservice.Sales_Entry_Page]);
      
    });

  }
  row_No=-1;

  row_click(data)
  {

    var index = this.appservice.Sales_Row.findIndex(function (item, i) {
      return item.Bill_No === data.Bill_No
    });

    this.row_No = index;
  }
  

 


  delete_data(data) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(data.sal_no)
      }
    });
  }



  Delete(item) {
    
    this.appservice.get("Api/Invoice/delete_Sales?Bill_No=" + item + "&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
      this.appservice.get_Sale_Details();
    });
  }
  export_excel(data)
  {
    this.appservice.Sales_Export =  this.appservice.get_grid_fields_of('Sales');

 
   this.appservice.Excel_Data.Header=this.appservice.Sales_Export;
   this.appservice.Excel_Data.items=this.appservice.Sales_Row
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Sales_Export =  this.appservice.get_grid_fields_of('Sales');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Net_Amt');
  this.appservice.Excel_Data.Header=this.appservice.Sales_Export;
  this.appservice.Excel_Data.items=this.appservice.Sales_Row
  this.appservice.export_pdf();
  }




  ngOnInit(): void {
    this.appservice.isEdit = false;
  }

}
