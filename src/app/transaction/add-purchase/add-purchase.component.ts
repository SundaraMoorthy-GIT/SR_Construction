import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {


  public select_mode="GoDown";
  
  add: any = {};
  public btndisable: boolean = false;
  public addForm: any = {};
  
  Item_rows=[];
  public Selected_Item: any = {};

  selectedItem: string;


  public TStatus=true;
  rowdata=0;
  Status="1";
  public New_MRP="";
  public New_Item="";
  public rs = [];
  TRM_To_Rows1=[];
  public Godown_Rows=[];
  public btndisable1: boolean = false;
  constructor(public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService,private router: Router, private http: HttpClient) {
    if (this.appservice.Branch_ID != 0) {
      this.appservice.header_Row.pur_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    this.rs = this.appservice.get_fields_of('Purchase_details');
    
      try{
    this.Godown_Rows = this.appservice.get_Ledger_group("10");
    this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    this.TRM_To_Rows1=this.appservice.To_Area_Rows;
      }
      catch{}
    //this.appservice.header_Row.Go_Down="57";
    if (this.appservice.isEdit) {
      this.appservice.header_Row = appservice.Edit_Row;
      this.Status="0";
      try {
        this.appservice.header_Row.pur_purchase_date = appservice.datefromat(this.appservice.Edit_Row.pur_purchase_date);
        this.appservice.header_Row.pur_bill_date = appservice.datefromat(this.appservice.Edit_Row.pur_bill_date);
        this.appservice.header_Row.pur_grn_date = appservice.datefromat(this.appservice.Edit_Row.pur_grn_date);
      } catch{ }
    }
    else {
      this.appservice.header_Row = {};
      this.appservice.Details_Row = [];
      this.clear();
      this.appservice.header_Row.pur_branch = this.appservice.Branch_ID;
      this.get_Purchase_No();
      this.appservice.header_Row.pur_id = "0";
      this.appservice.header_Row.pur_adjustment="0";
      this.appservice.header_Row.pur_tcs_amt="0";
      this.appservice.header_Row.pur_go_down="0";
      this.appservice.header_Row.pur_purchase_date =this.appservice.T_Date;
      this.appservice.header_Row.pur_bill_date = this.appservice.T_Date;
      this.appservice.header_Row.pur_grn_date =this.appservice.T_Date;
      this.appservice.header_Row.pur_bill_type="Tax Invoice";
      this.appservice.header_Row.pur_tax_type="Exclusive";
      this.appservice.header_Row.pur_bill_mode="Credit";
      this.add.pur_bill_date = appservice.Pur_Date;
    }
    if (this.appservice.from_customer_page == true) {
      this.appservice.header_Row.pur_contact_no = this.appservice.Selected_Customer.cus_contactno;
      this.appservice.header_Row.pur_ledger_id = this.appservice.Selected_Customer.cus_id;
      this.appservice.header_Row.pur_ledger_name = this.appservice.Selected_Customer.cus_name;
      this.appservice.header_Row.pur_gst_no = this.appservice.Selected_Customer.cus_gstin;
      this.appservice.header_Row.pur_ledger_address1 = this.appservice.Selected_Customer.cus_address1;
      this.appservice.header_Row.pur_ledger_address2 = this.appservice.Selected_Customer.cus_address2;
      this.appservice.header_Row.pur_ledger_address3 = this.appservice.Selected_Customer.cus_address3;
      this.appservice.header_Row.pur_ledgerpin = this.appservice.Selected_Customer.cus_pincode;
      this.appservice.header_Row.pur_ledgerloc = this.appservice.Selected_Customer.cus_city;
      this.appservice.header_Row.pur_ledgerstcd=this.appservice.Selected_Customer.cus_scode;
      if(this.appservice.Selected_Customer.cus_scode==this.appservice.GST_Code)
      {
        this.appservice.header_Row.pur_gst_type="local";
      }
      else
      {
        this.appservice.header_Row.pur_gst_type="intra";
      }
      try{
      this.TRM_To_Rows1=this.appservice.To_Area_Rows.filter(e => e.from1 == this.appservice.header_Row.pur_ledger_name);
      }
      catch{}
    }
    

  }

  public refRow:any ={};
  onChange1(data)
  {
    this.refRow=this.appservice.Transport_Rows.filter(e => e.value == data)[0];
    this.appservice.header_Row.pur_transport=this.refRow.label;
    this.appservice.header_Row.pur_tpttype=this.refRow.Veh_Make;
  }

  public refRow1:any ={};
  onChange(data)
  {
    this.refRow1=this.appservice.SProject_Rows.filter(e => e.value == data)[0];
    this.appservice.header_Row.pur_project=this.refRow1.label;
  }

  public ToRow:any ={};
  onChange3(data)
  {
    this.ToRow=this.TRM_To_Rows1.filter(e => e.value == data)[0];
    this.appservice.header_Row.pur_to=this.ToRow.label;
  }

  get_Purchase_No() {
    this.appservice.get("Api/Transaction/get_Purchase_No?Type=Purchase").subscribe((res: any) => {
      this.appservice.header_Row.pur_purchase_no = res;
    });
  }

  get_customers() {
     this.appservice.vType="Supplier";
     this.appservice.Cus_Type="Supplier";
     return this.router.navigate(['/customer-search']);
  

  }

  clear() {

    this.appservice.get_fields_of('Purchase').forEach((activity) => {
      if (activity.Default_Value == "T_Date") {
        this.appservice.header_Row[activity.Field] = this.appservice.T_Date;
      }
      else {
        this.appservice.header_Row[activity.Field] = activity.Default_Value;
      }
    });
  }
  Uni_Code_ID;

  Uni_Code_Purchase=[];
  Uni_Code_Sales=[];
  Customer_Balance=[];
  public Bill_Amt=0;
  public Due_Amt=0;
  Open_Customer_Module1(data)
  {
 
      this.Uni_Code_ID=data.Item_ID;
      this.appservice.get("Api/Invoice/get_Purchase_Details?ID="+this.Uni_Code_ID).subscribe(( res: any) => {
      this.Uni_Code_Purchase = JSON.parse(res).record;
      this.Bill_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Bill_Amount), 0)).toFixed(2);
      this.Due_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);
  
   
      });
      this.appservice.get("Api/Invoice/get_Uni_Code_Sales?ID="+this.appservice.header_Row.Ledger_ID+"&Item_Name="+data.Item_Name).subscribe(( res: any) => {
      this.Uni_Code_Sales = JSON.parse(res).record;
      this.Bill_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Bill_Amount), 0)).toFixed(2);
      this.Due_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);
  
   
      });
    

    $('#Customer_Module1').modal('show');
  }
  Close_Customer_Module1()
  {
    $('#Customer_Module1').modal('hide');
  }
  s_qty:Number=0;
  del_row(item) {

    try{
      this.s_qty=Number(this.appservice.Details_Row[item]["Sales_Qty"]);
    }catch{
      this.s_qty=0
    }


    // if( this.appservice.isEdit==true && this.s_qty>0)
    // {

    // }else

  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(item)
      }
    });
  }

  }

  Delete(item) {

    var index = item;


    if (index > -1) {
      this.appservice.Details_Row.splice(index, 1);
    }
    this.appservice.Details_Row = this.appservice.Details_Row;
    this.Calc_Sum();
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

    this.appservice.Sales_Temp_Row.pur_prodid = this.temp_data.ID;


    this.appservice.get("Api/Master/get_L_P_Rate?Item_ID="+this.temp_data.ID).subscribe((res: any) => {
      this.appservice.Sales_Temp_Row.Last_Rate = res;
    });

    this.appservice.Sales_Temp_Row.pur_prodcode = this.temp_data.Item_Code;
    this.appservice.Sales_Temp_Row.pur_prodName = this.temp_data.Item_Name;
    this.appservice.Sales_Temp_Row.pur_description = this.temp_data.Description;
    this.appservice.Sales_Temp_Row.pur_uom = this.temp_data.UOM;
    this.appservice.Sales_Temp_Row.pur_hsn_code = this.temp_data.HSN_Code;
    this.appservice.Sales_Temp_Row.pur_mrp = this.temp_data.MRP;
    

    this.MRP_= this.temp_data.MRP;
    this.appservice.Sales_Temp_Row.pur_brand = this.temp_data.Brand;
    this.appservice.Sales_Temp_Row.pur_category = this.temp_data.Category;

    this.appservice.Sales_Temp_Row.pur_sales_qty = "0";

    

    
    
    var Bill_Type = "Tax Invoice";
    try {
      Bill_Type = this.appservice.header_Row.pur_bill_type;
    }
    catch {
      Bill_Type = "Tax Invoice"
    }

    if (String(Bill_Type).toLowerCase() != "tax invoice") {
      
      this.appservice.Sales_Temp_Row.pur_gst_per = "0";  
    }
    else
    {
  
    this.appservice.Sales_Temp_Row.pur_gst_per = this.temp_data.GST_Per;
    }

    this.appservice.Sales_Temp_Row.pur_rate = this.temp_data.Purchase_Rate;
    this.appservice.Sales_Temp_Row.pur_bag_qty = this.temp_data.Bag_Qty;
    this.appservice.Sales_Temp_Row.pur_box_qty = this.temp_data.Box_Qty;
    this.appservice.Sales_Temp_Row.pur_upc = this.temp_data.Bag_Qty1;

    



    this.appservice.Sales_Temp_Row.pur_qty = "";

    this.appservice.Sales_Temp_Row.pur_disc_per = "0";
    this.appservice.Sales_Temp_Row.pur_disc_amt = "0";
    this.appservice.Sales_Temp_Row.pur_free = "0";
    this.appservice.Sales_Temp_Row.pur_profit_per = "0";
    this.appservice.Sales_Temp_Row.profit_per = "0";
    this.appservice.Sales_Temp_Row.pur_tcs_per = "0";
    this.appservice.Sales_Temp_Row.pur_tcs_amt = "0.00";
    var Stock_Row=[];
    this.appservice.get("Api/Invoice/get_Stock_by_Item_ID?Item_ID="+ this.temp_data.ID).subscribe((res: any) => { 
      Stock_Row = JSON.parse(res).record;
      
      try{
      var stock=0;
      stock = (Stock_Row.reduce((sum, current) => sum + parseFloat(current.Qty), 0)).toFixed(2);
      this.appservice.Sales_Temp_Row.pur_stock=stock;
      }catch{

      this.appservice.Sales_Temp_Row.pur_stock=0;
      }

      
    }); 


    this.appservice.Sales_Temp_Row.pur_wholesale_rate = this.temp_data.Wholesale_Rate;
    this.appservice.Sales_Temp_Row.pur_sale_rate = this.temp_data.Rate;

//     if(Number(this.temp_data.Rate)>0)
// {
//     this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.temp_data.MRP)*Number(this.temp_data.Box_Qty))/Number(this.temp_data.Rate))*100)-100).toFixed(2);
// }
// else{
  this.appservice.Sales_Temp_Row.pur_mrp_disc_per=0;
// }


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


  place_holder = "Item Name";
  calc_tempdata() {


 



if((Number(this.MRP_)!=Number(this.appservice.Sales_Temp_Row.pur_mrp)) && this.MRP_.length==(this.appservice.Sales_Temp_Row.pur_mrp).length)
{

  
  this.confirmationService.confirm({
    message: 'This MRP Not Available , Create New Press Yes?',
    accept: () => {
      this.new_load=true;
      this.New_MRP=this.appservice.Sales_Temp_Row.pur_mrp;
      this.New_Item=this.appservice.Sales_Temp_Row.pur_prodname;
      
      this.appservice.get("Api/Invoice/Create_MRP_Item?Item_ID="+ this.appservice.Sales_Temp_Row.pur_prodid+"&MRP="+this.appservice.Sales_Temp_Row.pur_mrp+"&Item_name="+this.appservice.item).subscribe((res: any) => { 
      this.get_Item_Master();
    
      });
    }
  });
}



      var GST_Type = "local";
      try {
        GST_Type = this.appservice.header_Row.pur_gst_type;
      }
      catch {
        GST_Type = "local"
      }


      if (String(GST_Type).toLowerCase() == "intra") {

        this.appservice.Sales_Temp_Row.pur_sgst_per = "0.00";
        this.appservice.Sales_Temp_Row.pur_cgst_per = "0.00";
        this.appservice.Sales_Temp_Row.pur_igst_per = this.appservice.Sales_Temp_Row.pur_gst_per;

      }
      else {
        this.appservice.Sales_Temp_Row.pur_sgst_per = (Number(this.appservice.Sales_Temp_Row.pur_gst_per) / 2).toFixed(2);
        this.appservice.Sales_Temp_Row.pur_cgst_per = (Number(this.appservice.Sales_Temp_Row.pur_gst_per) / 2).toFixed(2);
        this.appservice.Sales_Temp_Row.pur_igst_per = "0.00";

      }
    
      
    //this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));

    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.pur_disc_type;
    }
    catch {
      Disc_Type = "percentage"
    }

    if (String(Disc_Type).toLowerCase() == "amount") {

      this.appservice.Sales_Temp_Row.pur_disc_amt=Number(this.appservice.Sales_Temp_Row.pur_disc_per)/Number(this.appservice.Sales_Temp_Row.pur_qty);

     // console.log((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty))/ Number(this.appservice.Sales_Temp_Row.Unit_Price));

     // this.appservice.Sales_Temp_Row.Disc_Per = (((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty)) / Number(this.appservice.Sales_Temp_Row.Unit_Price)) / 100).toFixed(2);

    }
    else {
      this.appservice.Sales_Temp_Row.pur_disc_amt = (((Number(this.appservice.Sales_Temp_Row.pur_rate) / 100) * Number(this.appservice.Sales_Temp_Row.pur_disc_per)));
    }


    this.appservice.Sales_Temp_Row.pur_total_disc_amt = (Number(this.appservice.Sales_Temp_Row.pur_disc_amt) * Number(this.appservice.Sales_Temp_Row.pur_qty)).toFixed(2);

    this.appservice.Sales_Temp_Row.pur_final_price = (Number(this.appservice.Sales_Temp_Row.pur_rate) - Number(this.appservice.Sales_Temp_Row.pur_disc_amt));

    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.appservice.header_Row.pur_tax_type;
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {

      this.appservice.Sales_Temp_Row.pur_final_price = (
        (
          ((Number(this.appservice.Sales_Temp_Row.pur_rate) - Number(this.appservice.Sales_Temp_Row.pur_disc_amt))
            /
            (100 + Number(this.appservice.Sales_Temp_Row.pur_gst_per))
          )
          * 100
        ));


    }
    

    
  
    
// if(Number(this.appservice.Sales_Temp_Row.Sale_Rate)>0)
// {
//     this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.appservice.Sales_Temp_Row.MRP)*Number(this.appservice.Sales_Temp_Row.Box_Qty))/Number(this.appservice.Sales_Temp_Row.Sale_Rate))*100)-100).toFixed(2);
// }
// else{
  this.appservice.Sales_Temp_Row.pur_mrp_disc_per=0;
// }


    


    this.appservice.Sales_Temp_Row.pur_sub_total = (Number(this.appservice.Sales_Temp_Row.pur_final_price) * Number(this.appservice.Sales_Temp_Row.pur_qty)).toFixed(3);
    this.appservice.Sales_Temp_Row.pur_gst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_gst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_igst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_igst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_cgst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_cgst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_sgst_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.pur_sgst_per)).toFixed(2);
   // this.appservice.Sales_Temp_Row.TCS_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.TCS_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.pur_net_amt = ((Number(this.appservice.Sales_Temp_Row.pur_sub_total) + Number(this.appservice.Sales_Temp_Row.pur_gst_amt))).toFixed(2);
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
  else
  {
    if(this.check_duplicate(this.appservice.Sales_Temp_Row)==true && this.appservice.Stockbase_Sales == true )
    {
      this.temp_data={};
      this.appservice.Sales_Temp_Row.pur_prodname="";
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
     // console.log(  this.appservice.Sales_Temp_Row);
      return;
    }

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



check_duplicate(data) :boolean
{
  
  var index = this.appservice.Details_Row.findIndex(function (item, i) {
    return item.pur_prodid === data.pur_prodid
  });
  // if(index>=0)
  // {
  //   this.temp_data={}
  //   data={};
  //   this.appservice.Sales_Temp_Row.pur_prodName="";
  //   this.appservice.Sales_Temp_Row = {};
  //   this.toastr.error("Same item already added", "Error", { timeOut: 3000 });
  //   return true;
  // }
  return false;
}




  calc_details_Row(row) {


    var GST_Type = "local";
    try {
      GST_Type = this.appservice.header_Row.pur_gst_type;
    }
    catch {
      GST_Type = "local"
    }

    
    

    if (String(GST_Type).toLowerCase() == "intra") {

      this.appservice.Details_Row[row].pur_sgst_per = "0.00";
      this.appservice.Details_Row[row].pur_cgst_per = "0.00";
      this.appservice.Details_Row[row].pur_igst_per = this.appservice.Details_Row[row].pur_gst_per;

    }
    else {
      this.appservice.Details_Row[row].pur_sgst_per = (Number(this.appservice.Details_Row[row].pur_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].pur_cgst_per = (Number(this.appservice.Details_Row[row].pur_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].pur_igst_per = "0.00";
    }

    

    //this.appservice.Details_Row[row].Qty = (Number(this.appservice.Details_Row[row].Pcs) * Number(this.appservice.Details_Row[row].Bag_Qty));

    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.pur_disc_type;
    }
    catch {
      Disc_Type = "percentage"
    }

    if (String(Disc_Type).toLowerCase() == "amount") {
      this.appservice.Details_Row[row].pur_disc_amt = ((Number(this.appservice.Details_Row[row].pur_disc_per) / Number(this.appservice.Details_Row[row].pur_qty)));
     // this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);



    }
    else {
      this.appservice.Details_Row[row].pur_disc_amt = (((Number(this.appservice.Details_Row[row].pur_rate) / 100) * Number(this.appservice.Details_Row[row].pur_disc_per)));
    }


    this.appservice.Details_Row[row].pur_total_disc_amt = (Number(this.appservice.Details_Row[row].pur_disc_amt) * Number(this.appservice.Details_Row[row].pur_qty)).toFixed(2);



    this.appservice.Details_Row[row].pur_final_price = (Number(this.appservice.Details_Row[row].pur_rate) - Number(this.appservice.Details_Row[row].pur_disc_amt));

    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.appservice.header_Row.pur_tax_type;
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {
      this.appservice.Details_Row[row].pur_final_price = (
        (
          ((Number(this.appservice.Details_Row[row].pur_rate) - Number(this.appservice.Details_Row[row].pur_disc_amt))
            /
            (100 + Number(this.appservice.Details_Row[row].pur_gst_per))
          )
          * 100
        ));


    }


        
    // if(Number(this.appservice.Details_Row[row].Sale_Rate)>0)
    // {
    //     this.appservice.Details_Row[row].MRP_Disc_Per = ((((Number(this.appservice.Details_Row[row].MRP)*Number(this.appservice.Details_Row[row].Box_Qty))/Number(this.appservice.Details_Row[row].Sale_Rate))*100)-100).toFixed(2);
    // }
    // else{
      this.appservice.Details_Row[row].pur_mrp_disc_per=0;
    // }


    this.appservice.Details_Row[row].pur_sub_total = (Number(this.appservice.Details_Row[row].pur_final_price) * Number(this.appservice.Details_Row[row].pur_qty)).toFixed(3);
    this.appservice.Details_Row[row].pur_gst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_gst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_igst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_igst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_cgst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_cgst_per)).toFixed(2);
    this.appservice.Details_Row[row].pur_sgst_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) / 100) * Number(this.appservice.Details_Row[row].pur_sgst_per)).toFixed(2);

   // this.appservice.Details_Row[row].TCS_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].TCS_Per)).toFixed(2);
   
    this.appservice.Details_Row[row].pur_net_amt = ((Number(this.appservice.Details_Row[row].pur_sub_total) + Number(this.appservice.Details_Row[row].pur_gst_amt))).toFixed(2);
    this.Calc_Sum();
  }


  add_data(data) {
    if ((Number(data.pur_qty)+Number(data.pur_free)) > 0) {
      this.appservice.Details_Row.push(data);
      localStorage.setItem('Pur_Details', JSON.stringify(this.appservice.Details_Row));

      this.Calc_Sum();
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
    }

  }


  Calc_Sum() {
    var len = 0;
    len = this.appservice.Details_Row.length;

    this.appservice.header_Row.pur_sub_total = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.pur_qty) * parseFloat(current.pur_rate)), 0)).toFixed(2);
    this.appservice.header_Row.pur_disc_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_disc_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_disc_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_total_disc_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_taxable_amount = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sub_total), 0)).toFixed(2);

    this.appservice.header_Row.pur_tax_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_gst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_tax_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_gst_amt), 0)).toFixed(2);

    this.appservice.header_Row.pur_igst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_igst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_sgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sgst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.pur_cgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_cgst_per), 0)) / len).toFixed(2);

    this.appservice.header_Row.pur_igst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_igst_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_sgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_sgst_amt), 0)).toFixed(2);
    this.appservice.header_Row.pur_cgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_cgst_amt), 0)).toFixed(2);

//    if(Number(this.appservice.header_Row.pur_tcs_per)>0)
//    {
//     this.appservice.header_Row.pur_tcs_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_tcs_amt), 0)).toFixed(2);
//     this.appservice.header_Row.pur_tcs_amt=(Number(this.appservice.header_Row.pur_tcs_amt)+Number(this.appservice.header_Row.pur_tcs_per));
//     this.appservice.header_Row.pur_net_amt = Math.round((Number(   this.appservice.header_Row.pur_net_amt)+Number( this.appservice.header_Row.pur_tcs_amt))).toFixed(2);
//    }
// else
// {
//   this.appservice.header_Row.pur_tcs_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_tcs_amt), 0)).toFixed(2);
//   this.appservice.header_Row.pur_net_amt = Math.round((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_net_amt), 0))).toFixed(2);

// }
  
this.appservice.header_Row.pur_net_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.pur_net_amt), 0));
this.appservice.header_Row.pur_net_amt=((Number(this.appservice.header_Row.pur_net_amt) + Number(this.appservice.header_Row.pur_tcs_amt))-this.appservice.header_Row.pur_adjustment).toFixed(2);

  }



  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  isload: boolean = false;



  public Rate_Rows:any ={};
  Valid: boolean = true;
  Place_Order() {
    
    this.appservice.header_Row.Company = this.appservice.Company;
    this.appservice.header_Row.Created_by = this.appservice.CREATED_BY;
    this.appservice.header_Row.items = this.appservice.Details_Row;
    this.appservice.header_Row.pur_purchase_type ="Purchase";
    this.appservice.header_Row.pur_type ="Purchase";
    this.appservice.header_Row.Item_Rate_Update=this.appservice.Item_Rate_Update;
    this.appservice.header_Row.ID=this.appservice.header_Row.pur_id;
    this.appservice.header_Row.ColumnPerfix="pur_";
    this.appservice.header_Row.pur_pay_mode="CREDIT";
    this.appservice.header_Row.pur_load="1";
    if(this.appservice.header_Row.pur_loc_type=="Project")
    {
    this.Rate_Rows=this.appservice.To_Area_Rows.filter(e => e.trm_from == this.appservice.header_Row.pur_ledger_name);
    this.Rate_Rows=this.Rate_Rows.filter(e => e.trm_to.toLowerCase() == this.appservice.header_Row.pur_to.toLowerCase())[0];
    if(this.appservice.header_Row.pur_tpttype=="7U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_7U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_7U;
    }
    if(this.appservice.header_Row.pur_tpttype=="5.7U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_57U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_57U;
    }
    if(this.appservice.header_Row.pur_tpttype=="5U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_5U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_5U;
    }
    if(this.appservice.header_Row.pur_tpttype=="4U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_4U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_4U;
    }
    if(this.appservice.header_Row.pur_tpttype=="3U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_3U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_3U;
    }
    if(this.appservice.header_Row.pur_tpttype=="2U")
    {
      this.appservice.header_Row.pur_tamount=(Number(this.appservice.header_Row.pur_load)*Number(this.Rate_Rows.trm_2U));
      this.appservice.header_Row.pur_stamount=this.Rate_Rows.trm_2U;
    }
  }
    for (var i = 0; i < this.appservice.Details_Row.length; i++) {

      if(this.appservice.Details_Row[i]["Free"] =="")
      {
        this.appservice.Details_Row[i]["Free"]="0"
      }
    }
    
    this.Valid = true;
    // this.appservice.get_fields_of('Purchase').forEach((data) => {
    //   this.addForm.submitted = true;
    //   if (data.Validate == "True" && this.appservice.header_Row[data.Field] == "") {
    //     this.Valid = false;
    //   }

    // });

    


    this.add.items = this.appservice.cart_item;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


    if (this.Valid) {
      this.btndisable = true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Purchase', this.appservice.header_Row, { headers: this.headers })
        .subscribe(
          (val: string) => {
            this.btndisable = false;
            if (val == "True") {
              this.toastr.success("Submtted Successfully", 'Msg');
              this.appservice.isEdit = false;
              this.appservice.from_customer_page = false;
              //this.appservice.get_Purchase_Details();
              this.appservice.header_Row = {};
              this.appservice.Details_Row = [];
              localStorage.setItem('Pur_Details',"[]");
              
              this.appservice.Pur_Date=this.add.pur_bill_date;
              //this.appservice.get_Item_Master();
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

  Clear_()
  {
    this.appservice.Sales_Temp_Row = {};
    this.appservice.Details_Row = [];
    localStorage.setItem('Pur_Details',"[]");
  }

  ngOnInit(): void {
  }

}
