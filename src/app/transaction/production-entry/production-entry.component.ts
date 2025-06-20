import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-production-entry',
  templateUrl: './production-entry.component.html',
  styleUrls: ['./production-entry.component.scss']
})
export class ProductionEntryComponent implements OnInit {

  
  public add: any = {};
  public btndisable:boolean=false;
  public Customer_Name="Select Customer Name";
  public addForm:any={};
  public rs = [];
  public Godown_Rows=[];
   public btndisable1: boolean = false;
  constructor(public confirmationService:ConfirmationService,public appservice: AppService, private toastr: ToastrService,private router: Router, private http: HttpClient) {
    if (this.appservice.Branch_ID != 0) {
      this.appservice.header_Row.pur_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    
    
    this.Godown_Rows = this.appservice.get_Ledger_group("10");
    this.rs =this.appservice.get_fields_of('Production_Details');
    if(this.appservice.isEdit)
    {
      this.appservice.header_Row.pur_bill_date=appservice.datefromat(this.appservice.header_Row.Pro_Date);
      this.appservice.header_Row.pur_purchase_date=appservice.datefromat(this.appservice.header_Row.Pro_Date);
      
    }
    else
    {
      this.appservice.header_Row={};
      this.appservice.Details_Row=[];
      this.clear();
      this.appservice.header_Row.ID="0";
      this.appservice.header_Row.pur_branch = this.appservice.Branch_ID;
      this.get_Pro_No();
      
      this.appservice.header_Row.pur_contact_no = this.appservice.Selected_Customer.cus_contactno;
      this.appservice.header_Row.pur_ledger_id = this.appservice.Selected_Customer.cus_id;
      this.appservice.header_Row.pur_ledger_name = this.appservice.Selected_Customer.cus_name;
      this.appservice.header_Row.pur_gst_no = this.appservice.Selected_Customer.cus_gstin;
      this.appservice.header_Row.pur_ledger_address1 = this.appservice.Selected_Customer.cus_address1;
      this.appservice.header_Row.pur_ledger_address2 = this.appservice.Selected_Customer.cus_address2;
      this.appservice.header_Row.pur_ledgerpin = this.appservice.Selected_Customer.cus_pincode;
      this.appservice.header_Row.pur_ledgerloc = this.appservice.Selected_Customer.cus_city;
      this.appservice.header_Row.pur_ledgerstcd="33";
      this.appservice.Selected_Customer={};
    }


   }


   onChange(data)
   {
     this.appservice.header_Row.pur_godown=this.Godown_Rows.filter(e => e.value == data)[0].label; 
   }

   clear()
   {
     
    this.appservice.get_fields_of('Production').forEach((activity) => {
      if(activity.Default_Value=="T_Date")
      {
        this.appservice.header_Row[activity.Field]=this.appservice.T_Date;
      }
      else{
      this.appservice.header_Row[activity.Field]=activity.Default_Value;
      }
    });
   }

   get_customers() {
    this.appservice.vType="Employee";
    return this.router.navigate(['/customer-search']);

  }

  del_row(item) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete press Yes?',
        accept: () => {
          this.Delete(item) 
        }
    });
  }
  
  Delete(item) {
   
    var index =item;

    
    if (index > -1) {
      this.appservice.Details_Row.splice(index, 1);
    }
    this.appservice.Details_Row=this.appservice.Details_Row;
    this.Calc_Sum();
  }


  d: any = {}
  temp_data: any = {};

  get_by_Code(data, type) {
    
    if (type == "Code") {

      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.Part_No == data)[0];
      $(".code1").focus();

    } else {
      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.ID == data)[0];
    }

    this.appservice.Sales_Temp_Row.pur_prodid = this.temp_data.ID;
    this.appservice.Sales_Temp_Row.pur_prodcode = this.temp_data.Item_Code;
    this.appservice.Sales_Temp_Row.pur_prodName = this.temp_data.Item_Name;
    this.appservice.Sales_Temp_Row.pur_description = this.temp_data.Description;
    this.appservice.Sales_Temp_Row.pur_uom = this.temp_data.UOM;
    this.appservice.Sales_Temp_Row.pur_hsn_code = this.temp_data.HSN_Code;
    this.appservice.Sales_Temp_Row.pur_mrp = this.temp_data.MRP;
    this.appservice.Sales_Temp_Row.pur_gst_per = this.temp_data.GST_Per;

    this.appservice.Sales_Temp_Row.pur_rate = this.temp_data.Rate;
    this.appservice.Sales_Temp_Row.pur_bag_qty = this.temp_data.Bag_Qty;
    this.appservice.Sales_Temp_Row.pur_qty = "";

    this.appservice.Sales_Temp_Row.pur_disc_per = "0";
    this.appservice.Sales_Temp_Row.pur_disc_amt = "0";

   

    this.calc_tempdata();

  }

  place_holder = "Item Name";
  calc_tempdata() {

    if (String(this.appservice.GST_Type).toLowerCase() == "intra") {

      this.appservice.Sales_Temp_Row.pur_sgst_per = "0.00";
      this.appservice.Sales_Temp_Row.pur_cgst_per = "0.00";
      this.appservice.Sales_Temp_Row.pur_igst_per = this.appservice.Sales_Temp_Row.pur_gst_per;

    }
    else {
      this.appservice.Sales_Temp_Row.pur_sgst_per = (Number(this.appservice.Sales_Temp_Row.pur_gst_per) / 2).toFixed(2);
      this.appservice.Sales_Temp_Row.pur_cgst_per = (Number(this.appservice.Sales_Temp_Row.pur_gst_per) / 2).toFixed(2);
      this.appservice.Sales_Temp_Row.pur_igst_per = "0.00";

    }
    

    //this.appservice.Sales_Temp_Row.Qty=(Number(this.appservice.Sales_Temp_Row.Pcs)*Number(this.appservice.Sales_Temp_Row.Bag_Qty));
    this.appservice.Sales_Temp_Row.pur_final_price =(Number(this.appservice.Sales_Temp_Row.pur_rate)-Number(this.appservice.Sales_Temp_Row.pur_disc_amt)).toFixed(2);
    
    if (String(this.appservice.Tax_Type).toLowerCase() == "inclusive") {
    
      this.appservice.Sales_Temp_Row.pur_final_price =(
      (
       ( (Number(this.appservice.Sales_Temp_Row.pur_rate)-Number(this.appservice.Sales_Temp_Row.pur_disc_amt))
      /
      (100+Number(this.appservice.Sales_Temp_Row.pur_gst_per))
       )
      *100
      )).toFixed(2);
    
    
    }
    this.appservice.Sales_Temp_Row.pur_sub_total = (Number(this.appservice.Sales_Temp_Row.pur_final_price) * Number(this.appservice.Sales_Temp_Row.pur_qty)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_gst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_gst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_igst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_igst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_cgst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_cgst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_sgst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_sgst_per)).toFixed(2);
   // this.appservice.Sales_Temp_Row.TCS_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.TCS_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_net_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) + Number(this.appservice.Sales_Temp_Row.pur_gst_amt))).toFixed(2);
  }



  calc_details_Row(row) {



    if (String(this.appservice.GST_Type).toLowerCase() == "intra") {

      this.appservice.Details_Row[row].pur_sgst_per = "0.00";
      this.appservice.Details_Row[row].pur_cgst_per = "0.00";
      this.appservice.Details_Row[row].pur_igst_per = this.appservice.Details_Row[row].pur_gst_per;

    }
    else {
      this.appservice.Details_Row[row].pur_sgst_per = (Number(this.appservice.Details_Row[row].pur_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].pur_cgst_per = (Number(this.appservice.Details_Row[row].pur_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].pur_igst_per = "0.00";
    }
    

    //this.appservice.Details_Row[row].Qty=(Number(this.appservice.Details_Row[row].Pcs)*Number(this.appservice.Details_Row[row].Bag_Qty));
    this.appservice.Details_Row[row].pur_final_price = (Number(this.appservice.Details_Row[row].pur_rate) - Number(this.appservice.Details_Row[row].pur_disc_amt));
    
    if (String(this.appservice.Tax_Type).toLowerCase() == "inclusive") {
    
      this.appservice.Details_Row[row].pur_final_price =(
      (
       ( (Number(this.appservice.Details_Row[row].pur_rate)-Number(this.appservice.Details_Row[row].pur_disc_amt))
      /
      (100+Number(this.appservice.Details_Row[row].pur_gst_per))
       )
      *100
      )).toFixed(2);
    
    
    }

    this.appservice.Details_Row[row].pur_sub_total = (Number(this.appservice.Details_Row[row].pur_final_price) * Number(this.appservice.Details_Row[row].pur_qty)).toFixed(2);
    this.appservice.Details_Row[row].pur_gst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_gst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_igst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_igst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_cgst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_cgst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_sgst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_sgst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_net_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) + Number(this.appservice.Details_Row[row].pur_gst_amt))).toFixed(2);
     this.Calc_Sum();
  }
  
  get_Pro_No() { 
    if(this.appservice.isEdit==false)
    {
    this.appservice.getc("Api/Transaction/get_Pro_No").subscribe((res: any) => { 
      this.appservice.header_Row.pur_purchase_no=res;
        
    }); 
  }
    }


  get_Address(data) {
    try{

      this.appservice.header_Row.Ledger_ID=data;
      this.appservice.header_Row.Customer_Address1=this.appservice.Ledger_Master_Rows.filter(e=>e.ID==data)[0].Address1;
      this.appservice.header_Row.GST_No=this.appservice.Ledger_Master_Rows.filter(e=>e.ID==data)[0].GSTIN;
      this.appservice.header_Row.Contact_No=this.appservice.Ledger_Master_Rows.filter(e=>e.ID==data)[0].Phone_Number
    }
    catch{}

  }


  add_data(data) {

    if(Number(data.pur_qty)>0)
    {
    this.appservice.Details_Row.push(data);
    this.Calc_Sum();
    this.appservice.Sales_Temp_Row ={};
    $(".code1").focus();
    }

  }

  
x:string="";

out()
{
try{

  this.x=""+  this.x.length;
  this.x=this.appservice.Sales_Temp_Row.pur_prodname;
}catch{   this.x="";}



if( this.x=="1" || this.x=="0" ||   this.x=="" ||   this.x=="undefined" || this.x==null)
{  
  $(".code1").focus();
  return;
}


 var  i : Number=0;
try{
  i=this.appservice.Sales_Temp_Row.pur_qty;
}
catch{i=0;}

if(i==0)
{
  $(".c_qty").focus();
  return;
}


var  i : Number=0;
try{
  i=this.appservice.Sales_Temp_Row.pur_rate;
}
catch{i=0;}

if(i==0)
{
  $(".c_rate").focus();
  return;
}

}


  Calc_Sum()
  {
 
    var len=0;
    len=this.appservice.Details_Row.length;

    this.appservice.header_Row.pur_sub_total = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.pur_qty) * parseFloat(current.pur_rate)), 0)).toFixed(2);
    this.appservice.header_Row.pur_disc_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_disc_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_disc_amt = "0";//(this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_total_disc_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_taxable_amount = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sub_total), 0)).toFixed(2);

    this.appservice.header_Row.pur_tax_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_gst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_tax_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_gst_amt), 0)).toFixed(2);

    this.appservice.header_Row.pur_igst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_igst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_sgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sgst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_cgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_cgst_per), 0)) / len).toFixed(2);

    this.appservice.header_Row.pur_igst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_igst_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_sgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sgst_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_cgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_cgst_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_net_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_net_amt), 0));
    this.appservice.header_Row.pur_tcs_amt ="0";
    this.appservice.header_Row.pur_adjustment="0";
    this.appservice.header_Row.pur_net_amt=((Number(this.appservice.header_Row.pur_net_amt) + Number(this.appservice.header_Row.pur_tcs_amt))-this.appservice.header_Row.pur_adjustment).toFixed(2);

  }



  public addValidation: boolean = false;
   headers;
   data;
   isadd = "0";
   isload:boolean=false;


   

   Valid:boolean=true;
   Place_Order() {

    this.appservice.header_Row.Company=this.appservice.Company;
    this.appservice.header_Row.Created_by=this.appservice.CREATED_BY;
    this.appservice.header_Row.items=this.appservice.Details_Row;
    this.appservice.header_Row.ID=this.appservice.header_Row.pur_id;
    this.appservice.header_Row.pur_purchase_type ="Purchase";
    this.appservice.header_Row.pur_type ="Production";
    this.appservice.header_Row.ColumnPerfix="pur_";
    this.appservice.header_Row.pur_pay_mode="CREDIT";
    this.appservice.header_Row.pur_bill_type="CREDIT";
    
    this.Valid=true; 
    this.appservice.get_fields_of('Production').forEach((data) => {
      this.addForm.submitted=true;
      if(data.Validate=="True" && this.appservice.header_Row[data.Field]=="")
      {
      this.Valid=false;
      }
      
    });
    
        this.add.items=this.appservice.cart_item;
         this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        
          
          if(this.Valid)
          {
            this.btndisable=true;
          this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Production', this.appservice.header_Row, { headers: this.headers })
            .subscribe(
              (val: string) => {
                this.btndisable=false;
                if (val == "True") {
                  this.toastr.success("Submtted Successfully", 'Msg');
                  this.appservice.isEdit=false;
                  this.appservice.get_Production_Details();
                  this.appservice.header_Row={};
                  this.appservice.Details_Row=[];
                  this.appservice.back();
                  
                }
                else {
                  this.toastr.error(val, "Error", { timeOut: 3000 });
                }
              },
              response => {
                this.toastr.error('Error ', response, {
                  timeOut: 3000
                });
              });
            }
      }

  ngOnInit(): void {
  }

}
