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
  selector: 'app-add-purchase1',
  templateUrl: './add-purchase1.component.html',
  styleUrls: ['./add-purchase1.component.scss']
})
export class AddPurchase1Component implements OnInit {

  
  add: any = {};
  public btndisable: boolean = false;
  public addForm: any = {};
  
  Item_rows=[];
  public Selected_Item: any = {};

  selectedItem: string;
  Selected_Bill_Type = "";
  Selected_Tax_Type = "";
  Selected_Bill_Mode = "";
  Selected_Pay_Mode = "";

  public Bill_Type_Row = [];
  public Tax_Type_Row = [];
  public Bill_Mode_Row = [];
  public Pay_Mode_Row = [];

  rowdata=0;
  Status="1";
  public New_MRP="";
  public New_Item="";
  public rs = [];
  constructor(public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService,private router: Router, private http: HttpClient) {
    this.rs = this.appservice.get_fields_of('Purchase_details');
    this.Bill_Type_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Bill_Type");
    this.Tax_Type_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Tax_Type");
    this.Bill_Mode_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Bill_Mode");
    this.Pay_Mode_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Pay_Mode");
    this.Selected_Bill_Type="Tax Invoice";
    this.Selected_Tax_Type="Inclusive";
    this.Selected_Bill_Mode="Cash";
    this.Selected_Pay_Mode="Cash";
    this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    //this.appservice.header_Row.Go_Down="57";
    if (this.appservice.isEdit) {
      this.appservice.header_Row = appservice.Edit_Row;
      this.Status="0";
      try {
        this.appservice.header_Row.Purchase_Date = appservice.datefromat(this.appservice.Edit_Row.Purchase_Date);
        this.appservice.header_Row.Bill_Date = appservice.datefromat(this.appservice.Edit_Row.Bill_Date);
      } catch{ }
    }
    else {
      this.appservice.header_Row = {};
      this.appservice.Details_Row = [];
      this.clear();
      this.get_Purchase_No();
      this.appservice.header_Row.ID = "0";
      this.appservice.header_Row.Adjustment="0";
      this.appservice.header_Row.Purchase_Date =this.appservice.T_Date;
      this.appservice.header_Row.Bill_Date = this.appservice.T_Date;
    }
    if (this.appservice.from_customer_page == true) {
      this.appservice.header_Row.Contact_No = this.appservice.Selected_Customer.Cus_ContactNo;
      this.appservice.header_Row.Ledger_ID = this.appservice.Selected_Customer.Cus_ID;
      this.appservice.header_Row.Customer_Name = this.appservice.Selected_Customer.Cus_Name;
      this.appservice.header_Row.GST_No = this.appservice.Selected_Customer.Cus_GSTIN;
      this.appservice.header_Row.Customer_Address1 = this.appservice.Selected_Customer.Cus_Address;
      this.appservice.header_Row.Customer_Address2 = this.appservice.Selected_Customer.Cus_Addr2;
      this.appservice.header_Row.SupPin = this.appservice.Selected_Customer.Cus_Pincode;
      this.appservice.header_Row.SupLoc = this.appservice.Selected_Customer.Cus_City;
      this.appservice.header_Row.SupStcd=this.appservice.Selected_Customer.Cus_SCode;
      if(this.appservice.Selected_Customer.Cus_SCode==this.appservice.GST_Code)
      {
        this.appservice.header_Row.GST_Type="local";
      }
      else
      {
        this.appservice.header_Row.GST_Type="intra";
      }

    }

  }

  

  get_Purchase_No() {
    this.appservice.get("Api/Transaction/get_Purchase_No?Type=Purchase").subscribe((res: any) => {
      this.appservice.header_Row.Purchase_No = res;
    });
  }

  get_customers() {
    this.appservice.vType='P';
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

    this.appservice.Sales_Temp_Row.Item_ID = this.temp_data.ID;


    this.appservice.get("Api/Master/get_L_P_Rate?Item_ID="+this.temp_data.ID).subscribe((res: any) => {
      this.appservice.Sales_Temp_Row.Last_Rate = res;
    });

    this.appservice.Sales_Temp_Row.Item_Code = this.temp_data.Item_Code;
    this.appservice.Sales_Temp_Row.Item_Name = this.temp_data.Item_Name;
    this.appservice.Sales_Temp_Row.Description = this.temp_data.Description;
    this.appservice.Sales_Temp_Row.UOM = this.temp_data.UOM;
    this.appservice.Sales_Temp_Row.HSN_Code = this.temp_data.HSN_Code;
    this.appservice.Sales_Temp_Row.MRP = this.temp_data.MRP;
    

    this.MRP_= this.temp_data.MRP;
    this.appservice.Sales_Temp_Row.Brand = this.temp_data.Brand;
    this.appservice.Sales_Temp_Row.Category = this.temp_data.Category;

    this.appservice.Sales_Temp_Row.Sales_Qty = "0";

    

    
    
    var Bill_Type = "Tax Invoice";
    try {
      Bill_Type = this.appservice.header_Row.Bill_Type;
    }
    catch {
      Bill_Type = "Tax Invoice"
    }

    if (String(Bill_Type).toLowerCase() != "tax invoice") {
      
      this.appservice.Sales_Temp_Row.GST_Per = "0";  
    }
    else
    {
  
    this.appservice.Sales_Temp_Row.GST_Per = this.temp_data.GST_Per;
    }

    this.appservice.Sales_Temp_Row.Unit_Price = this.temp_data.Purchase_Rate;
    this.appservice.Sales_Temp_Row.Bag_Qty = this.temp_data.Bag_Qty;
    this.appservice.Sales_Temp_Row.Box_Qty = this.temp_data.Box_Qty;
    this.appservice.Sales_Temp_Row.UPC = this.temp_data.Bag_Qty1;

    



    this.appservice.Sales_Temp_Row.Pcs = "";

    this.appservice.Sales_Temp_Row.Disc_Per = "0";
    this.appservice.Sales_Temp_Row.Disc_Amt = "0";
    this.appservice.Sales_Temp_Row.Free = "0";
    this.appservice.Sales_Temp_Row.Profit_Per = "0";
    this.appservice.Sales_Temp_Row.Profit_Per = "0";
    this.appservice.Sales_Temp_Row.TCS_Per = "0.00";
    this.appservice.Sales_Temp_Row.TCS_Amt = "0.00";
    var Stock_Row=[];
    this.appservice.get("Api/Invoice/get_Stock_by_Item_ID?Item_ID="+ this.temp_data.ID).subscribe((res: any) => { 
      Stock_Row = JSON.parse(res).record;
      
      try{
      var stock=0;
      stock = (Stock_Row.reduce((sum, current) => sum + parseFloat(current.Qty), 0)).toFixed(2);
      this.appservice.Sales_Temp_Row.Stock=stock;
      }catch{

      this.appservice.Sales_Temp_Row.Stock=0;
      }

      
    }); 


    this.appservice.Sales_Temp_Row.Wholesale_Rate = this.temp_data.Wholesale_Rate;
    this.appservice.Sales_Temp_Row.Sale_Rate = this.temp_data.Rate;

//     if(Number(this.temp_data.Rate)>0)
// {
//     this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.temp_data.MRP)*Number(this.temp_data.Box_Qty))/Number(this.temp_data.Rate))*100)-100).toFixed(2);
// }
// else{
  this.appservice.Sales_Temp_Row.MRP_Disc_Per=0;
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


 



if((Number(this.MRP_)!=Number(this.appservice.Sales_Temp_Row.MRP)) && this.MRP_.length==(this.appservice.Sales_Temp_Row.MRP).length)
{

  
  this.confirmationService.confirm({
    message: 'This MRP Not Available , Create New Press Yes?',
    accept: () => {
      this.new_load=true;
      this.New_MRP=this.appservice.Sales_Temp_Row.MRP;
      this.New_Item=this.appservice.Sales_Temp_Row.Item_Name;
      
      this.appservice.get("Api/Invoice/Create_MRP_Item?Item_ID="+ this.appservice.Sales_Temp_Row.Item_ID+"&MRP="+this.appservice.Sales_Temp_Row.MRP+"&Item_name="+this.appservice.item).subscribe((res: any) => { 
      this.get_Item_Master();
    
      });
    }
  });
}



      var GST_Type = "local";
      try {
        GST_Type = this.appservice.header_Row.GST_Type;
      }
      catch {
        GST_Type = "local"
      }


      if (String(GST_Type).toLowerCase() == "intra") {

        this.appservice.Sales_Temp_Row.SGST_Per = "0.00";
        this.appservice.Sales_Temp_Row.CGST_Per = "0.00";
        this.appservice.Sales_Temp_Row.IGST_Per = this.appservice.Sales_Temp_Row.GST_Per;

      }
      else {
        this.appservice.Sales_Temp_Row.SGST_Per = (Number(this.appservice.Sales_Temp_Row.GST_Per) / 2).toFixed(2);
        this.appservice.Sales_Temp_Row.CGST_Per = (Number(this.appservice.Sales_Temp_Row.GST_Per) / 2).toFixed(2);
        this.appservice.Sales_Temp_Row.IGST_Per = "0.00";

      }
    
      
    this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));

    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.Disc_Type;
    }
    catch {
      Disc_Type = "percentage"
    }

    if (String(Disc_Type).toLowerCase() == "amount") {

      this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);

     // console.log((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty))/ Number(this.appservice.Sales_Temp_Row.Unit_Price));

     // this.appservice.Sales_Temp_Row.Disc_Per = (((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty)) / Number(this.appservice.Sales_Temp_Row.Unit_Price)) / 100).toFixed(2);

    }
    else {
      this.appservice.Sales_Temp_Row.Disc_Amt = (((Number(this.appservice.Sales_Temp_Row.Unit_Price) / 100) * Number(this.appservice.Sales_Temp_Row.Disc_Per)));
    }


    this.appservice.Sales_Temp_Row.Total_Disc_Amt = (Number(this.appservice.Sales_Temp_Row.Disc_Amt) * Number(this.appservice.Sales_Temp_Row.Qty)).toFixed(2);

    this.appservice.Sales_Temp_Row.Final_Price = (Number(this.appservice.Sales_Temp_Row.Unit_Price) - Number(this.appservice.Sales_Temp_Row.Disc_Amt));

    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.Selected_Tax_Type
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {

      this.appservice.Sales_Temp_Row.Final_Price = (
        (
          ((Number(this.appservice.Sales_Temp_Row.Unit_Price) - Number(this.appservice.Sales_Temp_Row.Disc_Amt))
            /
            (100 + Number(this.appservice.Sales_Temp_Row.GST_Per))
          )
          * 100
        ));


    }
    

    
  
    
// if(Number(this.appservice.Sales_Temp_Row.Sale_Rate)>0)
// {
//     this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.appservice.Sales_Temp_Row.MRP)*Number(this.appservice.Sales_Temp_Row.Box_Qty))/Number(this.appservice.Sales_Temp_Row.Sale_Rate))*100)-100).toFixed(2);
// }
// else{
  this.appservice.Sales_Temp_Row.MRP_Disc_Per=0;
// }


    


    this.appservice.Sales_Temp_Row.Sub_total = (Number(this.appservice.Sales_Temp_Row.Final_Price) * Number(this.appservice.Sales_Temp_Row.Qty)).toFixed(2);
    this.appservice.Sales_Temp_Row.GST_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.GST_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.IGST_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.IGST_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.CGST_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.CGST_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.SGST_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.SGST_Per)).toFixed(2);
   // this.appservice.Sales_Temp_Row.TCS_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.TCS_Per)).toFixed(2);
    this.appservice.Sales_Temp_Row.Net_Amt = ((Number(this.appservice.Sales_Temp_Row.Sub_total)+Number( this.appservice.Sales_Temp_Row.TCS_Amt) + Number(this.appservice.Sales_Temp_Row.GST_Amt))).toFixed(2);
  }


x:string="";

  out()
{


  try{

    this.x=""+  this.x.length;
    this.x=this.appservice.Sales_Temp_Row.Item_Name;
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
      this.appservice.Sales_Temp_Row.Item_Name="";
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
     // console.log(  this.appservice.Sales_Temp_Row);
      return;
    }

  }

  
   var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.Qty;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_qty").focus();
    return;
  }


  var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.Unit_Price;
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
    return item.Item_ID === data.Item_ID
  });
  if(index>=0)
  {
    this.temp_data={}
    data={};
    this.appservice.Sales_Temp_Row.Item_Name="";
    this.appservice.Sales_Temp_Row = {};
    this.toastr.error("Same item already added", "Error", { timeOut: 3000 });
    return true;
  }
  return false;
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

      this.appservice.Details_Row[row].SGST_Per = "0.00";
      this.appservice.Details_Row[row].CGST_Per = "0.00";
      this.appservice.Details_Row[row].IGST_Per = this.appservice.Details_Row[row].GST_Per;

    }
    else {
      this.appservice.Details_Row[row].SGST_Per = (Number(this.appservice.Details_Row[row].GST_Per) / 2).toFixed(2);
      this.appservice.Details_Row[row].CGST_Per = (Number(this.appservice.Details_Row[row].GST_Per) / 2).toFixed(2);
      this.appservice.Details_Row[row].IGST_Per = "0.00";
    }

    

    this.appservice.Details_Row[row].Qty = (Number(this.appservice.Details_Row[row].Pcs) * Number(this.appservice.Details_Row[row].Bag_Qty));

    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.Disc_Type;
    }
    catch {
      Disc_Type = "percentage"
    }

    if (String(Disc_Type).toLowerCase() == "amount") {
      this.appservice.Details_Row[row].Disc_Amt = ((Number(this.appservice.Details_Row[row].Disc_Per) / Number(this.appservice.Details_Row[row].Qty)));
     // this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);



    }
    else {
      this.appservice.Details_Row[row].Disc_Amt = (((Number(this.appservice.Details_Row[row].Unit_Price) / 100) * Number(this.appservice.Details_Row[row].Disc_Per)));
    }


    this.appservice.Details_Row[row].Total_Disc_Amt = (Number(this.appservice.Details_Row[row].Disc_Amt) * Number(this.appservice.Details_Row[row].Qty)).toFixed(2);



    this.appservice.Details_Row[row].Final_Price = (Number(this.appservice.Details_Row[row].Unit_Price) - Number(this.appservice.Details_Row[row].Disc_Amt));

    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.Selected_Tax_Type;
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {
      this.appservice.Details_Row[row].Final_Price = (
        (
          ((Number(this.appservice.Details_Row[row].Unit_Price) - Number(this.appservice.Details_Row[row].Disc_Amt))
            /
            (100 + Number(this.appservice.Details_Row[row].GST_Per))
          )
          * 100
        ));


    }


        
    // if(Number(this.appservice.Details_Row[row].Sale_Rate)>0)
    // {
    //     this.appservice.Details_Row[row].MRP_Disc_Per = ((((Number(this.appservice.Details_Row[row].MRP)*Number(this.appservice.Details_Row[row].Box_Qty))/Number(this.appservice.Details_Row[row].Sale_Rate))*100)-100).toFixed(2);
    // }
    // else{
      this.appservice.Details_Row[row].MRP_Disc_Per=0;
    // }


    this.appservice.Details_Row[row].Sub_total = (Number(this.appservice.Details_Row[row].Final_Price) * Number(this.appservice.Details_Row[row].Qty)).toFixed(2);
    this.appservice.Details_Row[row].GST_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].GST_Per)).toFixed(2);
    this.appservice.Details_Row[row].IGST_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].IGST_Per)).toFixed(2);
    this.appservice.Details_Row[row].CGST_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].CGST_Per)).toFixed(2);
    this.appservice.Details_Row[row].SGST_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].SGST_Per)).toFixed(2);

   // this.appservice.Details_Row[row].TCS_Amt = ((Number(this.appservice.Details_Row[row].Sub_total) / 100) * Number(this.appservice.Details_Row[row].TCS_Per)).toFixed(2);

    this.appservice.Details_Row[row].Net_Amt = ((Number(this.appservice.Details_Row[row].Sub_total)+Number(this.appservice.Details_Row[row].TCS_Amt) + Number(this.appservice.Details_Row[row].GST_Amt))).toFixed(2);
    this.Calc_Sum();
  }


  add_data(data) {

    if ((Number(data.Qty)+Number(data.Free)) > 0) {
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

    this.appservice.header_Row.Sub_Total = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.Qty) * parseFloat(current.Unit_Price)), 0)).toFixed(2);
    this.appservice.header_Row.Disc_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Disc_Per), 0)) / len).toFixed(2);
    this.appservice.header_Row.Disc_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Total_Disc_Amt), 0)).toFixed(2);
    this.appservice.header_Row.Taxable_Amount = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Sub_total), 0)).toFixed(2);

    this.appservice.header_Row.Tax_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.GST_Per), 0)) / len).toFixed(2);
    this.appservice.header_Row.Tax_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.GST_Amt), 0)).toFixed(2);

    this.appservice.header_Row.IGST_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.IGST_Per), 0)) / len).toFixed(2);
    this.appservice.header_Row.SGST_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.SGST_Per), 0)) / len).toFixed(2);
    this.appservice.header_Row.CGST_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.CGST_Per), 0)) / len).toFixed(2);

    this.appservice.header_Row.IGST_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.IGST_Amt), 0)).toFixed(2);
    this.appservice.header_Row.SGST_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.SGST_Amt), 0)).toFixed(2);
    this.appservice.header_Row.CGST_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.CGST_Amt), 0)).toFixed(2);

   if(Number(this.appservice.header_Row.TCS_Per)>0)
   {
    this.appservice.header_Row.TCS_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.TCS_Amt), 0)).toFixed(2);
    this.appservice.header_Row.TCS_Amt=(Number(this.appservice.header_Row.TCS_Amt)+Number(this.appservice.header_Row.TCS_Per));
    this.appservice.header_Row.Net_Amt = Math.round((Number(   this.appservice.header_Row.Net_Amt)+Number( this.appservice.header_Row.TCS_Amt))).toFixed(2);
   }
else
{
  this.appservice.header_Row.TCS_Amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.TCS_Amt), 0)).toFixed(2);
  this.appservice.header_Row.Net_Amt = Math.round((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0))).toFixed(2);

}
  

this.appservice.header_Row.Net_Amt=this.appservice.header_Row.Net_Amt-this.appservice.header_Row.Adjustment;

  }



  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  isload: boolean = false;



  Valid: boolean = true;
  Place_Order() {

    this.appservice.header_Row.Company = this.appservice.Company;
    this.appservice.header_Row.Created_by = this.appservice.CREATED_BY;
    this.appservice.header_Row.items = this.appservice.Details_Row;
    this.appservice.header_Row.Purchase_Type ="Purchase";
    this.appservice.header_Row.Bill_Type = this.Selected_Bill_Type;
    this.appservice.header_Row.Bill_Mode = this.Selected_Bill_Mode;
    this.appservice.header_Row.Tax_Type = this.Selected_Tax_Type;
    this.appservice.header_Row.Item_Rate_Update=this.appservice.Item_Rate_Update;
    

   
    for (var i = 0; i < this.appservice.Details_Row.length; i++) {

      if(this.appservice.Details_Row[i]["Free"] =="")
      {
        this.appservice.Details_Row[i]["Free"]="0"
      }
    }
    
    this.Valid = true;
    this.appservice.get_fields_of('Purchase').forEach((data) => {
      this.addForm.submitted = true;
      if (data.Validate == "True" && this.appservice.header_Row[data.Field] == "") {
        this.Valid = false;
      }

    });

    


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
