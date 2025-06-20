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
  selector: 'app-add-resource-allocation',
  templateUrl: './add-resource-allocation.component.html',
  styleUrls: ['./add-resource-allocation.component.scss']
})
export class AddResourceAllocationComponent implements OnInit {

  
  
  add: any = {};
  public btndisable: boolean = false;
public btndisable1: boolean = false;
  public addForm: any = {};
  
  Item_rows=[];

  rowdata=0;
  Status="1";
  public New_MRP="";
  public New_Item="";
  public rs = [];
  Type_rows=[];
  
  constructor(public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService,private router: Router, private http: HttpClient) {
      if (this.appservice.Branch_ID != 0) {
      this.appservice.header_Row.mm_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    
    
    this.rs = this.appservice.get_fields_of('Material_Movement_details');
    this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    if (this.appservice.isEdit) {
      this.appservice.header_Row = appservice.Edit_Row;
      this.Status="0";
      try {
        this.appservice.header_Row.mm_date = appservice.datefromat(this.appservice.Edit_Row.mm_date);
        this.appservice.header_Row.mm_projectdate = appservice.datefromat(this.appservice.Edit_Row.mm_projectdate);
      } catch{ }
    }
    else {
      this.appservice.header_Row = {};
      this.appservice.Details_Row = [];
      this.clear();
      this.appservice.header_Row.mm_branch = this.appservice.Branch_ID;
      this.get_Purchase_No();
      this.appservice.header_Row.mm_id = "0";
      //this.appservice.header_Row.pur_adjustment="0";
      this.appservice.header_Row.mm_date =this.appservice.T_Date;
    }
    if (this.appservice.from_customer_page == true) {
      this.appservice.header_Row.mm_projectno = this.appservice.Selected_Customer.est_unino;
      this.appservice.header_Row.mm_projectdate = this.appservice.Selected_Customer.est_confdate;
      this.appservice.header_Row.mm_projectname = this.appservice.Selected_Customer.est_projectname;
      this.appservice.header_Row.mm_projectid = this.appservice.Selected_Customer.est_projectid;
      this.appservice.header_Row.mm_contact_no = this.appservice.Selected_Customer.est_contact_no;
      this.appservice.header_Row.mm_ledger_id = this.appservice.Selected_Customer.est_ledger_id;
      this.appservice.header_Row.mm_ledger_name = this.appservice.Selected_Customer.est_ledger_name;
      this.appservice.header_Row.mm_gst_no = this.appservice.Selected_Customer.est_gst_no;
      this.appservice.header_Row.mm_ledger_address1 = this.appservice.Selected_Customer.est_ledger_address1;
      this.appservice.header_Row.mm_ledger_address2 = this.appservice.Selected_Customer.est_ledger_address2;
      //this.appservice.header_Row.mm_ledgerpin = this.appservice.Selected_Customer.est_ledgerpin;
      //this.appservice.header_Row.mm_ledgerloc = this.appservice.Selected_Customer.est_ledgerloc;
      this.appservice.header_Row.mm_ledgerstcd=this.appservice.Selected_Customer.est_ledgerstcd;
      // if(this.appservice.Selected_Customer.cus_scode==this.appservice.GST_Code)
      // {
      //   this.appservice.header_Row.pur_gst_type="local";
      // }
      // else
      // {
      //   this.appservice.header_Row.pur_gst_type="intra";
      // }

    }

    appservice.disp_category=true;
    appservice.Grid_MPR_Disp=false;
    this.get_Stock_Row();
  }

  public Stock_Row = [];

  get_Stock_Row() {
    
    this.appservice.loading = true;
    this.appservice.get("Api/Transaction/get_Item_Stock?godown="+ this.appservice.header_Row.mm_godown +"&Check_Stock=true").subscribe((res: any) => {
      this.Stock_Row = JSON.parse(res).record;
      this.appservice.loading = false;
    });
  }
  onChange(data)
  {
    //this.get_Stock_Row();
  }

  onChange1(data)
  {
    //this.get_Stock_Row();
  }
  get_Purchase_No() {
    this.appservice.getc("Api/Transaction/get_Material_Movement_No").subscribe((res: any) => {
      this.appservice.header_Row.mm_no = res;
    });
  }

  get_customers() {
    //this.appservice.vType='P';
    return this.router.navigate(['/project-search']);

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
  
new_load:boolean=false;
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
  }


  d: any = {}
  temp_data: any = {};

  MRP_="";
  get_by_Code(data, type) {
    if (type == "Code") {

      this.temp_data = this.Stock_Row.filter(e => e.Part_No == data)[0];
      $(".code1").focus();

    } else {
      this.temp_data = this.Stock_Row.filter(e => e.value == data)[0];
    }

    this.appservice.Sales_Temp_Row.mm_prodid = this.temp_data.ID;
    this.appservice.Sales_Temp_Row.mm_prodcode = this.temp_data.Item_Code;
    this.appservice.Sales_Temp_Row.mm_prodName = this.temp_data.Item_Name;
    this.appservice.Sales_Temp_Row.mm_description = this.temp_data.Description;
    this.appservice.Sales_Temp_Row.mm_uom = this.temp_data.UOM;
    this.appservice.Sales_Temp_Row.mm_hsn_code = this.temp_data.HSN_Code;
    this.appservice.Sales_Temp_Row.mm_stock=this.temp_data.Stock;
    this.appservice.Sales_Temp_Row.mm_sales_qty = "0";
    this.appservice.Sales_Temp_Row.mm_rate=this.temp_data.Landing_Cost;
    this.appservice.Sales_Temp_Row.mm_uni_code=this.temp_data.Uni_Code;

    
    // var Stock_Row=[];
    // this.appservice.get("Api/Invoice/get_Stock_by_Item_ID?Item_ID="+ this.temp_data.ID).subscribe((res: any) => { 
    //   Stock_Row = JSON.parse(res).record;
      
    //   try{
    //   var stock=0;
    //   stock = (Stock_Row.reduce((sum, current) => sum + parseFloat(current.Qty), 0)).toFixed(2);
    //   this.appservice.Sales_Temp_Row.mm_stock=stock;
    //   }catch{

    //   this.appservice.Sales_Temp_Row.mm_stock=0;
    //   }

      
    // }); 
    this.calc_tempdata();

  }



  place_holder = "Item Name";
  calc_tempdata() {

    this.appservice.Sales_Temp_Row.mm_net_amt = ((Number(this.appservice.Sales_Temp_Row.mm_qty) * Number(this.appservice.Sales_Temp_Row.mm_rate))).toFixed(2);
  }


x:string="";

  out()
{

  try{

    this.x=""+  this.x.length;
    this.x=this.appservice.Sales_Temp_Row.mm_prodname;
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
      this.appservice.Sales_Temp_Row.mm_prodname="";
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
     // console.log(  this.appservice.Sales_Temp_Row);
      return;
    }

  }

  
   var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.mm_qty;
  }
  catch{i=0;}
  
  if(i==0)
  {
    $(".c_qty").focus();
    return;
  }


  var  i : Number=0;
  try{
    i=this.appservice.Sales_Temp_Row.mm_rate;
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
    return item.mm_prodid === data.mm_prodid
  });
  if(index>=0)
  {
    this.temp_data={}
    data={};
    this.appservice.Sales_Temp_Row.mm_prodName="";
    this.appservice.Sales_Temp_Row = {};
    this.toastr.error("Same item already added", "Error", { timeOut: 3000 });
    return true;
  }
  return false;
}




  calc_details_Row(row) {


    this.appservice.Details_Row[row].mm_net_amt = ((Number(this.appservice.Details_Row[row].mm_qty)* Number(this.appservice.Details_Row[row].mm_rate))).toFixed(2);
    this.Calc_Sum();
  }


  add_data(data) {

    if ((Number(data.mm_qty)) > 0) {
      this.appservice.Details_Row.push(data);
      localStorage.setItem('mm_Details', JSON.stringify(this.appservice.Details_Row));

      this.Calc_Sum();
      this.appservice.Sales_Temp_Row = {};
      $(".code1").focus();
    }

  }


  Calc_Sum() {
    var len = 0;
    len = this.appservice.Details_Row.length;

    this.appservice.header_Row.mm_net_amt=(this.appservice.Details_Row.reduce((sum, current) => sum + (parseFloat(current.mm_qty) * parseFloat(current.mm_rate)), 0)).toFixed(2);

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
    this.appservice.header_Row.pur_purchase_type ="Material_Movement";
    // this.appservice.header_Row.pur_bill_type = this.Selected_Bill_Type;
    // this.appservice.header_Row.pur_bill_mode = this.Selected_Bill_Mode;
    // this.appservice.header_Row.pur_tax_type = this.Selected_Tax_Type;
    this.appservice.header_Row.Item_Rate_Update=this.appservice.Item_Rate_Update;
    this.appservice.header_Row.ID=this.appservice.header_Row.mm_id;
    this.appservice.header_Row.ColumnPerfix="mm_";
    

   
    // for (var i = 0; i < this.appservice.Details_Row.length; i++) {

    //   if(this.appservice.Details_Row[i]["Free"] =="")
    //   {
    //     this.appservice.Details_Row[i]["Free"]="0"
    //   }
    // }
    
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
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Material_Movement', this.appservice.header_Row, { headers: this.headers })
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
    localStorage.setItem('mm_Details',"[]");
  }

  ngOnInit(): void {
  }

}
