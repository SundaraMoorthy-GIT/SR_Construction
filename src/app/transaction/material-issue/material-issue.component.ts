import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
declare let $: any;
@Component({
  selector: 'app-material-issue',
  templateUrl: './material-issue.component.html',
  styleUrls: ['./material-issue.component.scss']
})
export class MaterialIssueComponent {
  public add: any = {};
  public btndisable:boolean=false;
  public Customer_Name="Select Customer Name";
  public addForm:any={};
  public rs = [];
   public btndisable1: boolean = false;

  public New_MRP="";
  public New_Item="";
  constructor(public confirmationService:ConfirmationService,public appservice: AppService, private toastr: ToastrService,private router: Router, private http: HttpClient) {
     if (this.appservice.Branch_ID != 0) {
      this.appservice.header_Row.dc_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    
    
    this.rs = this.appservice.get_fields_of('Delivery_Challan_Details');
    if (this.appservice.isadd_Page == true) {
      this.Calc_Sum();
      this.appservice.isadd_Page = false;
      this.appservice.header_Row.Freight_Amt = 0;
      this.appservice.header_Row.Freight_Per = 0;
      this.appservice.header_Row.PF_Per = 0;
      this.appservice.header_Row.PF_Amt = 0;
    }
    else if (this.appservice.isEdit) {


      this.appservice.header_Row.dc_date = appservice.datefromat(this.appservice.header_Row.dc_date);
      this.appservice.header_Row.dc_bill_date = appservice.datefromat(this.appservice.header_Row.dc_bill_date);
      this.appservice.header_Row.GST_Type="local";
      
    }
    else
    {
      
      this.appservice.header_Row = {};
      this.appservice.Details_Row = [];
      this.appservice.header_Row.GST_Type="local";
      this.clear();
      this.appservice.header_Row.dc_branch = this.appservice.Branch_ID;
      this.appservice.header_Row.dc_dis_address1 = this.appservice.CM_Address1;
      this.appservice.header_Row.dc_dis_address2 = this.appservice.CM_Address2;
      this.appservice.header_Row.dc_dis_city = this.appservice.CM_Address3;
      this.appservice.header_Row.dc_dis_pincode = this.appservice.CM_Address5;
      this.appservice.header_Row.dc_date = appservice.T_Date;
      this.appservice.header_Row.dc_contact_no = this.appservice.Selected_Customer.cus_contact_number;
      this.appservice.header_Row.dc_ledger_id = this.appservice.Selected_Customer.cus_id;
      this.appservice.header_Row.dc_ledger_name = this.appservice.Selected_Customer.cus_name;
      this.appservice.header_Row.dc_address1 = this.appservice.Selected_Customer.cus_address1;
      this.appservice.header_Row.dc_address2 = this.appservice.Selected_Customer.cus_address2;
      this.appservice.header_Row.dc_address3 = this.appservice.Selected_Customer.cus_address3;
      this.appservice.header_Row.dc_gstin = this.appservice.GST_No;
      this.appservice.header_Row.dc_city= this.appservice.Selected_Customer.cus_city;
      this.appservice.header_Row.dc_pincode= this.appservice.Selected_Customer.cus_pincode;
      this.appservice.header_Row.dc_scode= this.appservice.GST_Code;

      this.appservice.header_Row.GST_Type = this.appservice.Selected_Customer.cus_tax_type;
      this.appservice.header_Row.dc_type = "Delivery_Challan";
      this.get_Purchase_No();
      this.get_dc_No();
    }
   }

   clear() {

    this.appservice.get_fields_of('Delivery_Challan').forEach((activity) => {
      if (activity.Default_Value == "T_Date") {
        this.appservice.header_Row[activity.Field] = this.appservice.T_Date;
      }
      else {
        this.appservice.header_Row[activity.Field] = activity.Default_Value;
      }
    });
  }
   get_customers()
   {
    
    this.appservice.Cus_Type="GoDown";
    this.appservice.Ledger_Type = "10";
    return this.router.navigate(['/customer-search']);
   }
   get_dc_No() {
    if (this.appservice.isEdit == false) {
      this.appservice.getc("Api/EInvoice/get_DC_No").subscribe((res: any) => {
        this.appservice.header_Row.dc_no = res;

      });
    }
  }

  get_Purchase_No() {
    if (this.appservice.isEdit == false) {
      this.appservice.getc("Api/EInvoice/get_DC_Bill_No").subscribe((res: any) => {
        this.appservice.header_Row.dc_bill_no = res;

      });
    }
  }
   
  calc_details_Row(row) {
    var GST_Type = "local";
    try {
      GST_Type = this.appservice.header_Row.GST_Type;
    }
    catch {
      GST_Type = "local"
    }

    
    

    if (String(GST_Type).toLowerCase() == "intra") {

      this.appservice.Details_Row[row].dc_sgst_per = "0.00";
      this.appservice.Details_Row[row].dc_cgst_per = "0.00";
      this.appservice.Details_Row[row].dc_igst_per = this.appservice.Details_Row[row].dc_gst_per;

    }
    else {
      this.appservice.Details_Row[row].dc_sgst_per = (Number(this.appservice.Details_Row[row].dc_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].dc_cgst_per = (Number(this.appservice.Details_Row[row].dc_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].dc_igst_per = "0.00";
    }

    this.appservice.Details_Row[row].dc_disc_amt = (((Number(this.appservice.Details_Row[row].dc_rate) / 100) * Number(this.appservice.Details_Row[row].dc_disc_per)));


    this.appservice.Details_Row[row].dc_total_disc_amt = (Number(this.appservice.Details_Row[row].dc_disc_amt) * Number(this.appservice.Details_Row[row].dc_qty)).toFixed(2);


    // this.appservice.Details_Row[row].Final_Price = (Number(this.appservice.Details_Row[row].Unit_Price) - Number(this.appservice.Details_Row[row].Disc_Amt));

    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.appservice.header_Row.dc_tax_type;
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {
      this.appservice.Details_Row[row].dc_final_price = (
        (
          ((Number(this.appservice.Details_Row[row].dc_rate) - Number(this.appservice.Details_Row[row].dc_disc_amt))
            /
            (100 + Number(this.appservice.Details_Row[row].dc_gst_per))
          )
          * 100
        ));


    }




    this.appservice.Details_Row[row].dc_sub_total = (Number(this.appservice.Details_Row[row].dc_final_price) * Number(this.appservice.Details_Row[row].dc_qty)).toFixed(2);
    this.appservice.Details_Row[row].dc_gst_amt = ((Number(this.appservice.Details_Row[row].dc_sub_total) / 100) * Number(this.appservice.Details_Row[row].dc_gst_per)).toFixed(2);
    this.appservice.Details_Row[row].dc_igst_amt = ((Number(this.appservice.Details_Row[row].dc_sub_total) / 100) * Number(this.appservice.Details_Row[row].dc_igst_per)).toFixed(2);
    this.appservice.Details_Row[row].dc_cgst_amt = ((Number(this.appservice.Details_Row[row].dc_sub_total) / 100) * Number(this.appservice.Details_Row[row].dc_cgst_per)).toFixed(2);
    this.appservice.Details_Row[row].dc_sgst_amt = ((Number(this.appservice.Details_Row[row].dc_sub_total) / 100) * Number(this.appservice.Details_Row[row].dc_sgst_per)).toFixed(2);
    this.appservice.Details_Row[row].dc_taxable_amount = (Number(this.appservice.Details_Row[row].dc_sub_total)).toFixed(2);

   // this.appservice.Details_Row[row].TCS_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].TCS_Per)).toFixed(2);
   this.appservice.Details_Row[row].dc_tcs_amt="0";
    this.appservice.Details_Row[row].dc_net_amt = ((Number(this.appservice.Details_Row[row].dc_sub_total)+Number(this.appservice.Details_Row[row].dc_tcs_amt) + Number(this.appservice.Details_Row[row].dc_gst_amt))).toFixed(2);
    this.Calc_Sum();
  }

  update_disc()
  {
    for (var i = 0; i < this.appservice.Details_Row.length; i++) {
      this.appservice.Details_Row[i]["dc_disc_per"]=this.appservice.header_Row.dc_disc_per;
      this.calc_details_Row(i);
    }
  }
  

  Calc_Sum() {

    var len = 0;
    len = this.appservice.Details_Row.length;

    this.appservice.header_Row.dc_sub_total = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.dc_qty) * parseFloat(current.dc_rate)), 0)).toFixed(2);
    //this.appservice.header_Row.dc_disc_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_disc_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.dc_disc_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_disc_amt), 0)).toFixed(2);
    this.appservice.header_Row.dc_taxable_amount = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_sub_total), 0)).toFixed(2);

    this.appservice.header_Row.dc_gst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_gst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.dc_gst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_gst_amt), 0)).toFixed(2);

    this.appservice.header_Row.dc_igst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_igst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.dc_sgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_sgst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.dc_cgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_cgst_per), 0)) / len).toFixed(2);

    this.appservice.header_Row.dc_igst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_igst_amt), 0)).toFixed(2);
    this.appservice.header_Row.dc_sgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_sgst_amt), 0)).toFixed(2);
    this.appservice.header_Row.dc_cgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_cgst_amt), 0)).toFixed(2);

   if(Number(this.appservice.header_Row.dc_tcs_per)>0)
   {
    this.appservice.header_Row.dc_tcs_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_tcs_amt), 0)).toFixed(2);
    this.appservice.header_Row.dc_tcs_amt=(Number(this.appservice.header_Row.dc_tcs_amt)+Number(this.appservice.header_Row.dc_tcs_per));
    this.appservice.header_Row.dc_net_amt = Math.round((Number(   this.appservice.header_Row.dc_net_amt)+Number( this.appservice.header_Row.dc_tcs_amt))).toFixed(2);
   }
else
{
  this.appservice.header_Row.dc_tcs_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_tcs_amt), 0)).toFixed(2);
  this.appservice.header_Row.dc_net_amt = Math.round((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.dc_net_amt), 0))).toFixed(2);

}
  

// this.appservice.header_Row.dc_net_amt=this.appservice.header_Row.dc_net_amt-this.appservice.header_Row.Adjustment;

  }


  x:string="";

  out()
{


  try{

    this.x=""+  this.x.length;
    this.x=this.appservice.Sales_Temp_Row.dc_prod_name;
  }catch{   this.x="";}


 
 if( this.x=="1" || this.x=="0" ||   this.x=="" ||   this.x=="undefined" || this.x==null)
  {  
    $(".code1").focus();
    return;
  }
  else
  {
    if(this.check_duplicate(this.appservice.Sales_Temp_Row)==true && this.appservice.Stockbase_Sales == true )
    {
      this.temp_data={};
      this.appservice.Sales_Temp_Row.dc_prod_name="";
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
     // console.log(  this.appservice.Sales_Temp_Row);
      return;
    }

  }

  
   var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.dc_qty;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_qty").focus();
    return;
  }


  var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.dc_rate;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_rate").focus();
    return;
  }

 

  var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.dc_wholesale_rate;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_wsrate").focus();
    return;
  }

  var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.dc_sale_rate;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_srate").focus();
    return;
  }

}



check_duplicate(data) :boolean
{
  
  var index = this.appservice.Details_Row.findIndex(function (item, i) {
    return item.dc_prod_id === data.dc_prod_id
  });
  if(index>=0)
  {
    this.temp_data={}
    data={};
    this.appservice.Sales_Temp_Row.dc_prod_name="";
    this.appservice.Sales_Temp_Row = {};
    this.toastr.error("Same item already added", "Error", { timeOut: 3000 });
    return true;
  }
  return false;
}

  
  place_holder = "Type Item Name here..";

  calc_tempdata() {
    
    // if((Number(this.MRP_)!=Number(this.appservice.Sales_Temp_Row.dc_mrp)) && this.MRP_.length==(this.appservice.Sales_Temp_Row.MRP).length)
    // {
    
      
    //   this.confirmationService.confirm({
    //     message: 'This MRP Not Available , Create New Press Yes?',
    //     accept: () => {
    //       this.new_load=true;
    //       this.New_MRP=this.appservice.Sales_Temp_Row.MRP;
    //       this.New_Item=this.appservice.Sales_Temp_Row.Item_Name;
          
    //       this.appservice.get("Api/Invoice/Create_MRP_Item?Item_ID="+ this.appservice.Sales_Temp_Row.Item_ID+"&MRP="+this.appservice.Sales_Temp_Row.MRP+"&Item_name="+this.appservice.item).subscribe((res: any) => { 
    //       this.get_Item_Master();
        
    //       });
    //     }
    //   });
    // }
    
    
          var GST_Type = "local";
          try {
            GST_Type = this.appservice.header_Row.GST_Type;
          }
          catch {
            GST_Type = "local"
          }
    
    
          if (String(GST_Type).toLowerCase() == "intra") {
    
            this.appservice.Sales_Temp_Row.dc_sgst_per = "0.00";
            this.appservice.Sales_Temp_Row.dc_cgst_per = "0.00";
            this.appservice.Sales_Temp_Row.dc_igst_per = this.appservice.Sales_Temp_Row.dc_gst_per;
    
          }
          else {
            this.appservice.Sales_Temp_Row.dc_sgst_per = (Number(this.appservice.Sales_Temp_Row.dc_gst_per) / 2).toFixed(2);
            this.appservice.Sales_Temp_Row.dc_cgst_per = (Number(this.appservice.Sales_Temp_Row.dc_gst_per) / 2).toFixed(2);
            this.appservice.Sales_Temp_Row.dc_igst_per = "0.00";
    
          }
        
          
        //this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));
    
        var Disc_Type = "percentage";
        try {
          Disc_Type = this.appservice.header_Row.Disc_Type;
        }
        catch {
          Disc_Type = "percentage"
        }
    
        // if (String(Disc_Type).toLowerCase() == "amount") {
    
        //   this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);
        // }
        // else {
           this.appservice.Sales_Temp_Row.dc_disc_amt = (((Number(this.appservice.Sales_Temp_Row.dc_rate) / 100) * Number(this.appservice.Sales_Temp_Row.dc_disc_per)));
        // }
    
    
         this.appservice.Sales_Temp_Row.dc_total_disc_amt = (Number(this.appservice.Sales_Temp_Row.dc_disc_amt) * Number(this.appservice.Sales_Temp_Row.dc_qty)).toFixed(2);
    
        // this.appservice.Sales_Temp_Row.Final_Price = (Number(this.appservice.Sales_Temp_Row.Unit_Price) - Number(this.appservice.Sales_Temp_Row.Disc_Amt));
    
        var Tax_Type = "exclusive";
        try {
          Tax_Type = this.appservice.header_Row.dc_tax_type;
        }
        catch {
          Tax_Type = "exclusive"
        }
    
    
        if (String(Tax_Type).toLowerCase() == "inclusive") {
    
          this.appservice.Sales_Temp_Row.dc_final_price = (
            (
              ((Number(this.appservice.Sales_Temp_Row.dc_rate) - Number(this.appservice.Sales_Temp_Row.dc_disc_amt))
                /
                (100 + Number(this.appservice.Sales_Temp_Row.dc_gst_per))
              )
              * 100
            ));
    
    
        }
        
    
        
      
        
    // if(Number(this.appservice.Sales_Temp_Row.Sale_Rate)>0)
    // {
    //     this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.appservice.Sales_Temp_Row.MRP)*Number(this.appservice.Sales_Temp_Row.Box_Qty))/Number(this.appservice.Sales_Temp_Row.Sale_Rate))*100)-100).toFixed(2);
    // }
    // else{
    //   this.appservice.Sales_Temp_Row.MRP_Disc_Per=0;
    // }
    
    
        
    
    
        this.appservice.Sales_Temp_Row.dc_sub_total = (Number(this.appservice.Sales_Temp_Row.dc_final_price) * Number(this.appservice.Sales_Temp_Row.dc_qty)).toFixed(2);
        this.appservice.Sales_Temp_Row.dc_gst_amt = ((Number(this.appservice.Sales_Temp_Row.dc_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.dc_gst_per)).toFixed(2);
        this.appservice.Sales_Temp_Row.dc_igst_amt = ((Number(this.appservice.Sales_Temp_Row.dc_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.dc_igst_per)).toFixed(2);
        this.appservice.Sales_Temp_Row.dc_cgst_amt = ((Number(this.appservice.Sales_Temp_Row.dc_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.dc_cgst_per)).toFixed(2);
        this.appservice.Sales_Temp_Row.dc_sgst_amt = ((Number(this.appservice.Sales_Temp_Row.dc_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.dc_sgst_per)).toFixed(2);
        this.appservice.Sales_Temp_Row.dc_taxable_amount = (Number(this.appservice.Sales_Temp_Row.dc_sub_total) ).toFixed(2);
       // this.appservice.Sales_Temp_Row.TCS_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.TCS_Per)).toFixed(2);
       this.appservice.Sales_Temp_Row.dc_tcs_amt="0";
        this.appservice.Sales_Temp_Row.dc_net_amt = ((Number(this.appservice.Sales_Temp_Row.dc_sub_total)+Number( this.appservice.Sales_Temp_Row.dc_tcs_amt) + Number(this.appservice.Sales_Temp_Row.dc_gst_amt))).toFixed(2);
      }


      

  d: any = {}
  temp_data: any = {};
  MRP_="";
   get_by_Code(data, type) {

    if (type == "Code") {

      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.Part_No == data)[0];
      $(".code1").focus();

    } else {
      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.ID == data)[0];
    }

    this.appservice.Sales_Temp_Row.dc_prod_id = this.temp_data.ID;


    // this.appservice.get("Api/Master/get_L_P_Rate?Item_ID="+this.temp_data.ID).subscribe((res: any) => {
    //   this.appservice.Sales_Temp_Row.Last_Rate = res;
    // });

    this.appservice.Sales_Temp_Row.dc_prod_code = this.temp_data.Item_Code;
    this.appservice.Sales_Temp_Row.dc_prod_name = this.temp_data.Item_Name;
    this.appservice.Sales_Temp_Row.dc_uom = this.temp_data.UOM;
    this.appservice.Sales_Temp_Row.dc_hsn_code = this.temp_data.HSN_Code;
    this.appservice.Sales_Temp_Row.dc_mrp = this.temp_data.MRP;
    

    this.MRP_= this.temp_data.MRP;

    this.appservice.Sales_Temp_Row.Sales_Qty = "0";

    

    
    
    var Bill_Type = "Tax Invoice";
    try {
      Bill_Type = this.appservice.header_Row.dc_bill_type;
    }
    catch {
      Bill_Type = "Tax Invoice"
    }

    if (String(Bill_Type).toLowerCase() != "tax invoice") {
      
      this.appservice.Sales_Temp_Row.dc_gst_per = "0";  
    }
    else
    {
  
    this.appservice.Sales_Temp_Row.dc_gst_per = this.temp_data.GST_Per;
    }

    this.appservice.Sales_Temp_Row.dc_rate = this.temp_data.Purchase_Rate;

    this.appservice.Sales_Temp_Row.dc_qty = "";

    this.appservice.Sales_Temp_Row.dc_disc_per = "0";
    this.appservice.Sales_Temp_Row.dc_disc_amt = "0";
    this.appservice.Sales_Temp_Row.dc_free = "0";
    this.appservice.Sales_Temp_Row.dc_tcs_per = "0.00";
    this.appservice.Sales_Temp_Row.dc_tcs_amt = "0.00";
    // var Stock_Row=[];
    // this.appservice.get("Api/Invoice/get_Stock_by_Item_ID?Item_ID="+ this.temp_data.ID).subscribe((res: any) => { 
    //   Stock_Row = JSON.parse(res).record;
      
    //   try{
    //   var stock=0;
    //   stock = (Stock_Row.reduce((sum, current) => sum + parseFloat(current.Qty), 0)).toFixed(2);
    //   this.appservice.Sales_Temp_Row.Stock=stock;
    //   }catch{

    //   this.appservice.Sales_Temp_Row.Stock=0;
    //   }

      
    // }); 

    this.appservice.Sales_Temp_Row.dc_stock=0;

    this.appservice.Sales_Temp_Row.dc_wholesale_rate =  this.temp_data.Rate;
    this.appservice.Sales_Temp_Row.dc_sale_rate = this.temp_data.Rate;
    this.calc_tempdata();

  }

new_load:boolean=false;
  
  get_Item_Master() {

    this.appservice.Item_Master_Rows = [];
    this.appservice.get("Api/Master/get_Item_Master?Order_by=" + this.appservice.Item_Orderby_Name).subscribe((res: any) => {
      this.appservice.Item_Master_Rows = JSON.parse(res).record;

      this.appservice.Perment_Item_Master_Row = JSON.parse(res).record;
      this.appservice.Reset_Item_Master_Row = JSON.parse(res).record;
      
      this.appservice.Item_Master_RM_Rows=this.appservice.Perment_Item_Master_Row.filter(e=>e.Item_Group=="2");
   
      var x=this.appservice.Item_Master_Rows.filter(e=>e.Item_Name==this.New_Item).filter(e=>e.MRP==this.New_MRP)[0]["ID"];
      
     
      this.appservice.Sales_Temp_Row = {};
      this.get_by_Code(x, "Name");
      this.new_load=false;
      $(".code1").focus();
      try {
        this.appservice.Item_Row_Cout = this.appservice.Item_Master_Rows.length;

      } catch { }

    });
   }

   add_data(data) {
    if ((Number(data.dc_qty)+Number(data.dc_free)) > 0) {
      this.appservice.Details_Row.push(data);
      localStorage.setItem('dc_Details', JSON.stringify(this.appservice.Details_Row));

      this.Calc_Sum();
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
    }
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
    var index = item;


    if (index > -1) {
      this.appservice.Details_Row.splice(index, 1);
    }
    this.appservice.Details_Row = this.appservice.Details_Row;
    this.Calc_Sum();
  }

  next() {
    
    this.appservice.isload = false;
    var name = "";
    try {
      name = this.appservice.header_Row.dc_ledger_name.toLowerCase();

    }
    catch { }

    if (name == "") {
      this.toastr.error("Please Select Customer", "Error", { timeOut: 3000 });
      return;

    }
    else {
      this.appservice.load_page1('/add-item');
    }

  }
  
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  isload: boolean = false;
   Valid:boolean=true;
   Place_Order() {
    
    this.appservice.header_Row.Company = this.appservice.Company;
    this.appservice.header_Row.Created_by = this.appservice.CREATED_BY;
    this.appservice.header_Row.ColumnPerfix = "dc_";
    this.appservice.header_Row.dc_type = "Delivery_Challan";
    this.appservice.header_Row.items = this.appservice.Details_Row;

    this.appservice.header_Row.Item_Rate_Update=this.appservice.Item_Rate_Update;
    
    
    this.Valid = true;
    this.appservice.get_fields_of('Delivery_Challan').forEach((data) => {
      this.addForm.submitted = true;
      if (data.Validate == "True" && this.appservice.header_Row[data.Field] == "") {
        this.Valid = false;
      }

    });

    this.add.items = this.appservice.cart_item;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


    if (this.Valid) {
      this.btndisable = true;
      this.http.post(this.appservice.Server_URL + 'api/EInvoice/Post_Delivery_Challan', this.appservice.header_Row, { headers: this.headers })
        .subscribe(
          (val: string) => {
            this.btndisable = false;
            if (val == "True") {
              this.toastr.success("Submtted Successfully", 'Msg');
              this.appservice.open_purchase_pdf(this.appservice.header_Row);
              this.appservice.isEdit = false;
              this.appservice.from_customer_page = false;
              this.appservice.get_Delivery_Challan_Details();
              this.appservice.header_Row = {};
              this.appservice.Details_Row = [];
              this.appservice.Sales_Temp_Row = {};

              localStorage.setItem('Delivery_Challan_details',"[]");
              this.appservice.get_Item_Master();
              this.appservice.back();


            }
            else {
              this.toastr.error(val, "Error", { timeOut: 3000 });
              this.btndisable = false;
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
