import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {

 
  public add: any = {};
  public btndisable: boolean = false;
  public btndisable2: boolean = false;

  public Customer_Name = "Select Customer Name";
  public addForm: any = {};
  public rs = [];

  date: Date;
  public GST_No = "";
  constructor(public confirmationService: ConfirmationService, public appservice: AppService, private toastr: ToastrService, private router: Router, private http: HttpClient) {

    this.appservice.Customer_Balance =0;
    this.rs = this.appservice.get_fields_of('Sales_Details');
    this.appservice.loading=false;
    // if(this.appservice.Rights_Name_=="Admin1")

    // {
    //  for(var i=0;i<this.rs.length;i++)
    //  {
    //         if(this.rs[i]["Field"]=="Purchase_Rate" || this.rs[i]["Field"]=="Profit")
    //         {

    //           this.rs[i]["Class"]="hidden"
    //         }

    //  }
    // }


    this.appservice.header_Row.Return_Amount = "0";
    this.appservice.header_Row.Return_Bill = "";

    if (this.appservice.isadd_Page == true) {
      this.Calc_Sum();
      this.appservice.isadd_Page = false;
    }
    else if (this.appservice.isEdit) {
      try {
        this.appservice.header_Row.sal_bill_date = appservice.datefromat(this.appservice.header_Row.sal_bill_date);
        this.appservice.header_Row.sal_date = appservice.datefromat(this.appservice.header_Row.sal_date);
        this.appservice.header_Row.sal_po_date = appservice.datefromat(this.appservice.header_Row.sal_po_date);
        this.GST_No = this.appservice.header_Row.sal_gstin;
        this.appservice.header_Row.ID = this.appservice.header_Row.sal_id;
        this.get_retrun_Amount_bill();
        
      this.get_retrun_Amount();

        if (this.appservice.from_customer_page == true) {
          this.appservice.header_Row.sal_contact_no = this.appservice.Selected_Customer.cus_contact_number;
          this.appservice.header_Row.sal_ledger_id = this.appservice.Selected_Customer.cus_id;
          this.appservice.header_Row.sal_ledger_name = this.appservice.Selected_Customer.cus_name;
          this.appservice.header_Row.sal_address1 = this.appservice.Selected_Customer.cus_address1;
          this.appservice.header_Row.sal_address2 = this.appservice.Selected_Customer.cus_address2;
          this.appservice.header_Row.sal_address3 = this.appservice.Selected_Customer.cus_address3;
          this.appservice.header_Row.sal_gstin = this.appservice.Selected_Customer.cus_gstin;
          this.appservice.header_Row.GST_Type = this.appservice.Selected_Customer.cus_tax_type;
          this.GST_No = this.appservice.header_Row.sal_gstin;
          this.appservice.from_customer_page = false;
        }

      } catch { }
    }
    else {
      this.appservice.header_Row = {};
      this.appservice.Details_Row = [];
      this.clear();
      this.appservice.header_Row.sal_date = appservice.T_Date;
      this.appservice.header_Row.ID = "0";
      this.get_Bill_No();

      this.appservice.header_Row.sal_contact_no = this.appservice.Selected_Customer.cus_contact_number;
      this.appservice.header_Row.sal_ledger_id = this.appservice.Selected_Customer.cus_id;
      this.get_Sales_Return_Bill(this.appservice.header_Row.cus_id)
      this.appservice.header_Row.sal_ledger_name = this.appservice.Selected_Customer.cus_name;
      this.appservice.header_Row.sal_address1 = this.appservice.Selected_Customer.cus_address1;
      this.appservice.header_Row.sal_address2 = this.appservice.Selected_Customer.cus_address2;
      this.appservice.header_Row.sal_address3 = this.appservice.Selected_Customer.cus_address3;
      this.appservice.header_Row.sal_gstin = this.appservice.Selected_Customer.cus_gstin;
      this.appservice.header_Row.GST_Type = this.appservice.Selected_Customer.cus_tax_type;
      this.GST_No = this.appservice.header_Row.sal_gstin;


      this.appservice.from_customer_page = false;
      
      this.get_retrun_Amount();
      this.appservice.Selected_Customer = {};
     // this.Open_Customer_Module(this.appservice.header_Row.Ledger_ID);
    }

    if (this.appservice.load_from_make_invoice == true) {
      this.appservice.header_Row.sal_date = appservice.T_Date;
      this.appservice.header_Row.sal_bill_date = appservice.T_Date;
      this.appservice.header_Row.ID = "0";
      this.appservice.header_Row.Freight_Amt = 0;
      this.appservice.header_Row.Freight_Per = 0;
      this.appservice.header_Row.PF_Per = 0;
      this.appservice.header_Row.PF_Amt = 0;
      this.appservice.header_Row.sal_bill_type = this.appservice.header_Row.Bill_Type;
      this.appservice.header_Row.sal_bill_mode = this.appservice.header_Row.Bill_Mode;
      this.appservice.header_Row.sal_tax_type = "Inclusive";
      this.get_Bill_No();
      this.appservice.load_from_make_invoice = false;

    }

    this.Calc_Sum();


    if (appservice.Stockbase_Sales == true) {
      this.get_Stock_Row();
    }
    this.get_Bal(this.appservice.header_Row.sal_ledger_id)

    this.appservice.Sales_Temp_Row = {};
  }

  get_Bal(id)
  { this.appservice.get("Api/Master/get_Customer_Balance?ledger_ID=" + id ).subscribe((res: any) => {
    this.appservice.Customer_Balance=res;
    });}
    public Sales_Return_Rows=[];
    public Sales_Return_Rows_Len=0;

    get_Sales_Return_Bill(id)
    { 
      this.appservice.get("Api/Master/get_sales_Return_Bill?ledger_ID=" + id ).subscribe((res: any) => {
      this.Sales_Return_Rows= JSON.parse(res).record;
      try
      {
        this.Sales_Return_Rows_Len=this.Sales_Return_Rows.length;

      }
      catch{}
      });
    }
    Print_Bill(data)
{
  window.open(this.appservice.Server_URL + "report/Sales_Return_Bill?Bill_No=" + data.Bill_No + "&Company=" + this.appservice.Company, "_blank");

}
  public Stock_Row = [];

  get_Stock_Row() {


    this.appservice.loading = true;
    this.appservice.get("Api/Master/get_Item_Stock_bycustomer1?Ledger_ID=" + this.appservice.header_Row.sal_ledger_id + "&Category=all&Check_Stock=true&Order_by= i.Category,i.Item_Name&Order_No=" + this.appservice.header_Row.Order_No).subscribe((res: any) => {
      this.Stock_Row = JSON.parse(res).record;
  


      this.appservice.loading = false;
    });
  }


  Retrun_Row_len=0;
  Retrun_Row = [];
  get_retrun_Amount() {
    this.Retrun_Row_len=0;
    this.Retrun_Row = [];
 
    this.appservice.get("Api/Invoice/get_sales_Return_Items?ID=" + this.appservice.header_Row.Ledger_ID).subscribe((res: any) => {
      this.Retrun_Row = JSON.parse(res).record;
      
      try
      {
        this.Retrun_Row_len=this.Retrun_Row.length;

      }
      catch{}
    });
  }


  Retrun_Row_len1=0;
  Retrun_Row1 = [];
  get_retrun_Amount_bill() {
    this.Retrun_Row_len1=0;
    this.Retrun_Row1 = [];
  
    this.appservice.get("Api/Invoice/get_sales_Return_Billed?ID=" + this.appservice.header_Row.Bill_No).subscribe((res: any) => {
      this.Retrun_Row1 = JSON.parse(res).record;
      
      this.appservice.header_Row.Return_Amount = (this.Retrun_Row1.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);

      try
      {
        this.Retrun_Row_len1=this.Retrun_Row1.length;

      }
      catch{}
    });
  }

  R_Type="Apply";

  return_apply()
  {
    this.R_Type="Apply";
    if(this.Retrun_Row_len>0)
    {
      this.appservice.header_Row.Return_Amount = (this.Retrun_Row.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);

      this.appservice.header_Row.Remarks  = [...new Set(this.Retrun_Row.map(item => item.Remarks))];
      this.appservice.header_Row.Remarks  = this.Retrun_Row[0]["Return_Type"]+', '+this.appservice.header_Row.Remarks 
       this.Calc_Sum();
    }
  }


  return_Remove()
  {
    this.R_Type="Remove";
    
      this.appservice.header_Row.Return_Amount ="0";

      this.appservice.header_Row.Remarks  ="";
      
       this.Calc_Sum();
    }
  

  clear() {

    this.appservice.get_fields_of('Sales').forEach((activity) => {
      if (activity.Default_Value == "T_Date") {
        this.appservice.header_Row[activity.Field] = this.appservice.T_Date;
      }
      else {
        this.appservice.header_Row[activity.Field] = activity.Default_Value;
      }
    });
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

  Print() {
    return this.router.navigate(['sales/print-page']);

  }
  d: any = {}
  temp_data: any = {};


  L_Stock = 0;
  L_Uni_Code = 0;
  L_Landing_Cost = 0;
  L_L_Rate = 0;
  L_L_Disc_Rate = "";


  get_by_Code_S(data, type) {

  
    try {

      
      this.temp_data = this.Stock_Row.filter(e => e.value == data)[0];
      this.L_Stock = this.temp_data.Stock;
      this.L_Uni_Code = this.temp_data.Uni_Code;
      this.L_Landing_Cost = this.temp_data.Landing_Cost;
      this.L_L_Rate = this.temp_data.L_Rate;
      this.L_L_Disc_Rate="";
      if((( this.temp_data.Disc_per>0 ) && ( this.temp_data.Disp=='Per')))
      {
        this.L_L_Disc_Rate =this.temp_data.Disc_per+"%";



      }else if(((this.temp_data.Disc_per>0) && (this.temp_data.Disp=='Amt')))
      {
         this.L_L_Disc_Rate = this.temp_data.Disc_Amt;
      
      }

     if( ((this.temp_data.Landing_Cost)>(this.temp_data.Last_Rate) &&   (this.temp_data.Last_Rate)!=0 ))
     {
      this.L_L_Disc_Rate +='(-)'
     }

     if( (this.temp_data.Landing_Cost)<(this.temp_data.Last_Rate) &&   (this.temp_data.Last_Rate)!=0 )
     {
      this.L_L_Disc_Rate +='(+)'
     }



      this.get_by_Code(this.temp_data.ID, type)
    } catch { }
  }


  get_by_Code(data, type) {


  
    if (data == "" || data == null) {
      return;
    }


    if (type == "Code") {

      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.Item_Code == data)[0];
      $(".code1").focus();

    } else {
      this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.ID == data)[0];
    }



    try {
      this.appservice.Sales_Temp_Row.sal_prod_id = this.temp_data.ID;
      this.appservice.Sales_Temp_Row.sal_prod_code = this.temp_data.Item_Code;
      this.appservice.Sales_Temp_Row.sal_prod_name = this.temp_data.Item_Name;
      this.appservice.Sales_Temp_Row.sal_description = this.temp_data.Description;
      this.appservice.Sales_Temp_Row.sal_uom = this.temp_data.UOM;
      this.appservice.Sales_Temp_Row.sal_hsn_code = this.temp_data.HSN_Code;
      this.appservice.Sales_Temp_Row.sal_mrp = this.temp_data.MRP;
      this.appservice.Sales_Temp_Row.sal_gst_per = this.temp_data.GST_Per;
      this.appservice.Sales_Temp_Row.User_ = this.appservice.CREATED_BY;
      this.appservice.Sales_Temp_Row.Scheme = this.L_L_Disc_Rate;

      var Rate_From = "Cutomer_Rate";

      try {
        Rate_From = this.appservice.header_Row.Rate_From;
      }
      catch {
        Rate_From = "Cutomer_Rate"
      }

      if (Rate_From == null || Rate_From == "" || Rate_From == undefined) {
        Rate_From = "Cutomer_Rate"
      }



      if (Rate_From.toLowerCase() == "retail_rate") {
        this.appservice.Sales_Temp_Row.sal_wholesale_rate = this.temp_data.Wholesale_Rate;
      }
      else if (Rate_From.toLowerCase() == "builder_rate") {
        this.appservice.Sales_Temp_Row.sal_rate = this.temp_data.Builder_Rate;
      }
      else {
        this.appservice.Sales_Temp_Row.sal_rate = this.temp_data.Rate;
      }

      this.appservice.Sales_Temp_Row.Pcs = "";

      this.appservice.Sales_Temp_Row.sal_disc_per = "0";
      this.appservice.Sales_Temp_Row.sal_disc_amt = "0";
      this.appservice.Sales_Temp_Row.sal_free = "0";

      if (this.appservice.Stockbase_Sales == false) {
        var Stock_Row = [];
        this.appservice.get("Api/Invoice/get_Stock_by_Item_ID?Item_ID=" + this.temp_data.ID).subscribe((res: any) => {
          Stock_Row = JSON.parse(res).record;
          try {
            this.appservice.Sales_Temp_Row.sal_stock = Stock_Row[0]["Qty"];
            this.appservice.Sales_Temp_Row.sal_uni_code = Stock_Row[0]["Uni_Code"];
            this.appservice.Sales_Temp_Row.Landing_Cost = Stock_Row[0]["Landing_Cost"];

           
          } catch {

            this.appservice.Sales_Temp_Row.sal_stock = 0;
            this.appservice.Sales_Temp_Row.sal_uni_code = 0;
            this.appservice.Sales_Temp_Row.Landing_Cost = 0;
          }


        });
      }
      else {



        this.appservice.Sales_Temp_Row.sal_stock = this.L_Stock;
        this.appservice.Sales_Temp_Row.sal_uni_code = this.L_Uni_Code;
        this.appservice.Sales_Temp_Row.Landing_Cost = this.L_Landing_Cost;

        this.appservice.Sales_Temp_Row.L_Rate = this.L_L_Rate;
        this.appservice.Sales_Temp_Row.Purchase_Rate = this.L_Landing_Cost;
       



      }


    } catch { }



    // if (Number(this.temp_data.Rate) > 0) {
    //   this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.temp_data.MRP) * Number(this.temp_data.Box_Qty)) / Number(this.temp_data.Rate)) * 100) - 100).toFixed(2);
    // }
    // else {
    //   this.appservice.Sales_Temp_Row.MRP_Disc_Per = 0;
    // }

    this.calc_tempdata();



  }


  x: string = ""
  out() {


    try {

      this.x = "" + this.x.length;
      this.x = this.appservice.Sales_Temp_Row.sal_prod_name;
    } catch { this.x = ""; }



    if (this.x == "1" || this.x == "0" || this.x == "" || this.x == "undefined" || this.x == null) {
      $(".code1").focus();
      return;
    }
    else {
      

      if(this.appservice.check_Unicode==true)
      {

      if (this.check_duplicate(this.appservice.Sales_Temp_Row) == true ) {
        this.temp_data = {};
        this.appservice.Sales_Temp_Row.sal_prod_name = "";
        this.appservice.Sales_Temp_Row = {};
        $(".code1").focus();
        // console.log(  this.appservice.Sales_Temp_Row);
        return;
      }
    }

    }

    var i: Number = 0;
    try {
      i = this.appservice.Sales_Temp_Row.sal_qty;
    }
    catch { i = 0; }

    if (i == 0) {
      $(".c_qty").focus();
      return;
    }

  }


  validate_Stcok(data): boolean {


    if ((Number(data.sal_qty)+Number(data.sal_free)) > Number(data.sal_stock)) {
      this.toastr.error("More than Stock Qty Not allowed", "Error", { timeOut: 3000 });

      return true;
    }

    return false;

  }




  place_holder = "Type Item Name here..";
  calc_tempdata() {

     

  //  if( this.appservice.Stock_Check == true)
  //   {
  //     if(this.validate_Stcok(this.appservice.Sales_Temp_Row)) {
  //       this.appservice.Sales_Temp_Row.Pcs = 0;
  //       this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));
  //       this.appservice.Sales_Temp_Row.Pcs = "";
  //       return;
  //     }
  //   }

    // this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));



    // var Disc_Type = "percentage";
    // try {
    //   Disc_Type = this.appservice.header_Row.Disc_Type;
    // }
    // catch {
    //   Disc_Type = "percentage"
    // }

    // if (String(Disc_Type).toLowerCase() == "amount") {

    //   this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);

     // console.log((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty))/ Number(this.appservice.Sales_Temp_Row.Unit_Price));

     // this.appservice.Sales_Temp_Row.Disc_Per = (((Number(this.appservice.Sales_Temp_Row.Disc_Amt)/Number(this.appservice.Sales_Temp_Row.Qty)) / Number(this.appservice.Sales_Temp_Row.Unit_Price)) / 100).toFixed(2);

    // }
    // else {
      this.appservice.Sales_Temp_Row.sal_disc_amt = (((Number(this.appservice.Sales_Temp_Row.sal_rate) / 100) * Number(this.appservice.Sales_Temp_Row.sal_disc_per)));
    // }


    this.appservice.Sales_Temp_Row.Total_Disc_Amt = (Number(this.appservice.Sales_Temp_Row.sal_disc_amt) * Number(this.appservice.Sales_Temp_Row.sal_qty)).toFixed(2);

    this.appservice.Sales_Temp_Row.sal_final_price = (Number(this.appservice.Sales_Temp_Row.sal_rate) - Number(this.appservice.Sales_Temp_Row.sal_disc_amt));


  //   if( this.appservice.Stockbase_Sales == true)
  //   {
  //   if(this.validate_Stcok(this.appservice.Sales_Temp_Row)) {
  //     this.appservice.Sales_Temp_Row.Pcs = 0;
  //     this.appservice.Sales_Temp_Row.Qty = (Number(this.appservice.Sales_Temp_Row.Pcs) * Number(this.appservice.Sales_Temp_Row.Bag_Qty));
  //     this.appservice.Sales_Temp_Row.Pcs = "";
  //     return;
  //   }
  // }


    var GST_Type = "local";
    try {
      GST_Type = this.appservice.header_Row.GST_Type;
    }
    catch {
      GST_Type = "local"
    }


    if (String(GST_Type).toLowerCase() == "intra") {

      this.appservice.Sales_Temp_Row.sal_sgst_per = "0.00";
      this.appservice.Sales_Temp_Row.sal_cgst_per = "0.00";
      this.appservice.Sales_Temp_Row.sal_igst_per = this.appservice.Sales_Temp_Row.sal_gst_per;

    }
    else {
      this.appservice.Sales_Temp_Row.sal_sgst_per = (Number(this.appservice.Sales_Temp_Row.sal_gst_per) / 2).toFixed(2);
      this.appservice.Sales_Temp_Row.sal_cgst_per = (Number(this.appservice.Sales_Temp_Row.sal_gst_per) / 2).toFixed(2);
      this.appservice.Sales_Temp_Row.sal_igst_per = "0.00";

    }


/*

    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.Disc_Type;
    }
    catch {
      Disc_Type = "percentage"
    }

    if (String(Disc_Type).toLowerCase() == "amount") {
      this.appservice.Sales_Temp_Row.Disc_Per = ((Number(this.appservice.Sales_Temp_Row.Disc_Amt) / Number(this.appservice.Sales_Temp_Row.Unit_Price)) / 100).toFixed(4);

    }
    else {
      this.appservice.Sales_Temp_Row.Disc_Amt = (((Number(this.appservice.Sales_Temp_Row.Unit_Price) / 100) * Number(this.appservice.Sales_Temp_Row.Disc_Per))).toFixed(4);
    }


    this.appservice.Sales_Temp_Row.Total_Disc_Amt = (Number(this.appservice.Sales_Temp_Row.Disc_Amt) * Number(this.appservice.Sales_Temp_Row.Qty)).toFixed(2);

    this.appservice.Sales_Temp_Row.Final_Price = (Number(this.appservice.Sales_Temp_Row.Unit_Price) - Number(this.appservice.Sales_Temp_Row.Disc_Amt)).toFixed(2);
*/
    var Tax_Type = this.appservice.Tax_Type;
    try {
      Tax_Type = this.appservice.header_Row.sal_tax_type;
    }
    catch {
      Tax_Type = "exclusive"
    }

    if (String(Tax_Type).toLowerCase() == "inclusive") {

      this.appservice.Sales_Temp_Row.sal_final_price = (
        (
          ((Number(this.appservice.Sales_Temp_Row.sal_rate) - Number(this.appservice.Sales_Temp_Row.sal_disc_amt))
            /
            (100 + Number(this.appservice.Sales_Temp_Row.sal_gst_per))
          )
          * 100
        )).toFixed(2);


    }
    this.appservice.Sales_Temp_Row.sal_sub_total = (Number(this.appservice.Sales_Temp_Row.sal_final_price) * Number(this.appservice.Sales_Temp_Row.sal_qty)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_gst_amt = ((Number(this.appservice.Sales_Temp_Row.sal_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.sal_gst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_igst_amt = ((Number(this.appservice.Sales_Temp_Row.sal_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.sal_igst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_cgst_amt = ((Number(this.appservice.Sales_Temp_Row.sal_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.sal_cgst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_sgst_amt = ((Number(this.appservice.Sales_Temp_Row.sal_sub_total) / 100) * Number(this.appservice.Sales_Temp_Row.sal_sgst_per)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_taxable_amount = (Number(this.appservice.Sales_Temp_Row.sal_sub_total) - Number(this.appservice.Sales_Temp_Row.sal_disc_amt)).toFixed(2);
    this.appservice.Sales_Temp_Row.sal_net_amt = ((Number(this.appservice.Sales_Temp_Row.sal_sub_total) + Number(this.appservice.Sales_Temp_Row.sal_gst_amt))).toFixed(2);


    var q =(Number( this.appservice.Sales_Temp_Row.sal_qty)+Number( this.appservice.Sales_Temp_Row.sal_free));
    // this.appservice.Sales_Temp_Row.Profit=(Number( this.appservice.Sales_Temp_Row.sal_net_amt) - ( Number( this.appservice.Sales_Temp_Row.Landing_Cost)*q )).toFixed(2);

    


    // if (Number(this.appservice.Sales_Temp_Row.Unit_Price) > 0) {
    //   this.appservice.Sales_Temp_Row.MRP_Disc_Per = ((((Number(this.appservice.Sales_Temp_Row.MRP) * Number(this.appservice.Sales_Temp_Row.Box_Qty)) / Number(this.appservice.Sales_Temp_Row.Unit_Price)) * 100) - 100).toFixed(2);
    // }
    // else {
    //   this.appservice.Sales_Temp_Row.MRP_Disc_Per = 0;
    // }


  }


  calc_details_Row(row) {


    // this.appservice.Details_Row[row].Qty = (Number(this.appservice.Details_Row[row].Pcs) * Number(this.appservice.Details_Row[row].Bag_Qty));


  //   if( this.appservice.Stockbase_Sales == true)
  //   {

  //   if (this.validate_Stcok(this.appservice.Details_Row[row]) ) {

  //     this.appservice.Details_Row[row].Pcs = 0;
  //     this.appservice.Details_Row[row].Qty = (Number(this.appservice.Details_Row[row].Pcs) * Number(this.appservice.Details_Row[row].Bag_Qty));
  //     this.appservice.Details_Row[row].Pcs = "";
  //     return;
  //   }
  // }

    var GST_Type = "local";
    try {
      GST_Type = this.appservice.header_Row.GST_Type;
    }
    catch {
      GST_Type = "local"
    }


    if (String(GST_Type).toLowerCase() == "intra") {

      this.appservice.Details_Row[row].sal_sgst_per = "0.00";
      this.appservice.Details_Row[row].sal_cgst_per = "0.00";
      this.appservice.Details_Row[row].sal_igst_per = this.appservice.Details_Row[row].sal_gst_per;

    }
    else {
      this.appservice.Details_Row[row].sal_sgst_per = (Number(this.appservice.Details_Row[row].sal_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].sal_cgst_per = (Number(this.appservice.Details_Row[row].sal_gst_per) / 2).toFixed(2);
      this.appservice.Details_Row[row].sal_igst_per = "0.00";
    }



    

    // this.appservice.Details_Row[row].Qty = (Number(this.appservice.Details_Row[row].Pcs) * Number(this.appservice.Details_Row[row].Bag_Qty));

    // var Disc_Type = "percentage";
    // try {
    //   Disc_Type = this.appservice.header_Row.Disc_Type;
    // }
    // catch {
    //   Disc_Type = "percentage"
    // }

    // if (String(Disc_Type).toLowerCase() == "amount") {
    //   this.appservice.Details_Row[row].Disc_Amt = ((Number(this.appservice.Details_Row[row].Disc_Per) / Number(this.appservice.Details_Row[row].Qty)));
    //  // this.appservice.Sales_Temp_Row.Disc_Amt=Number(this.appservice.Sales_Temp_Row.Disc_Per)/Number(this.appservice.Sales_Temp_Row.Qty);



    // }
    // else {
      this.appservice.Details_Row[row].sal_disc_amt = (((Number(this.appservice.Details_Row[row].sal_rate) / 100) * Number(this.appservice.Details_Row[row].sal_disc_per)));
    // }


    this.appservice.Details_Row[row].Total_Disc_Amt = (Number(this.appservice.Details_Row[row].sal_disc_amt) * Number(this.appservice.Details_Row[row].sal_qty)).toFixed(2);



    this.appservice.Details_Row[row].sal_final_price = (Number(this.appservice.Details_Row[row].sal_rate) - Number(this.appservice.Details_Row[row].sal_disc_amt));

    var Tax_Type = this.appservice.Tax_Type;
     try {
       Tax_Type = this.appservice.header_Row.sal_tax_type;
     }
     catch {
       Tax_Type = "exclusive"
     }


    if (String(Tax_Type).toLowerCase() == "inclusive") {

      this.appservice.Details_Row[row].sal_final_price = (
        (
          ((Number(this.appservice.Details_Row[row].sal_rate) - Number(this.appservice.Details_Row[row].sal_disc_amt))
            /
            (100 + Number(this.appservice.Details_Row[row].sal_gst_per))
          )
          * 100
        )).toFixed(2);


    }
    this.appservice.Details_Row[row].sal_sub_total = (Number(this.appservice.Details_Row[row].sal_final_price) * Number(this.appservice.Details_Row[row].sal_qty)).toFixed(2);
    this.appservice.Details_Row[row].sal_taxable_amount = (Number(this.appservice.Details_Row[row].sal_sub_total) - Number(this.appservice.Details_Row[row].sal_disc_amt)).toFixed(2);
    this.appservice.Details_Row[row].sal_gst_amt = ((Number(this.appservice.Details_Row[row].sal_sub_total) / 100) * Number(this.appservice.Details_Row[row].sal_gst_per)).toFixed(2);
    this.appservice.Details_Row[row].sal_igst_amt = ((Number(this.appservice.Details_Row[row].sal_sub_total) / 100) * Number(this.appservice.Details_Row[row].sal_igst_per)).toFixed(2);
    this.appservice.Details_Row[row].sal_cgst_amt = ((Number(this.appservice.Details_Row[row].sal_sub_total) / 100) * Number(this.appservice.Details_Row[row].sal_cgst_per)).toFixed(2);
    this.appservice.Details_Row[row].sal_sgst_amt = ((Number(this.appservice.Details_Row[row].sal_sub_total) / 100) * Number(this.appservice.Details_Row[row].sal_sgst_per)).toFixed(2);
    this.appservice.Details_Row[row].sal_net_amt = ((Number(this.appservice.Details_Row[row].sal_sub_total) + Number(this.appservice.Details_Row[row].sal_gst_amt))).toFixed(2);


    // if (Number(this.appservice.Details_Row[row].Unit_Price) > 0) {
    //   this.appservice.Details_Row[row].MRP_Disc_Per = ((((Number(this.appservice.Details_Row[row].MRP) * Number(this.appservice.Details_Row[row].Box_Qty)) / Number(this.appservice.Details_Row[row].Unit_Price)) * 100) - 100).toFixed(2);
    // }
    // else {
    //   this.appservice.Details_Row[row].MRP_Disc_Per = 0;
    // }


    
    var q =(Number(this.appservice.Details_Row[row].sal_qty)+Number( this.appservice.Details_Row[row].sal_free));
    // this.appservice.Details_Row[row].Profit=(Number(this.appservice.Details_Row[row].sal_net_amt) - ((Number(this.appservice.Details_Row[row].Landing_Cost)*q ))).toFixed(2);

    // console.log(this.appservice.Details_Row[row].Profit);

    this.Calc_Sum();
  }

  get_Bill_No() {
    this.appservice.get("Api/Invoice/get_Sales_No?Bill_Type=Sales").subscribe((res: any) => {
      this.appservice.header_Row.sal_no = res;
    });
    if (this.appservice.isEdit == false || this.appservice.load_from_make_invoice == true) {

      if (this.appservice.Type_Based_Bill_No == true) {
        var Bill_Type = "Tax Invoice";
        try {
          Bill_Type = this.appservice.header_Row.sal_bill_type;
        }
        catch {
          Bill_Type = "Tax Invoice"
        }
        if (this.appservice.header_Row.sal_bill_type == null || this.appservice.header_Row.sal_bill_type == undefined || this.appservice.header_Row.sal_bill_type == "") {
          Bill_Type = "Tax Invoice"

        }

        if (Bill_Type == "Tax Invoice") {
          this.appservice.header_Row.sal_gstin = this.GST_No;
        }
        else {
          this.appservice.header_Row.sal_gstin = "";
        }

        this.appservice.get("Api/Invoice/get_Bill_No?Bill_Type=" + Bill_Type).subscribe((res: any) => {

          this.appservice.header_Row.sal_bill_no = res;
        });



      }
      else {
        this.appservice.get("Api/Invoice/get_Bill_No?Bill_Type=Tax Invoice").subscribe((res: any) => {
          this.appservice.header_Row.sal_bill_no = res;
        });
      }
    }
  }
  Customer_Balance=[];
  public Bill_Amt=0;
  public Due_Amt=0;
  Close_Customer_Module()
  {
    $('#Customer_Module').modal('hide');
  }
public Ledger_Name;
public Phone_Number;
public Ledger_ID;

  Open_Customer_Module(data)
  {
      this.Ledger_Name=data.sal_ledger_name;
      this.Phone_Number=data.Contact_No;
      this.Ledger_ID=data.Ledger_ID;

      this.Due_Amt=0;
      this.appservice.get("Api/Collection_/get_os_bills?ID="+data.Ledger_ID).subscribe(( res: any) => {
      this.Customer_Balance = JSON.parse(res).record;
      this.Bill_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Bill_Amount), 0)).toFixed(2);
      this.Due_Amt = (this.Customer_Balance.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);
   
      });
    

    $('#Customer_Module').modal('show');
  }
  Close_Customer_Module1()
  {
    $('#Customer_Module1').modal('hide');
  }
  Customer_Pending_pdf(data) {


    window.open(this.appservice.Server_URL + "report/Print_Customer_Pending?ID=" + data + "&Company=" + this.appservice.Company, "_blank");

  }
  Uni_Code_ID;

  Uni_Code_Purchase=[];
  Uni_Code_Sales=[];

  Open_Customer_Module1(data)
  {
 
      this.Uni_Code_ID=data.Uni_Code;
      this.appservice.get("Api/Invoice/get_Uni_Code?ID="+this.Uni_Code_ID).subscribe(( res: any) => {
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

  export_excel()
  {
 
   this.appservice.Excel_Data.Header=this.appservice.Ledger_Pending_Export;
   this.appservice.Excel_Data.items=this.Customer_Balance
   this.appservice.Excel_Data.Report_Name="Ledger Pending"
   this.appservice.export_excel();
 
  }
  check_duplicate(data): boolean {

    var index = this.appservice.Details_Row.findIndex(function (item, i) {
      return item.Uni_Code === data.Uni_Code
    });
    if (index >= 0) {
      this.temp_data = {}
      data = {};
      this.appservice.Sales_Temp_Row.sal_prod_name = "";
      this.appservice.Sales_Temp_Row = {};
      this.toastr.error("Same item already added", "Error", { timeOut: 3000 });
      return true;
    }
    return false;
  }


  check()
  {
   
  }

  add_data(data) {




    if (Number(data.sal_qty) > 0) {

      
      this.appservice.Details_Row.push(data);
      this.Calc_Sum();
      this.appservice.Sales_Temp_Row = {};
      this.temp_data={};
      this.appservice.lable_="+";
      $(".code1").focus();
    }

  }

  get_Purchase(data)
  {

  }
  Calc_Sum() {
    
    var len = 0;
    len = this.appservice.Details_Row.length;
    this.appservice.header_Row.sal_sub_total = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.sal_qty) * parseFloat(current.sal_rate)), 0)).toFixed(2);
    //this.appservice.header_Row.Disc_Per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Disc_Per), 0)) / len).toFixed(2);
    this.appservice.header_Row.sal_disc_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.sal_qty) * parseFloat(current.sal_disc_amt)), 0)).toFixed(2);
    this.appservice.header_Row.sal_taxable_amount = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_taxable_amount), 0)).toFixed(2);
    this.appservice.header_Row.sal_gst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_gst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.sal_gst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_gst_amt), 0)).toFixed(2);
    this.appservice.header_Row.sal_igst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_igst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.sal_sgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_sgst_per), 0)) / len).toFixed(2);
    this.appservice.header_Row.sal_cgst_per = ((this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_cgst_per), 0)) / len).toFixed(2);

    this.appservice.header_Row.sal_igst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_igst_amt), 0)).toFixed(2);
    this.appservice.header_Row.sal_sgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_sgst_amt), 0)).toFixed(2);
    this.appservice.header_Row.sal_cgst_amt = (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_cgst_amt), 0)).toFixed(2);





    var GST_Type = "local";
    try {
      GST_Type = this.appservice.header_Row.GST_Type;
    }
    catch {
      GST_Type = "local"
    }



    // if (String(GST_Type).toLowerCase() == "intra") {

    //   var PF_Tax = ((parseFloat(this.appservice.header_Row.PF_Amt) / 100) * (parseFloat(this.appservice.header_Row.PF_Per))).toFixed(2);
    //   var Freight_Tax = ((parseFloat(this.appservice.header_Row.Freight_Amt) / 100) * (parseFloat(this.appservice.header_Row.Freight_Per))).toFixed(2);
    //   this.appservice.header_Row.IGST_Amt = (parseFloat(this.appservice.header_Row.IGST_Amt) + parseFloat(PF_Tax) + parseFloat(Freight_Tax)).toFixed(2);
      

    // }
    // else {


    //   var PF_Tax = ((parseFloat(this.appservice.header_Row.PF_Amt) / 100) * (parseFloat(this.appservice.header_Row.PF_Per) / 2)).toFixed(2);
    //   var Freight_Tax = ((parseFloat(this.appservice.header_Row.Freight_Amt) / 100) * (parseFloat(this.appservice.header_Row.Freight_Per) / 2)).toFixed(2);

    //   this.appservice.header_Row.CGST_Amt = (parseFloat(this.appservice.header_Row.CGST_Amt) + parseFloat(Freight_Tax) + parseFloat(PF_Tax)).toFixed(2);
    //   this.appservice.header_Row.SGST_Amt = (parseFloat(this.appservice.header_Row.SGST_Amt) + parseFloat(Freight_Tax) + parseFloat(PF_Tax)).toFixed(2);

    // }

    // var PF_Tax = ((parseFloat(this.appservice.header_Row.PF_Amt) / 100) * (parseFloat(this.appservice.header_Row.PF_Per))).toFixed(2);
    // var T_PF = (parseFloat(this.appservice.header_Row.PF_Amt) + parseFloat(PF_Tax)).toFixed(2);

    // var Freight_Tax = ((parseFloat(this.appservice.header_Row.Freight_Amt) / 100) * (parseFloat(this.appservice.header_Row.Freight_Per))).toFixed(2);
    // var T_Freight = (parseFloat(this.appservice.header_Row.Freight_Amt) + parseFloat(Freight_Tax)).toFixed(2);


    //this.appservice.header_Row.sal_net_amt = Math.round((parseFloat(T_Freight) + parseFloat(T_PF) + parseFloat(this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_net_amt), 0)))).toFixed(2);

    this.appservice.header_Row.sal_net_amt = Math.round((parseFloat(this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.sal_net_amt), 0)))).toFixed(2);


    
    // for(var row=0;row<this.appservice.Details_Row.length;row++)
    // {
    // var q =(Number(this.appservice.Details_Row[row].Qty)+Number( this.appservice.Details_Row[row].Free));
    // this.appservice.Details_Row[row].Profit=(Number(this.appservice.Details_Row[row].Net_Amt) - ((Number(this.appservice.Details_Row[row].Landing_Cost)*q ))).toFixed(2);
    // }


    //this.appservice.header_Row.Profit =  (this.appservice.Details_Row.reduce((sum, current) => sum + parseFloat(current.Profit), 0)).toFixed(2);
    

    this.stock_Update();
  }


  public stock_Update() {
    for (var i = 0; i < this.appservice.Details_Row.length; i++) {

      try {
        var U_code = this.appservice.Details_Row[i]["Uni_Code"];

        var index = this.Stock_Row.findIndex(function (item, i) {
          return item.Uni_Code == U_code
        });


        this.Stock_Row[index]["Stock"] = (Number(this.Stock_Row[index]["Stock1"]) - Number(this.appservice.Details_Row[i]["Qty"])- Number(this.appservice.Details_Row[i]["Free"])).toString();
      } catch { }
    }

  }
  next() {
    var name = "";
    try {
      name = this.appservice.header_Row.sal_ledger_name.toLowerCase();

    }
    catch { }

    if (name == "") {
      this.toastr.error("Please Select Customer", "Error", { timeOut: 3000 });
      return;

    }
    else {
      this.appservice.load_page1('/add-item1');
    }

  }


  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  isload: boolean = false;


  get_customers() {
    this.appservice.Ledger_Type = "1";
    this.appservice.Cus_Type="Customer";
    this.appservice.S_Area="Billing Customer";
    return this.router.navigate(['/customer-search']);

  }

  Valid: boolean = true;
  Place_Order() {

    this.appservice.header_Row.Company = this.appservice.Company;
    this.appservice.header_Row.Created_by = this.appservice.CREATED_BY;
    this.appservice.header_Row.items = this.appservice.Details_Row;
    this.appservice.header_Row.Type_Based_Bill_No = this.appservice.Type_Based_Bill_No;
    this.appservice.header_Row.Ledger_Update = this.appservice.Ledger_Update;
    this.appservice.header_Row.ColumnPerfix = "sal_";

    this.Valid = true;
    this.appservice.get_fields_of('Sales').forEach((data) => {
      this.addForm.submitted = true;
      if (data.Validate == "True" && this.appservice.header_Row[data.Field] == "") {
        this.Valid = false;
      }

    });


    this.appservice.header_Row.R_Type = this.R_Type;

    
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


    if (this.Valid) {
      this.btndisable = true;
      this.http.post(this.appservice.Server_URL + 'api/Invoice/Post_Sales', this.appservice.header_Row, { headers: this.headers })
        .subscribe(
          (val: string) => {
            this.btndisable = false;
            if (val == "True") {
              this.toastr.success("Submtted Successfully", 'Msg');

           
              if (this.appservice.Save_Print== true) {

               // this.appservice.Bill_Format=="Receipt_2inch"
                this.appservice.open_pdf(this.appservice.header_Row)

              }
              


              this.appservice.isEdit = false;
              this.appservice.from_customer_page =false;
              this.appservice.get_Sale_Details();
              this.appservice.header_Row = {};
              this.appservice.Details_Row = [];
              this.appservice.Temp_Order_Row = [];
              this.appservice.back();
              this.appservice.load_from_make_invoice = false;

              this.appservice.Sales_Temp_Row = {};
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