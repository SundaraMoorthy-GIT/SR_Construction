import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
declare let $: any;
@Component({
  selector: 'app-material-issue-details',
  templateUrl: './material-issue-details.component.html',
  styleUrls: ['./material-issue-details.component.scss']
})
export class MaterialIssueDetailsComponent {
  public showSearch = false;
   public btndisable: boolean = false;
  
 
  isload: boolean = false;
  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    this.appservice.Purchase_Type="Delivery Challan";
    this.appservice.get_Delivery_Challan_Details()
    this.appservice.get_Item_Master();
    this.appservice.Delivery_Challan_GF = [...new Set(this.appservice.get_fields_of('Delivery_Challan').map(item => item.Field))];
    try
    {
    if (appservice.Sales_Row.length <= 0) {
      this.appservice.get_Delivery_Challan_Details();
    }
  }catch{
    this.appservice.get_Delivery_Challan_Details();
  }
    
  
  }


  get_ewaybill(data)
  {
   this.appservice.Eway_Bill_Data=data;
   return this.router.navigate(['/eway-bill']);
  }


  addReset() {
    this.appservice.isadd = "0";
    this.appservice.isEdit=false;
    this.router.navigate(['/transaction/material-issue-entry']);
  }

  edit_data(data) {
    this.appservice.isEdit=true;

    this.appservice.header_Row=data;
    this.appservice.from_customer_page == false;
    this.appservice.get("Api/EInvoice/get_Delivery_Challan_details?PO_No=" + data.dc_no).subscribe((res: any) => {
      this.appservice.Details_Row = JSON.parse(res).record;
      this.router.navigate(['/transaction/material-issue-entry']);
      
    });
  
  }
 
  delete_data(data) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(data.dc_no)
      }
    });
  }



  Delete(item) {
    
    this.appservice.get("Api/EInvoice/delete_Delivery_Challan?Po_No=" + item +"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
      this.appservice.get_Delivery_Challan_Details();
    });
  }
  
  Close_Customer_Module()
  {
    $('#Customer_Module').modal('hide');
  }

  Open_Customer_Module(data)
  {
    this.appservice.Purchase_Item_Rowdata=data.dc_no;

    this.appservice.Delivery_Challan_Details();

    $('#Customer_Module').modal('show');
  }
  export_excel(data)
  {
    this.appservice.Delivery_Challan_Export =  this.appservice.get_grid_fields_of('Delivery_Challan');

 
   this.appservice.Excel_Data.Header=this.appservice.Delivery_Challan_Export;
   this.appservice.Excel_Data.items=this.appservice.Delivery_Challan_Row
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Delivery_Challan_Export =  this.appservice.get_grid_fields_of('Delivery_Challan');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Net_Amt');
  this.appservice.Excel_Data.Header=this.appservice.Delivery_Challan_Export;
  this.appservice.Excel_Data.items=this.appservice.Delivery_Challan_Row
  this.appservice.export_pdf();
  }

 
 

  ngOnInit(): void {
    this.appservice.isEdit = false;
  }

}

