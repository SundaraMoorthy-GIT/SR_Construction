import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  Category_ = "All";
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    appservice.item_Category_="All"
  }


  get_filter_data() {

    this.get_Items(this.appservice.item_Category_);

  }

  Category="";
  get_Items(data) {
    this.Category = data;

    console.log(data);
    console.log(this.appservice.Perment_Item_Master_Row.filter(e => e.Category == data));
    if (data == "All") {
      this.appservice.Item_Master_Rows = this.appservice.Perment_Item_Master_Row;

    }
    else {
      this.appservice.Item_Master_Rows = this.appservice.Perment_Item_Master_Row.filter(e => String(e.Category).toLowerCase() == String(data).toLowerCase());
    }
  }

  txt_search = "";
  ngOnInit(): void {
  }


  public rows = [];
  public add: any = {};

  Total = "0.00";


  add_One(data)
  {
    data.Order_Qty=Number(data.Order_Qty)+1;
    this.add_row(data);
  }

  remove_One(data)
  {
    data.Order_Qty=Number(data.Order_Qty)-1;
    this.add_row(data);
  }
  Search_text_="";


  search_data(data)
  {
    if (data == "") {
      this.appservice.Item_Master_Rows=this.appservice.Perment_Item_Master_Row;
  
     }
     else {
      this.appservice.Item_Master_Rows=this.appservice.Perment_Item_Master_Row;
      this.appservice.Item_Master_Rows=this.appservice.Perment_Item_Master_Row.filter(e => e.Item_Name.toLowerCase().includes(data.toLocaleLowerCase()));
     }
  }
  add_row(data) {


    data.Order_Rate=data.Rate;
    var index = this.appservice.Temp_Order_Row.findIndex(function (item, i) {
      return (item.ID == data.ID)
    });


    if (index > -1) {
      this.appservice.Temp_Order_Row.splice(index, 1);
    }
    this.Total = (this.appservice.Temp_Order_Row.reduce((sum, current) => sum + ((parseFloat(current.Order_Qty)) * (parseFloat(current.Order_Rate))), 0)).toFixed(2);



    if (data.Order_Qty == "") {
      data.error = "";
      return;
    }


    if (Number(data.Order_Qty) == 0) {
      data.error = "";
      return;
    }


    if (Number(data.Order_Qty) < 0) {
      data.error = "Not Valid Qty ";
      return;
    }


    data.error = "";


    if (Number(data.Order_Qty) > 0 && Number(data.Order_Rate) > 0) {
      this.appservice.Temp_Order_Row.push(data);

    }

    this.Total = (this.appservice.Temp_Order_Row.reduce((sum, current) => sum + ((parseFloat(current.Order_Qty)) * (parseFloat(current.Order_Rate))), 0)).toFixed(2);


  }

  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  isload: boolean = false;



  next() {

    this.appservice.Details_Row=[];
    for (var i = 0; i < this.appservice.Temp_Order_Row.length; i++) {

      this.get_by_Code(this.appservice.Temp_Order_Row[i]["ID"], this.appservice.Temp_Order_Row[i]["Order_Qty"], this.appservice.Temp_Order_Row[i]["Order_Rate"], this.appservice.Temp_Order_Row[i]["Uni_Code"], this.appservice.Temp_Order_Row[i]["Landing_Cost"]);
    }
    this.appservice.isadd_Page=true;
    this.appservice.back();

  }
  temp_data: any = {};

  get_by_Code(data, Qty, Rate, Uni_Code, Landing_Cost) {
debugger
    var Sales_Temp_Row: any = {};
    this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.ID == data)[0];


    try {
      
    Sales_Temp_Row.dc_prod_id = this.temp_data.ID;
    Sales_Temp_Row.dc_prod_code = this.temp_data.Item_Code;
    Sales_Temp_Row.dc_prod_name = this.temp_data.Item_Name;
    Sales_Temp_Row.dc_uom = this.temp_data.UOM;
    Sales_Temp_Row.dc_hsn_code = this.temp_data.HSN_Code;
    Sales_Temp_Row.dc_mrp = this.temp_data.MRP;

    Sales_Temp_Row.Sales_Qty = "0";
    
    var Bill_Type = "Tax Invoice";
    try {
      Bill_Type = this.appservice.header_Row.dc_bill_type;
    }
    catch {
      Bill_Type = "Tax Invoice"
    }

    if (String(Bill_Type).toLowerCase() != "tax invoice") {
      
      Sales_Temp_Row.dc_gst_per = "0";  
    }
    else
    {
  
    Sales_Temp_Row.dc_gst_per = this.temp_data.GST_Per;
    }

    Sales_Temp_Row.dc_rate = Rate;

    Sales_Temp_Row.dc_qty =Qty;

    Sales_Temp_Row.dc_disc_per = "0";
    Sales_Temp_Row.dc_disc_amt = "0";
    Sales_Temp_Row.dc_free = "0";
    Sales_Temp_Row.dc_tcs_per = "0.00";
    Sales_Temp_Row.dc_tcs_amt = "0.00";

    Sales_Temp_Row.dc_stock=0;

    Sales_Temp_Row.dc_wholesale_rate =  this.temp_data.Rate;
    Sales_Temp_Row.dc_sale_rate = this.temp_data.Rate;
      Sales_Temp_Row.dc_uni_code = Uni_Code;
      Sales_Temp_Row.Disc_Per = "0";
      Sales_Temp_Row.Disc_Amt = "0";
      Sales_Temp_Row.Free = "0";
      Sales_Temp_Row.Landing_Cost ="0";

      var GST_Type = "local";
      try {
        GST_Type = this.appservice.header_Row.GST_Type;
      }
      catch {
        GST_Type = "local"
      }


      if (String(GST_Type).toLowerCase() == "intra") {

        Sales_Temp_Row.dc_sgst_per = "0.00";
        Sales_Temp_Row.dc_cgst_per = "0.00";
        Sales_Temp_Row.dc_igst_per = Sales_Temp_Row.dc_gst_per;

      }
      else {
        Sales_Temp_Row.dc_sgst_per = (Number(Sales_Temp_Row.dc_gst_per) / 2).toFixed(2);
        Sales_Temp_Row.dc_cgst_per = (Number(Sales_Temp_Row.dc_gst_per) / 2).toFixed(2);
        Sales_Temp_Row.dc_igst_per = "0.00";

      }
    
    var Disc_Type = "percentage";
    try {
      Disc_Type = this.appservice.header_Row.Disc_Type;
    }
    catch {
      Disc_Type = "percentage"
    }
       Sales_Temp_Row.dc_disc_amt = (((Number(Sales_Temp_Row.dc_rate) / 100) * Number(Sales_Temp_Row.dc_disc_per)));
     Sales_Temp_Row.dc_total_disc_amt = (Number(Sales_Temp_Row.dc_disc_amt) * Number(Sales_Temp_Row.dc_qty)).toFixed(2);
    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.appservice.header_Row.dc_tax_type;
    }
    catch {
      Tax_Type = "exclusive"
    }


    if (String(Tax_Type).toLowerCase() == "inclusive") {

      Sales_Temp_Row.dc_final_price = (
        (
          ((Number(Sales_Temp_Row.dc_rate) - Number(Sales_Temp_Row.dc_disc_amt))
            /
            (100 + Number(Sales_Temp_Row.dc_gst_per))
          )
          * 100
        ));


    }
    Sales_Temp_Row.dc_sub_total = (Number(Sales_Temp_Row.dc_final_price) * Number(Sales_Temp_Row.dc_qty)).toFixed(2);
    Sales_Temp_Row.dc_gst_amt = ((Number(Sales_Temp_Row.dc_sub_total) / 100) * Number(Sales_Temp_Row.dc_gst_per)).toFixed(2);
    Sales_Temp_Row.dc_igst_amt = ((Number(Sales_Temp_Row.dc_sub_total) / 100) * Number(Sales_Temp_Row.dc_igst_per)).toFixed(2);
    Sales_Temp_Row.dc_cgst_amt = ((Number(Sales_Temp_Row.dc_sub_total) / 100) * Number(Sales_Temp_Row.dc_cgst_per)).toFixed(2);
    Sales_Temp_Row.dc_sgst_amt = ((Number(Sales_Temp_Row.dc_sub_total) / 100) * Number(Sales_Temp_Row.dc_sgst_per)).toFixed(2);
    Sales_Temp_Row.dc_taxable_amount = (Number(Sales_Temp_Row.dc_sub_total) ).toFixed(2);
    Sales_Temp_Row.dc_tcs_amt="0";
    Sales_Temp_Row.dc_net_amt = ((Number(Sales_Temp_Row.dc_sub_total)+Number( Sales_Temp_Row.dc_tcs_amt) + Number(Sales_Temp_Row.dc_gst_amt))).toFixed(2);

      
      this.appservice.Details_Row.push(Sales_Temp_Row);
      Sales_Temp_Row = {};


    } catch { }

  }
}
