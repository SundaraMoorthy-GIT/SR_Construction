import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-items1',
  templateUrl: './add-items1.component.html',
  styleUrls: ['./add-items1.component.scss']
})
export class AddItems1Component {


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

    var Sales_Temp_Row: any = {};
    this.temp_data = this.appservice.Item_Master_Rows.filter(e => e.ID == data)[0];


    try {
      Sales_Temp_Row.sal_prod_id = this.temp_data.ID;
      Sales_Temp_Row.sal_prod_code = this.temp_data.Item_Code;
      Sales_Temp_Row.sal_prod_name = this.temp_data.Item_Name;
      Sales_Temp_Row.sal_description = this.temp_data.Description;
      Sales_Temp_Row.sal_uom = this.temp_data.UOM;
      Sales_Temp_Row.sal_hsn_code = this.temp_data.HSN_Code;
      Sales_Temp_Row.sal_mrp = this.temp_data.MRP;
      Sales_Temp_Row.sal_gst_per = this.temp_data.GST_Per;
      Sales_Temp_Row.sal_rate = Rate;

      Sales_Temp_Row.sal_bag_qty = this.temp_data.Bag_Qty;
      Sales_Temp_Row.sal_pcs = Qty;
      Sales_Temp_Row.sal_qty = Qty;

      Sales_Temp_Row.sal_uni_code = Uni_Code;

      Sales_Temp_Row.sal_disc_per = "0";
      Sales_Temp_Row.sal_disc_amt = "0";
      Sales_Temp_Row.sal_free = "0";


      Sales_Temp_Row.sal_landing_cost ="0";




      var GST_Type = "local";
      try {
        GST_Type = this.appservice.header_Row.GST_Type;
      }
      catch {
        GST_Type = "local"
      }


      if (String(GST_Type).toLowerCase() == "intra") {

        Sales_Temp_Row.sal_sgst_per = "0.00";
        Sales_Temp_Row.sal_cgst_per = "0.00";
        Sales_Temp_Row.sal_igst_per = Sales_Temp_Row.sal_gst_per;

      }
      else {
        Sales_Temp_Row.sal_sgst_per = (Number(Sales_Temp_Row.sal_gst_per) / 2).toFixed(2);
        Sales_Temp_Row.sal_cgst_per = (Number(Sales_Temp_Row.sal_gst_per) / 2).toFixed(2);
        Sales_Temp_Row.sal_igst_per = "0.00";

      }

      //Sales_Temp_Row.sal_qty = (Number(Sales_Temp_Row.sal_pcs) * Number(Sales_Temp_Row.sal_bag_qty));

      var Disc_Type = "percentage";
      try {
        Disc_Type = this.appservice.header_Row.Disc_Type;
      }
      catch {
        Disc_Type = "percentage"
      }

      if (String(Disc_Type).toLowerCase() == "amount") {
        Sales_Temp_Row.sal_disc_per = ((Number(Sales_Temp_Row.sal_disc_amt) / Number(Sales_Temp_Row.sal_rate)) / 100).toFixed(2);

      }
      else {
        Sales_Temp_Row.sal_disc_amt = (((Number(Sales_Temp_Row.sal_rate) / 100) * Number(Sales_Temp_Row.sal_disc_per))).toFixed(2);
      }


      Sales_Temp_Row.sal_disc_amt = (Number(Sales_Temp_Row.sal_disc_amt) * Number(Sales_Temp_Row.sal_qty)).toFixed(2);

      Sales_Temp_Row.sal_final_price = (Number(Sales_Temp_Row.sal_rate) - Number(Sales_Temp_Row.sal_disc_amt)).toFixed(2);

      var Tax_Type = "exclusive";
      try {
        Tax_Type = this.appservice.header_Row.sal_tax_type;
      }
      catch {
        Tax_Type = "exclusive"
      }



      if (String(Tax_Type).toLowerCase() == "inclusive") {

        Sales_Temp_Row.sal_final_price = (
          (
            ((Number(Sales_Temp_Row.sal_rate) - Number(Sales_Temp_Row.sal_disc_amt))
              /
              (100 + Number(Sales_Temp_Row.sal_gst_per))
            )
            * 100
          )).toFixed(2);


      }
      Sales_Temp_Row.sal_sub_total = (Number(Sales_Temp_Row.sal_final_price) * Number(Sales_Temp_Row.sal_qty)).toFixed(2);
      Sales_Temp_Row.sal_taxable_amount = (Number(Sales_Temp_Row.sal_sub_total) - Number(Sales_Temp_Row.sal_disc_amt)).toFixed(2);
      Sales_Temp_Row.sal_gst_amt = ((Number(Sales_Temp_Row.sal_sub_total) / 100) * Number(Sales_Temp_Row.sal_gst_per)).toFixed(2);
      Sales_Temp_Row.sal_igst_amt = ((Number(Sales_Temp_Row.sal_sub_total) / 100) * Number(Sales_Temp_Row.sal_igst_per)).toFixed(2);
      Sales_Temp_Row.sal_cgst_amt = ((Number(Sales_Temp_Row.sal_sub_total) / 100) * Number(Sales_Temp_Row.sal_cgst_per)).toFixed(2);
      Sales_Temp_Row.sal_sgst_amt = ((Number(Sales_Temp_Row.sal_sub_total) / 100) * Number(Sales_Temp_Row.sal_sgst_per)).toFixed(2);
      Sales_Temp_Row.sal_net_amt = (Math.round(Number(Sales_Temp_Row.sal_sub_total) + Number(Sales_Temp_Row.sal_gst_amt))).toFixed(2);

      this.appservice.Details_Row.push(Sales_Temp_Row);
      Sales_Temp_Row = {};


    } catch { }

  }

}
