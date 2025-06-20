import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public access_tocken = "";
  public Server_URL = "http://localhost:50312/";
  public Quotation_Format="Format1";
  public System_mac_address="Not found"
  public Area_Map: boolean = false;
  public NT_Bill_Format = "NT_Format1"
  public Bill_Format = "Format1"
  public Bill_Format1 = "Format6";
  public Vadi_Format = "Format1";
  public check_Unicod: boolean = false;


  public TCS_Enable: boolean = true;
  public Balance_SMS = "false";


  public key_value="";

  public Intrest_Format="Flat"

  public NT_Printer: string = "false";
  public NT_Address: String = "http://localhost:55245/";

  public DB_Vadi_display: boolean = false;
  public Print_Button: boolean = false;

  public Ledger_Update:boolean=true;
  public Cust_Amt: boolean = false;
  public Lfrom = "34";
  public Top = 50;

  public Logo_location = "Top_qubha";
  public Logo_Name = "Qubha";
  public Logo_location_Loin = "Chef";
  public Logo_Sub_Name = "Soft";
  public Phone_No = "9715748219";

  public Qmenu: boolean = true;
  public STamilName: boolean = false;
  public Type_Based_Bill_No: boolean = false;
  public Item_Rate_Update: boolean = true;
  public Check_Stock: boolean = false;
  
  public Image_disp: boolean = false;
  public Ledger_Type = "1";

  public Group_Enable: boolean = false;
  public Print_Bill: boolean = false;
  
  public Save_Print: boolean = false;
  public Save_Print_Mobile: boolean = false;
  public Save_New: boolean = false;

  public  Stockbase_Sales: boolean = false;

  public  mobile_menu: boolean = false;

  
  public from_customer_page:boolean=false;
  public W_height = 0;
  public W_width = 0;

  public SM_Row = [];
  public Sales_Disp_Text2_Visblle: boolean = false;
  public Sales_Disp_Text3_Visblle: boolean = false;
  
  public Loan_Issue_Page="/collection/emi-loan-issue";
  public Add_Receipt_Page="/transaction/add-receipt-entry-two";
  public U_Rights=""
  public Item_Group_ = "1";
  public isadd_Page:boolean=false;
  lenth: number = 0;
  public GST_Code = "";
  public GST_No = "";
  public GST_State = "";
  public CM_Address1 = "";
  public CM_Address2 = "";
  public CM_Address3 = "";
  public CM_Address5 = "";
  constructor(@Inject(DOCUMENT) private document: Document, private toastr: ToastrService, public datePipe: DatePipe, public http: HttpClient, public router: Router, private _location: Location) {


    if (this.getData()) {

      this.data = JSON.parse(localStorage.getItem('User_Data'));

      try {
        this.Customer_Area = localStorage.getItem('Area');
      } catch { }
      this.Company = "_" + this.data.UM_Company;
      this.GST_Code=this.data.CM_State_Code;
      this.GST_No=this.data.CM_Gstin;
      this.GST_State=this.data.CM_State;
      this.CM_Address1=this.data.CM_Address1;
      this.CM_Address2=this.data.CM_Address2;
      this.CM_Address3=this.data.CM_Address3;
      this.CM_Address5=this.data.CM_Address5;
      this.UM_Edit = this.data.UM_Edit;
      this.UM_Delete = this.data.UM_Delete;
      this.Branch_ID = this.data.UM_Branch;
              if (this.Branch_ID != 0) {
                this.get_Branch_Name();
                this.Branch_ID = this.data.UM_Branch;
                   this.isBarnchDisable = true
              }
              else {
                this.Branch_ID = 0
                this.Branch_ID = 0
                this.get_Branch_Name();
                this.isBarnchDisable = false
              }
    }


    this.W_height = window.innerHeight;

    this.W_width = window.innerWidth;

    var Today_Date = this.datePipe.transform(new Date(), "dd-MMM-yyyy");

    this.T_Date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.T_Date_Time = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm");


    this.Pay_Date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.tr_Date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.Log_Date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.dbe_date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.Pur_Date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.Y_Date = this.datePipe.transform(new Date().getDate() - 1, "dd-MMM-yyyy");
    this.Today_Date = Today_Date;


  
    this.S_From = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.M_From = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.S_To = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    this.From_Date = { formatted: Today_Date };
    this.To_Date = { formatted: Today_Date };
    this.Date = { formatted: Today_Date };
    this.Date1 = { formatted: Today_Date };

    this.S_From1 = this.datePipe.transform(new Date(), "yyyy-MM");

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.load_themes('');



  }


  public openModal: boolean = false;
  Open_Modal(Title, page) {
    this.openModal = true;
    $('#small_Module').modal('show');
  }

  Close_Modal() {
    this.openModal = false;
    $('#small_Module').modal('hide');
  }

  public Header_Disp = "";
  public Sales_Row = [];
  public add_item_name = "/add-items1";
  btndisable: boolean = false;
  isload: boolean = false;
  public Company = "";
  public CREATED_BY = "";
  public vType = "";
  public Ref_ID = "0";
  public isadd = "0";
  public Edit_Row: any = {};
  public Edit_Row1: any = {};

  public Selected_Row: any = {};
  public Default_ref_ID: string = "Role";
  public Default_Bank_ID: string = "0";
  public Default_Payment_ID: string = "Cash";
  public URL_Location = "";
  public check_Unicode: boolean = false;
  public disp_category:boolean=false;
  public img_visible: boolean = false;

  public S_GST_Type = "All";
  
  public Date;
  public Date1;
  public From_Date;
  public To_Date;

  public User_Type = "Admin";
  public Document_Type = "Front_Banner";
  public Phone_Pattern = "^((\\+91-?)|0)?[0-9]{10}$";
  public Receipt_Print="false";

  public Side_Menu: boolean = false;
  public Today_Date = "";
  public S_From = "";
  public S_From1 = "";
  public S_To = "";
  public FS_Date = "2021-04-01";

  public S_Bill_Type = "All";
  public S_Thari_Status = "All";
  public Calibration_Standard ="";
  public Category = "All";

  public S_Pay_Mode = "0";
  public S_Bill_Mode = "All";
  public S_Area = "All"
  public S_Sales_Order_by = "Bill_No";
  public S_Stock = "All"
  public S_Sales_Person = "All"


  public Y_Date = "";
  public data: any = {};
  public Order_Status = "Pending";
  public Search_User = "All";
  public Approval_Status = "Pending";
  Product_Rows = [];
  public isEdit: boolean = false;
  public load_from_make_invoice: boolean = true;

  public Customer_Area = "All";
  public item_name_disp = "English";

  public T_Date = "";
  public T_Date_Time = "";

  public Pay_Date="";
  public tr_Date="";
  public Log_Date="";
  public dbe_date="";
  public Pur_Date="";
  public Vehicle_No="1";
  public dbe_bunk_no="";
  public Open_Customer_Total = 0;
  public Open_Customer_Length = 0;
  public DB_Expense_Total=0;
  public Receipt_Row_Total=0;
  public Emi_Loan_Issue_Total=0;
  public DF_Bill_Type = "Tax Invoice";
  open_pdf(data) {
  }
  Clear_Cart() {

    this.Selected_Customer = {};
    this.cart_item = [];
    try {
      this.Item_Master_Rows.forEach(x => x.Order_Qty = "0");
      // this.Item_Master_Rows.forEach(x => x.Rate = "0");
      // this.Item_Master_Rows.forEach(x => x.Rate = "0");
    } catch { }

  }
  public Supplierwise_Track_GF = ['Supplier', 'S_Value', 'Profit', 'Stock_Value', 'P_Value'];  
  public Sales_Details_GF = ['Customer_Name', 'Bill_No', 'Area'];
public Sales_Export = [];

public DB_Sales_Total = 0;


get_Sale_Details() {
  this.isload = true;
  this.DB_Sales_Total = 0;
  this.get("Api/Transaction/get_Sale_Detail?From=" + this.S_From + "&To=" + this.S_To + "&User=" + this.Search_User + "&Bill_Type=" + this.S_Bill_Type + "&Area=" + this.S_Area + "&order_by=sal_Bill_Date,sal_Bill_No").subscribe((res: any) => {
    this.Sales_Row = JSON.parse(res).record;
    this.isload = false;
    
    

    for(var i=0;i<this.Sales_Row.length;i++)
      {
        var stringValue="";
        stringValue = this.Sales_Row[i].Net_Amt;
        this.Sales_Row[i].Net_Amt= parseInt(stringValue);
      }

      
    try {
      this.DB_Sales_Total = this.Sales_Row.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0);
    } catch { }

  });

}

public Ledger_Pending_Export = [
  { Field: 'label', Name: 'Bill No', Align: '', Type: 'text' },
  { Field: 'Bill_Date', Name: 'Date', Align: '', Type: 'date' },
  { Field: 'days', Name: 'Days', Align: '', Type: 'number' },
  { Field: 'Net_Amt', Name: 'Bill Amount', Align: 'right', Type: 'number' },
  { Field: 'Bill_Amount', Name: 'Due Amount', Align: 'right', Type: 'number' }
];

Ln = "";
get_Column_Array(data,Field) {

  this.Ln = data.find(c => c.Field.toLowerCase() === Field.toLowerCase())?.Name
  
  return this.Ln;
}


public Bill_Print_Setting_Rows1 =  [{"ID" : "3","Print_Type" : "Sales","Variable_Name" : "Format1","Display_Name" : "Tax Invoice","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "},{"ID" : "2","Print_Type" : "Sales","Variable_Name" : "Format3","Display_Name" : "Non Tax Invoice","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "},{"ID" : "9","Print_Type" : "Quotation","Variable_Name" : "Qubha_Quotation","Display_Name" : "Industry Format","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "},{"ID" : "7","Print_Type" : "Format2","Variable_Name" : "Format2","Display_Name" : "Format2","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "},{"ID" : "8","Print_Type" : "Format2","Variable_Name" : "Format2","Display_Name" : "Format2","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "},{"ID" : "10","Print_Type" : "Quotation","Variable_Name" : "Format1","Display_Name" : "Local Format","Save_and_Print" : "No","Save_btn_Text" : "323","Created_by" : "Madhu","Created_Date" : "3/3/2021 10:29:36 AM","Statsu" : "1 "}];
    
public Sales_Entry_Page = "/transaction/add-sales";

get_Print_type(data) {


  try {
    return this.Bill_Print_Setting_Rows1.filter(e => e.Print_Type.toLowerCase() == data.toLowerCase());
  } catch {

    return [];
  }
}

    




public Sales_Item_Rowdata = "";
public Sales_Date = "";
public Sales_Customer: any = {};

public Sales_Item_Row = [];
public Saleswise_Details() {
  this.isload = true;
  this.Sales_Item_Row = [];
  this.get("Api/Transaction/get_Saleswise_Item?ID=" + this.Sales_Item_Rowdata + "&Bill_Mode=" + this.S_Bill_Mode  + "&From=" + this.S_From + "&To=" + this.S_To + "&Pay_Mode=" + this.S_Pay_Mode + "&Sales_person=All&User=" + this.Search_User + "&Area=" + this.S_Area).subscribe((res: any) => {
    this.Sales_Item_Row = JSON.parse(res).record;
    this.Sales_Customer = this.Sales_Item_Row[0];
    this.isload = false;

  });

}

  public Item_Group="";
  public User_Role_Menu = [
    { Menu: 'User Master', Link: '/user-details' },
    { Menu: 'Role Master', Link: '/role-master' },
    { Menu: 'Role Rights', Link: '/role-permissions' }

  ];



  public Ledger_Report = [
    { Menu: 'Day Book', Link: '/report/day-book', class: '' },
  ];

  public Log_Report = [
    { Menu: 'Log Book Report', Link: '/report/logbook-report', class: '' },
  ];
  
  public Bunk_Report = [
    { Menu: 'Bunk Report', Link: '/report/bunk-report', class: '' },
    
    //{ Menu: 'Productwise', Link: '/preport/productwise-purchase', class: '' },
  ];

  public Tyre_Report = [
    { Menu: 'Tyre Report', Link: '/report/Tyre-report', class: '' },
    
  ];

  public Bunk_entry_Report = [
    { Menu: 'Bunk Entry Report', Link: '/report/bunk_entry_report', class: '' },
    //{ Menu: 'Productwise', Link: '/preport/productwise-purchase', class: '' },
  ];

  public Auditor_purchase_report = [
    { Menu: 'Auditor purchase Report', Link: '/report/auditor-report', class: '' },

  ];

  public Payable_Outstanding_Report = [
    { Menu: 'Billwise', Link: '/report/billwisepayable-out' },
    { Menu: 'Supplierwise', Link: '/report/supplierwise-out' },
  ];
  public Ledger_Balance_Report = [
    { Menu: 'Ledger Balance', Link: '/report/ledger-balance', class: '' },
  ];
  
  
    public Stock_Report = [
  
      { Menu: 'Current Stock', Link: '/report/current-stock', class: '' },
      { Menu: 'Category Stock', Link: '/report/categorywise-stock', class: '' },
      { Menu: 'Itemwise Stock', Link: '/report/itemwise-stock', class: '' },
    ];
  
    public Outstanding_Report = [
      { Menu: 'Billwise', Link: '/report/billwise-out' },
      { Menu: 'Customerwise', Link: '/report/customerwise-out' },
      { Menu: 'Areawise', Link: '/report/areawise-out' },
      { Menu: 'Due daywise', Link: '/report/duedaywise-out' },
      { Menu: 'Salespersonwise', Link: '/report/salespersonwise-out' },
  
    ];

    public Collection_Report = [

      { Menu: 'Entrywise', Link: '/report/entrywise-col' },
      { Menu: 'Customerwise', Link: '/report/customerwise-col' },
      { Menu: 'Userwise', Link: '/report/userwise-col' },
      { Menu: 'Areawise', Link: '/report/areawise-col' },
      { Menu: 'Paymodewise', Link: '/report/paymodewise-col' }
  
    ];

    public Transport_Report = [
      { Menu: 'Tipper ', Link: '/transport/tipper-report', class: '' },
      { Menu: 'Tractor ', Link: '/transport/tractor-report', class: '' },
      { Menu: 'Jcb ', Link: '/transport/jcb-report', class: '' },
      { Menu: 'Hitachi ', Link: '/transport/hitachi-report', class: '' },
      //{ Menu: 'supplierwise', Link: '/preport/supplierwise-purchase', class: '' },
    ];


  public Menu_Master_GF = ['Module', 'Type', 'Display_Name', 'Route_Link', 'Order_No', 'Icon', 'Remark'];
  public back() {
    this._location.back();
  }


  public datefromat(data) {
    return this.datePipe.transform(data, "yyyy-MM-dd");
  }

  public datetimefromat(data) {
    return this.datePipe.transform(data, "yyyy-MM-ddTHH:mm");
  }
  

  public date_display(data) {
    return this.datePipe.transform(data, "dd-MMM-yyyy");
  }

  public Branch_ID = 0;
  public Branch_ID_ = "";
  public Rights_Name = "";
  public Rights_ID = "";
  public Emp_ID = "";
  public UM_Edit = "";
  public UM_Delete = "";
  public isBarnchDisable:boolean=false;
 
 Branch_Name_Rows: any[] = [];
  get_Branch_Name() {

    // Check if data is already available
  if (this.Branch_Name_Rows.length > 0) {
    return; // Data already exists; skip API call
  }
    this.Branch_Name_Rows = [];
    this.getc("Api/Setting/get_Branch_Name").subscribe((res: any) => {
      this.Branch_Name_Rows = JSON.parse(res).record;
    });
  }
  getData() {
    return JSON.parse(localStorage.getItem('User_Data'));
  }

  F_Row = [];
  get_pos_field(Table, pos) {
    this.F_Row = this.Field_Setting.filter(e => String(e.Table_Name).toLowerCase() == String(Table).toLowerCase()).filter(e => e.Visible == "True");
    this.F_Row = this.F_Row.filter(e => String(e.Posision).toLowerCase() == String(pos).toLowerCase());
    return this.F_Row.sort((a, b) => Number(a["Order_No"]) - Number((b["Order_No"])));

  }



  Reference_GF = ['RGV_vDesciption'];
  Reference_Rows = [];
  get_Reference() {


    this.getc("Api/Master/get_reference").subscribe((res: any) => {
      this.Reference_Rows = JSON.parse(res).record;
    });
  }
 



  public User_Master_Rows = [];
  get_User_Master() {
    this.getc("Api/Common/get_User_Master").subscribe((res: any) => {
      this.User_Master_Rows = JSON.parse(res).record;
    });
  }


  public Day_book_GF = ['Ledger_Name', 'AC_Date', 'Ledger', 'Narration1','Credit','Debit','Balance'];
  public Daybook_Export = [
    { Field: 'AC_Date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'Ledger_Name', Name: 'Group', Align: '', Type: 'text' },
    { Field: 'Ledger', Name: 'Ledger', Align: '', Type: 'text' },
    { Field: 'Narration1', Name: 'Narration ', Align: '', Type: 'text' },
    { Field: 'Credit', Name: 'Credit ', Align: '', Type: 'number' },
    { Field: 'Debit', Name: 'Debit ', Align: '', Type: 'number' },
    { Field: 'Balance', Name: 'Balance ', Align: 'right', Type: 'number' },
  ];

  public Typewise_DayBook_Row = [];

  public S_Bank = "0";
  public day_Book_Short_by = "AC_Date";
  public cr = 0;
  public db = 0;
  public bal = 0;

  public Total = 0;
  public Rows = [];
  public Day_Book_Row = [];
  public get_day_Book() {
    this.isload = true;
    this.Day_Book_Row = [];
    this.get("Api/reports/get_Daybook?From=" + this.S_From + "&To=" + this.S_To + "&Ledger_ID=" + this.S_Bank + "&Order_by=" + this.day_Book_Short_by).subscribe((res: any) => {

      this.Day_Book_Row = JSON.parse(res).record;
      this.isload = false;
      this.Total = 0;
      this.cr = (this.Day_Book_Row.reduce((sum, current) => sum + parseFloat(current.Credit), 0)).toFixed(2);
      this.db = (this.Day_Book_Row.reduce((sum, current) => sum + parseFloat(current.Debit), 0)).toFixed(2);
      this.bal = (this.Day_Book_Row.reduce((sum, current) => sum + parseFloat(current.Balance), 0)).toFixed(2);

      this.Total = this.cr - this.db;

      var Item = [...new Set(this.Day_Book_Row.map(item => item.Nar_Type))];
      this.Typewise_DayBook_Row = [];
      for (let data of Item) {
        var cr = (this.Day_Book_Row.filter(e => e.Nar_Type == data).reduce((sum, current) => sum + parseFloat(current.CR_AMT), 0)).toFixed(2);
        var db = (this.Day_Book_Row.filter(e => e.Nar_Type == data).reduce((sum, current) => sum + parseFloat(current.DB_AMT), 0)).toFixed(2);
        var rs = this.Day_Book_Row.filter(e => e.Nar_Type == data);

        this.Typewise_DayBook_Row.push({ Nar_Type: data, AC_Date: rs[0].AC_Date, CR_AMT: cr, DB_AMT: db })
      }
      this.representatives=[];
    var Ledger_Name=[...new Set(this.Day_Book_Row.map(item => item.Ledger_Name))];
    for (let data1 of Ledger_Name) {
     this.representatives.push({'value':data1});
    }

    });

  }
  
  public Selected_Company: any = {};
  public Selected_Customer: any = {};
  public Current_User: any = {};

  public Order_No = "0";

  public states = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupattur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ];



  public Tax_Type = "exclusive";
  public GST_Type = "local";
  
  public Temp_Order_Row = [];
  public Menus_Rows: any = {};
  public Menu_Rows = [];
  public Label_Menu_Rows = [];
  get_Role_Rights(Role) {
    this.get("Api/Setting/get_Menu_for_user?Rights=" + Role).subscribe((res: any) => {
      this.Menu_Rows = JSON.parse(res).record;
      this.Side_Menu = true;
      try {
        this.Label_Menu_Rows = this.Menu_Rows.filter(e => e.Type == "Label");
        this.Label_Menu_Rows = this.Label_Menu_Rows.filter(e => e.Parent_ID == "0");
        this.Label_Menu_Rows.sort((a, b) => Number(a["Order_No"]) - Number((b["Order_No"])));
      } catch { }

    });
  }


  get_ref(data) {
  
    try{
    return this.Reference_Rows.filter(e => e.Ref_ID == data);
    }catch{

      return [];
    }
  }
  get_child(parent) {
    var data = this.Menu_Rows.filter(e => e.Parent_ID == parent).sort((a, b) => Number(a["Order_No"]) - Number((b["Order_No"])));

    return data;
  }

  get_childs(parent) {
    var data = this.Menu_Rows.filter(e => e.Module == parent).sort((a, b) => Number(a["Order_No"]) - Number((b["Order_No"])));

    return data;
  }

  public Menu_data = "";
  public Menu_Master_Rows = [];
  public Parent_Menus = [];
  get_Menu_Master() {
    this.getc("Api/Setting/get_Menu_master").subscribe((res: any) => {
      this.Menu_Master_Rows = JSON.parse(res).record;

      this.Parent_Menus = this.Menu_Master_Rows.filter(e => e.Parent_ID == "0");



    });
  }


  loading = false;

  public Dashboard_Row = [];
  get_Dashboard() {
    this.Dashboard_Row = [];
    this.loading = true;

    this.get("Api/Master/get_dashboard?").subscribe((res: any) => {
      this.Dashboard_Row = JSON.parse(res).record;
      this.loading = false;
    });
  }
  Num(data) {
    return Number(data).toFixed(2);
  }



  public filter_data="";
  pdfType = "Open";


  get(url) {
    this.access_tocken = this.tocken;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': 'Bearer ' + this.access_tocken
    });


    return this.http.get(this.Server_URL + "" + url + "&Company=" + this.Company, { headers: reqHeader })
  }

  getc(url) {

    this.access_tocken = this.tocken;
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.access_tocken
    });

    return this.http.get(this.Server_URL + "" + url + "?Company=" + this.Company, { headers: reqHeader });
  }



  d_get(url) {


    this.access_tocken = this.tocken;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': 'Bearer ' + this.access_tocken
    });


    return this.http.get(url + "&Company=" + this.Company, { headers: reqHeader })
  }


  public load_page(data) {
    this.router.navigate([data], { replaceUrl: true });
  }

  public load_page1(data) {
    this.router.navigate([data]);
  }




  public Seraial_No_Settings_Rows = [];
  public Perment_Seraial_No_Settings_Rows = [];
  public Reset_Seraial_No_Settings_Row = [];
  public Orderby_Name = "Name";
  get_Seraial_No_Settings() {

    this.loading = true;
    this.isload = true;
    this.Seraial_No_Settings_Rows = [];
    this.get("Api/Setting/get_Seraial_No_Settings?Order_by=" + this.Orderby_Name).subscribe((res: any) => {
      this.Seraial_No_Settings_Rows = JSON.parse(res).record;
      this.Perment_Seraial_No_Settings_Rows = JSON.parse(res).record;
      this.Reset_Seraial_No_Settings_Row = JSON.parse(res).record;
      this.loading = false;
      this.isload = false;
      //   this.Item_Category = [...new Set(this.Item_Master_Rows.map(item => item.Category))];

      // console.log(this.Item_Category);
    });
  }


  public Variable_Settings_Rows = [];
  public Perment_Variable_Settings_Rows = [];
  public Reset_Variable_Settings_Row = [];
  public Variable_Settings_GF = ['ID', 'S_Variable', 'S_Value', 'S_Default'];

  get_Variable_Settings() {

    this.loading = true;
    this.Variable_Settings_Rows = [];
    this.getc("Api/Setting/get_variable_Settings").subscribe((res: any) => {
      this.Variable_Settings_Rows = JSON.parse(res).record;
      this.Perment_Variable_Settings_Rows = JSON.parse(res).record;
      this.Reset_Variable_Settings_Row = JSON.parse(res).record;
      this.loading = false;

    });
  }


  post_data(data, Table) {

    data.Company = this.Company;
    data.Created_by = this.CREATED_BY;
    data.Table_Name = Table;

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.isload = true;
    this.http.post(this.Server_URL + 'api/Master/Post_Data', data, { headers: this.headers })
      .subscribe(
        (val: string) => {
          this.isload = false;
          return val;
        },
        response => {
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });
          return "Error Contact Admin";
        });

    //return "Problem"
  }



  public tocken = "";
  get_Token() {



    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.isload = true;
    this.http.post(this.Server_URL + 'token', 'grant_type=password&UserName=admin&Password=admin', { headers: this.headers })
      .subscribe(
        (val) => {
          this.tocken = val['access_token'];

        },
        response => {
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });
          return "Error Contact Admin";
        });

    //return "Problem"
  }

  public filteredValue(dt) {

    var len = 0;
    var dt2 = [];
    try {
      len = dt.filteredValue.length;
      dt2 = dt.filteredValue;
      return dt2
    } catch { }


    if (len == 0) {
      try {
        dt2 = dt.value;
      } catch { }
    }

    return dt2;
  }

  public length_of(dt) {

    var len = 0;
    try {
      len = dt.filteredValue.length;
      return len
    } catch { }


    if (len == 0) {
      try {
        len = dt.value.length;
      } catch { }
    }

    return len;
  }


  load_themes(data) {
    var d = "default.css";
    try {
      d = localStorage.getItem('Theme');
    } catch { }

    if (d != "default.css" && d != null) {

      this.loadStyle(d);

    }
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  public sum_of(dt, field) {

    var len = 0;
    try {
      len = dt.filteredValue.length;
      return dt.filteredValue.reduce((sum, current) => sum + parseFloat(current[field]), 0);
    } catch { }


    if (len == 0) {
      try {
        len = dt.value.length;
        return dt.value.reduce((sum, current) => sum + parseFloat(current[field]), 0);
      } catch { }
    }

    return len;
  }



  public Excel_Data: any = {
    'ID': '',
    "item": '',
    "Header": '',
    "Footer": '',
    "Left_Data": '',
    "Right_Data": '',
    "Report_Name": ''

  };
  headers;

  export_excel() {

    this.Excel_Data.Company = this.Company;
    this.Excel_Data.User = this.CREATED_BY;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

    this.http.post(this.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
      .subscribe(
        (val: string) => {

          if (val == "True") {

            var parm = "User=" + this.CREATED_BY + "&Company=" + this.Company + "&File_Name=" + this.File_Name + "&File_Type=xls";
            window.open(this.Server_URL + "Report/JsontToExcel?" + parm, "_blank");
            this.toastr.success("Data Exported  Successfully", 'Msg');

          }
          else {

            console.log(val);
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }
        },
        response => {
          console.log(response);
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });

        });

  }

  
  export_excel_1() {

    this.Excel_Data.Company = this.Company;
    this.Excel_Data.User = this.CREATED_BY;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

    this.http.post(this.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
      .subscribe(
        (val: string) => {

          if (val == "True") {

            var parm = "User=" + this.CREATED_BY + "&Company=" + this.Company + "&File_Name=" + this.File_Name + "&File_Type=xls";
            window.open(this.Server_URL + "Report/JsontToExcel_1?" + parm, "_blank");
            this.toastr.success("Data Exported  Successfully", 'Msg');

          }
          else {

            console.log(val);
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }
        },
        response => {
          console.log(response);
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });

        });

  }
  upload_excel() {

    this.Excel_Data.Company = this.Company;
    this.Excel_Data.User = this.CREATED_BY;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

    this.http.post(this.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
      .subscribe(
        (val: string) => {

          if (val == "True") {

            var parm = "User=" + this.CREATED_BY + "&Company=" + this.Company + "&File_Name=" + this.File_Name + "&File_Type=xls";
            window.open(this.Server_URL + "Report/JsontToExcel_Upload?" + parm, "_blank");
            this.toastr.success("Data Exported  Successfully", 'Msg');

          }
          else {

            console.log(val);
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }
        },
        response => {
          console.log(response);
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });

        });

  }

  File_Name = "Data";

  export_pdf() {


    this.Excel_Data.Company_Data = JSON.parse(JSON.stringify(this.Current_User));
    this.Excel_Data.Company = this.Company;
    this.Excel_Data.User = this.CREATED_BY;

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

    this.http.post(this.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
      .subscribe(
        (val: string) => {

          if (val == "True") {
            var parm = "User=" + this.CREATED_BY + "&Company=" + this.Company + "&File_Name=" + this.File_Name + "&File_Type=pdf";
            window.open(this.Server_URL + "PDF/Export_Pdf?" + parm, "_blank");
            this.toastr.success("Data Exported  Successfully", 'Msg');

          }
          else {

            console.log(val);
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }
        },
        response => {
          console.log(response);
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });

        });

  }
  public Field_Setting = [];
  get_Field_Setting() {
    this.getc("Api/Setting/get_Field_Setting").subscribe((res: any) => {
      this.Field_Setting = JSON.parse(res).record;

    });

  }
  public Field_Setting_Table_Row = [];
  get_Field_Setting_Table() {
    this.getc("Api/Setting/get_Field_Setting_Table").subscribe((res: any) => {
      this.Field_Setting_Table_Row = JSON.parse(res).record;

    });
  }


public select_mode="All";
  
  public DB_Bank_Row = [];
  public DB_Bank_Total = 0;
  public DB_Bank_Lenth = 0;

  get_DB_Bank_Details() {
    this.isload = true;
    this.DB_Bank_Row = [];
    this.get("Api/Reports/get_DB_Bank_Details?From=" + this.S_From + "&To=" + this.S_To).subscribe((res: any) => {
      this.DB_Bank_Row = JSON.parse(res).record;
      this.isload = false;
      try {
        this.DB_Bank_Lenth = this.DB_Bank_Row.length;

        this.DB_Bank_Total = this.DB_Bank_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0);
      } catch { }
    });

  }


  Cash_ID = "CASH";
  Cheque_ID = "Cheque";
  Card_ID = "Card";
  Prow = [];
  Pay_Mode_Rows = [];
  public Pay_Mode = "";
  public Bill_Mode = "Cash";
  public Receiving_Bank = "0";
  public Cheque_No = "";
  public Cheque_Date = this.Today_Date;
  public Card_Charge = "";
  public Remarks = "";

  public pay_Mode_reset() {
    this.Pay_Mode = this.Cash_ID;
    this.Receiving_Bank = "0";
    this.Cheque_No = "";
    this.Cheque_Date = this.Today_Date;
    this.Card_Charge = "";
    this.Remarks = "";

  }

  get_pay_mode_ID() {

    try {
      this.Prow = this.Reference_Rows.filter(e => e.Ref_ID == "Pay_Mode");
      this.Pay_Mode_Rows = this.Reference_Rows.filter(e => e.Ref_ID == "Pay_Mode");
      this.Cash_ID = "cash";//this.Prow.filter(e => e.RGV_vDesciption.toLowerCase() == "cash")[0].RGV_iID;
      this.Cheque_ID = "cheque";//this.Prow.filter(e => e.RGV_vDesciption.toLowerCase() == "cheque")[0]["RGV_iID"];
      this.Card_ID = "card";//this.Prow.filter(e => e.RGV_vDesciption.toLowerCase() == "card")[0]["RGV_iID"];
      this.Pay_Mode = this.Cash_ID;
    } catch { }
  }
  public S_Exp_Category = "0";
  public DF_Paymode = "244";
  public Grp_Expense_type=[];
  public Expense_Details_GF = ['oc_category', 'oc_date', 'oc_narration1','oc_transport', 'oc_projectname','oc_paymode', 'oc_created_by', 'oc_ledger_name', 'oc_amount'];
  public Exp_Rows = [];
  public Exp_Total = 0;
  
public  To_Amt="0";
  public  Ledger_Amt="0";
get_CR_DB_Amount(data)
{
  this.get("Api/Transaction/get_CR_DB_Amount?Ledger_ID=" +data).subscribe((res: any) => {
   this.Ledger_Amt= res;
  });
 this.Default_Bank_ID=data;
}
public Bank_Category=[];
public GoDown = [];
public Project_Row = [];

  /////////////////////Sundaramoorthy-/////////////////////

  public item = "";
  public Product_Menu = [
    { Menu: 'Raw-Material Master', Link: '/master/raw-material-master' },
    { Menu: 'Product Master', Link: '/master/product-details' }

  ];
  public Item_Order_by = " pm_item_name asc";
  public Product_Master_Rows = [];
  public Product_Master_col_GF = ['pm_brand','pm_category', 'pm_item_name','pm_gst_per','pm_mrpprice','pm_purprice','pm_uom','pm_hsn_code' ];

  public Product_details="";

  get_product_Master(Status) {
      
    this.get("Api/Master/get_product_Master?Status=" + Status + "&vType=" + this.vType + "&Order_by="+this.Item_Order_by).subscribe((res: any) => {
      
      this.Product_Master_Rows = JSON.parse(res).record;

    });
  }

  get_product_Master1() {
      
    this.getc("Api/Master/get_product_Master1").subscribe((res: any) => {
      
      this.Product_Master_Rows = JSON.parse(res).record;
      this.Item_Master_Rows=JSON.parse(res).record;

    });
  }
  public Customer_Master_Rows = [];
  public Customer_details="";
  public Customer_Order_by = " cus_name asc";

  public Customer_Master_col_GF = ['cus_code','cus_name', 'cus_contactperson', 'cus_contactno', 'cus_gstin', 'cus_state', 'cus_created_by'];
  public Customer_Master_Export = [ ];
  public Customer_Row: any = {};


  public Employee_Master_Rows = [];
  public Employee_details="";

  public Employee_Master_col_GF = ['Emp_name', 'Emp_address', 'Emp_phone','Emp_email','Emp_designation','Emp_department','Emp_Salary','Emp_CreatedBy'];

  get_fields_of(Table) {
    this.F_Row = this.Field_Setting.filter(e => String(e.Table_Name).toLowerCase() == String(Table).toLowerCase()).filter(e => e.Visible == "True");
    return this.F_Row.sort((a, b) => Number(a["Order_No"]) - Number((b["Order_No"])));

  }

  get_grid_fields_of(Table) {
    this.F_Row = this.Field_Setting.filter(e => String(e.Table_Name).toLowerCase() == String(Table).toLowerCase()).filter(e => e.GVisible == "True");
    return this.F_Row.sort((a, b) => Number(a["GOrder"]) - Number((b["GOrder"])));

  }
  public contractor_Master_Rows = [];
  public contractor_details="";

  public contractor_Master_col_GF = ['Con_Name', 'Con_Address', 'Con_Addr2', 'Con_ContactNo', 'Con_GSTIN', 'Con_date', 'Con_CreatedBy'];


  public Vehicle_Master_Rows = [];
  public Vehicle_details="";
  public Vehicle_Master_col_GF = ['Veh_VehicleNo', 'Veh_Type', 'Veh_Make', 'Veh_Model', 'Veh_Insurance', 'Veh_FCDate', 'Veh_PermitDate', 'Veh_Date', 'Veh_CreatedBy'];


  public Default_Prod_ID: string = "Product";
  public Product_ID = "0";


  L = [];
  get_Array(data) {
    this.L = data.split(",");

    return this.L;
  }

  public Bank_Master_Rows = [];
  get_Bank_Master() {

    this.getc("Api/Master/get_Bank_Master").subscribe((res: any) => {
      this.Bank_Master_Rows = JSON.parse(res).record;
    });
  }


  public Transportrate_Master_Rows = [];
  public Transport_Order_by = " trm_id desc";
  public Transportrate_Master_col_GF = ['trm_from', 'trm_to', 'trm_km1way'];
  public Transportrate_Master_Export = [
  { Field: 'trm_type', Name: 'Type', Align: '', Type: 'text' },
  { Field: 'trm_from', Name: 'From', Align: '', Type: 'text' },
  { Field: 'trm_to', Name: 'To', Align: '', Type: 'text' },
  { Field: 'trm_km1way', Name: 'KM One Way', Align: '', Type: 'number' },
  { Field: 'trm_7U', Name: '7 U', Align: '', Type: 'text' },
  { Field: 'trm_57U', Name: '5.7 U', Align: '', Type: 'text' },
  { Field: 'trm_5U', Name: '5 U', Align: '', Type: 'text' },
  { Field: 'trm_4U', Name: '4 U', Align: '', Type: 'text' },
  { Field: 'trm_3U', Name: '3 U', Align: '', Type: 'text' }
];



  //////

  public Patry_Row=[];
  get_Party_details() {

    this.isload = true;
    this.Patry_Row=[];
    this.getc("Api/transaction/get_Customer_Master").subscribe((res: any) => {
    this.Patry_Row = JSON.parse(res).record;
    this.isload = false;
    });

  }

  public Customer_Search_GF = ['cus_name','cus_city','cus_contactNo','cus_gstin'];
  public SLedger_Rows = [];
  get_Ledger_Master() {
  this.isload = true;
   
    this.get("Api/Master/get_Customer_Master1?vType=" + this.Cus_Type ).subscribe((res: any) => {
      this.isload = false;
      this.Customer_Master_Rows = JSON.parse(res).record;
      this.SLedger_Rows = JSON.parse(res).record;
    });
  }

  public Ledger_Master_Rows = [];
  public Ledger_Master_Row = [];
  get_Ledger_Master2() {
    this.isload = true;
     
      this.getc("Api/Master/get_Ledger_Master2").subscribe((res: any) => {
        this.isload = false;
        this.Ledger_Master_Row = JSON.parse(res).record;
      });
    }

  public PLedger_Master_Row = [];
  get_Ledger_Master1() {
      this.isload = true;
       
        this.getc("Api/Master/get_Ledger_Master1").subscribe((res: any) => {
          this.isload = false;
          this.PLedger_Master_Row = JSON.parse(res).record;
        });
      }
  public Pur_Details_GF = ['pur_ledger_name','pur_bill_no','pur_bill_date','pur_purchase_no','pur_net_amt'];

  public Purchase_Export = [];
  public Bill_Type="";
  public Pur_Type="Purchase";
  public Pur_Details_Row = [];
  get_Pur_Details() {
    this.isload = true;
    this.Pur_Details_Row = [];

    this.get("Api/Transaction/get_pruchase_details?From=" + this.S_From + "&To=" + this.S_To + "&Type=" + this.Pur_Type+ "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.Pur_Details_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }



  public Production_Export = [];
  public Production_Details_GF = [];
  public Production_Row = [];
  get_Production_Details() {
    this.isload = true;
    this.get("Api/Transaction/get_Production_Detail?From=" + this.S_From + "&To=" + this.S_To + "&User=" + this.Search_User + "&order_by=pur_purchase_no&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.Production_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }

  public lable_ = "";
  public Filter_Type = "contain";
  
  
public Purchase_Report = [
  { Menu: 'Billwise', Link: '/report/billwise-purchase', class: '' },
  { Menu: 'Itemwise', Link: '/report/itemwise-purchase', class: '' },
  { Menu: 'Userwise', Link: '/report/userwise-purchase', class: '' },
  { Menu: 'Daywise', Link: '/report/daywise-purchase', class: '' },
  { Menu: 'supplierwise', Link: '/report/supplierwise-purchase', class: '' },
  { Menu: 'Paymodewise', Link: '/report/paymodewise-purchase', class: '' },

];
  public Itemwise_Purchase_Export = [
    { Field: 'Item_Name', Name: 'Item Name', Align: '', Type: 'text' },
    { Field: 'Qty', Name: 'Quality', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'P Amount', Align: 'right', Type: 'number' },
    { Field: 'S_Rate', Name: 'S Amount', Align: 'right', Type: 'number' },
    { Field: 'Profit', Name: 'Profit', Align: 'right', Type: 'number' }
  ];

  public Billwise_Purchase_Export = [
    { Field: 'Bill_No', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'Purchase_Date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'Supplier_Name', Name: 'Suppier Name', Align: '', Type: 'text' },
    { Field: 'Contact_No', Name: 'Phone No', Align: '', Type: 'text' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Userwise_Purchase_Export = [
    { Field: 'User', Name: 'User', Align: '', Type: 'text' },
    { Field: 'count', Name: 'Count', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Daywise_Purchase_Export = [
    { Field: 'Purchase_Date_', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'count', Name: 'Count', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Supplierwise_purchase_Export = [
    { Field: 'Supplier_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
    { Field: 'count', Name: 'Count', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Paymodewise_Purchase_Export = [
    { Field: 'Pay_Mode', Name: 'Pay Mode ', Align: '', Type: 'text' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Billwise_Purchase_GF = ['Supplier_Name', 'Bill_No', 'Purchase_Date', 'Phone_No', 'Amount'];
  public Itemwise_Purchase_GF = ['Item_Name', 'Amount', 'Qty'];
  public Userwise_Purchase_GF = ['User', 'Amount', 'count'];
  public Supplierwise_purchase_GF = ['Supplier_Name', 'count', 'Amount'];
  public Paymodewise_Purchase_GF = ['Pay_Mode', 'Amount'];
  public Daywise_Purchase_GF = ['User', 'Amount', 'count'];
  public Invoice_Row_total = 0;
  public Invoice_Row_length = 0;
  public Billwise_Purchase_Sum_Row = [];
  public Paymodewise_Purchase_Sum_Row = [];
  public Date_wise_Purchase_Row = [];
  public Supplierwise_Purchase = [];
  public userwise_Purchase_Sum_Row = [];
  public Areawise_Purchase_Sum_Row = [];
  public Item_wise_purchase_Row = [];
  public Itemwise_purchase_Row = [];
  get_Purchase_Report() {
  this.isload = true;
  this.Invoice_Row_total = 0;
  this.Invoice_Row_length = 0;
  this.get("Api/Reports/get_Purchase_Report?From=" + this.S_From + "&To=" + this.S_To + "&Bill_Mode=" + this.S_Bill_Mode + "&Pay_Mode=" + this.S_Pay_Mode + "&User=" + this.Search_User + "&Area=" + this.S_Area  + "&order_by=Purchase_Date desc").subscribe((res: any) => {
    
    this.Itemwise_purchase_Row = JSON.parse(res).record;
    this.isload = false;

    try {

      this.Invoice_Row_total = (this.Itemwise_purchase_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      this.Invoice_Row_length = this.Itemwise_purchase_Row.length;

    } catch
    {

    }



    var Item = [...new Set(this.Itemwise_purchase_Row.map(item => item.Item_Name))];
    this.Item_wise_purchase_Row = [];
    for (let data of Item) {
      var Amount_ = (this.Itemwise_purchase_Row.filter(e => e.Item_Name == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      var Qty_ = (this.Itemwise_purchase_Row.filter(e => e.Item_Name == data).reduce((sum, current) => sum + parseFloat(current.Qty), 0)).toFixed(2);
      var Profit_ = (this.Itemwise_purchase_Row.filter(e => e.Item_Name == data).reduce((sum, current) => sum + parseFloat(current.Profit), 0)).toFixed(2);
      var S_Rate_ = (this.Itemwise_purchase_Row.filter(e => e.Item_Name == data).reduce((sum, current) => sum + parseFloat(current.S_Rate), 0)).toFixed(2);

      this.Item_wise_purchase_Row.push({ Item_Name: data, Qty: Qty_, Amount: Amount_,Profit:Profit_ ,S_Rate:S_Rate_})
    }


    // this.Areawise_Purchase_Sum_Row = [];
    // var Area = [...new Set(this.Itemwise_purchase_Row.map(item => item.Area))];
    // for (let data of Area) {
    //   var sum = (this.Itemwise_purchase_Row.filter(e => e.Area == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
    //   this.Areawise_Purchase_Sum_Row.push({ 'Area': data, 'Amount': sum });
    // }


    this.userwise_Purchase_Sum_Row = [];
    var User = [...new Set(this.Itemwise_purchase_Row.map(item => item.User))];


    for (let data of User) {
      var sum = (this.Itemwise_purchase_Row.filter(e => e.User == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var count = [...new Set((this.Itemwise_purchase_Row.filter(e => e.User == data)).map(item => item.Bill_No))].length;

      this.userwise_Purchase_Sum_Row.push({ 'User': data, 'count': count, 'Amount': sum });
    }


    this.Paymodewise_Purchase_Sum_Row = [];
    var Pay_Mode_ = [...new Set(this.Itemwise_purchase_Row.map(item => item.Bill_Mode))];
    for (let data of Pay_Mode_) {
      var sum = (this.Itemwise_purchase_Row.filter(e => e.Bill_Mode == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      this.Paymodewise_Purchase_Sum_Row.push({ 'Pay_Mode': data, 'Amount': sum });
    }



    this.Date_wise_Purchase_Row = [];
    var Purchase_Date_ = [...new Set(this.Itemwise_purchase_Row.map(item => item.Purchase_Date_))];
    for (let data of Purchase_Date_) {
      var sum = (this.Itemwise_purchase_Row.filter(e => e.Purchase_Date_ == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var count = [...new Set((this.Itemwise_purchase_Row.filter(e => e.Purchase_Date_ == data)).map(item => item.Purchase_No))].length;

      this.Date_wise_Purchase_Row.push({ 'Purchase_Date_': data, 'count': count, 'Amount': sum });
    }
    this.Supplierwise_Purchase = [];
    var Supplier_Name = [...new Set(this.Itemwise_purchase_Row.map(item => item.Supplier_Name))];
    for (let data of Supplier_Name) {
      var sum = (this.Itemwise_purchase_Row.filter(e => e.Supplier_Name == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var count = [...new Set((this.Itemwise_purchase_Row.filter(e => e.Supplier_Name == data)).map(item => item.Bill_No))].length;

      this.Supplierwise_Purchase.push({ 'Supplier_Name': data, 'count': count, 'Amount': sum });
    }


    this.Billwise_Purchase_Sum_Row = [];
    var Purchase_No = [...new Set(this.Itemwise_purchase_Row.map(item => item.Purchase_No))];
    for (let data of Purchase_No) {
      var sum = (this.Itemwise_purchase_Row.filter(e => e.Purchase_No == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var rs = this.Itemwise_purchase_Row.filter(e => e.Purchase_No == data);

      this.Billwise_Purchase_Sum_Row.push({ 'Bill_No': rs[0].Bill_No, 'Purchase_Date_': rs[0].Purchase_Date, 'Purchase_Date': rs[0].Purchase_Date_, 'Supplier_Name': rs[0].Supplier_Name, 'Contact_No': rs[0].Contact_No, 'Amount': sum });


    }




  });

}
  get_product(parent) {
    var data = this.Product_Master_Rows.filter(e => e.PM_id == parent);

    return data;
  }


    public MM_Details_GF = [
      { Field: 'mm_projectname', Name: 'Project Name', Align: '', Type: 'text' },
      { Field: 'mm_no', Name: ' No', Align: '', Type: 'number' },
      { Field: 'mm_date', Name: '  Date', Align: '', Type: 'date' },
      { Field: 'mm_ledger_name', Name: ' Name', Align: '', Type: 'text' },
      { Field: 'mm_ledger_address1', Name: 'Address', Align: 'right', Type: 'text' },
      { Field: 'mm_net_amt', Name: 'Net Amount', Align: 'right', Type: 'number' },
    ];


  
  public MM_Details_Row = [];
  get_MM_Details() {
    this.isload = true;
    this.MM_Details_Row = [];

    this.get("Api/Transaction/get_Material_Movement_details?From=" + this.S_From + "&To=" + this.S_To+ "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.MM_Details_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }
    public stock_curr = [
    // { Field: 'pur_purchase_date', Name: 'Purchase Date', Align: '', Width: '20%', Type: 'date' },
    { Field: 'Uni_Code', Name: 'Code', Align: '', Width: '10%', Type: 'text' },
    { Field: 'Order_No', Name: 'OrderNo', Align: '', Width: '10%', Type: 'text' },
    { Field: 'Vour_Type', Name: 'VoucharType', Align: '', Width: '8%', Type: 'text' },
    { Field: 'Inward_Qty', Name: 'Qty', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_rate', Name: 'Rate', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_igst_per', Name: 'GST %', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_disc_per', Name: 'Disc %', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_total_disc_amt', Name: 'Disc', Align: 'right', Width: '8%', Type: 'number' },
    { Field: 'Rate', Name: 'Amount', Align: 'right', Width: '10%', Type: 'number' }
  ];


  public stock_curr_Row = [];
  get_stock_current_Row() {
    this.isload = true;
    this.stock_curr_Row = [];

    this.get("Api/Reports/get_current_wise_Report?From=" + this.S_From + "&To=" + this.S_To).subscribe((res: any) => {
      this.stock_curr_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }
    public stock_cate = [
    // { Field: 'pur_purchase_date', Name: 'Purchase Date', Align: '', Width: '20%', Type: 'date' },
    { Field: 'Voucher_No', Name: 'Code', Align: '', Width: '10%', Type: 'text' },
    { Field: 'Order_No', Name: 'OrderNo', Align: '', Width: '10%', Type: 'text' },
    { Field: 'Voucher_Date', Name: 'Date', Align: '', Width: '8%', Type: 'date' },
    { Field: 'Inward_Qty', Name: 'Qty', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_rate', Name: 'Rate', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_igst_per', Name: 'GST %', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_disc_per', Name: 'Disc %', Align: 'right', Width: '8%', Type: 'number' },
    // { Field: 'pur_total_disc_amt', Name: 'Disc', Align: 'right', Width: '8%', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Width: '10%', Type: 'number' }
  ];


  public stock_cate_Row = [];
  get_stock_category_Row() {
    this.isload = true;
    this.stock_cate_Row = [];

    this.get("Api/Reports/get_category_wise_Report?From=" + this.S_From + "&To=" + this.S_To).subscribe((res: any) => {
      this.stock_cate_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public Est_Details_Row = [];
  public Est_Details_GF = ['est_projectname', 'est_department', 'est_office', 'est_date', 'est_created_by'];
  get_Est_Details() {
    this.isload = true;
    this.Est_Details_Row = [];
    this.get("Api/Transaction/get_Estimation_details?From=" + this.S_From + "&To=" + this.S_To + "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.Est_Details_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }
  
  public header_Row: any = {}
  public Details_Row = [];
  public Sales_Temp_Row: any = {}; 
  public cart_item = [

  ];
  public From_Purchase: boolean=false;
  public Item_Master_Rows = [];
  public Item_Orderby_Name = "Category,Item_Name";
  public Item_Orderby_Product = "Item_Name";
  public Perment_Item_Master_Row = [];
  public Reset_Item_Master_Row = [];
  public Item_Row_Cout = 0;
  public Item_Master_RM_Rows = [];

public item_Category_ = "";
public Item_Category = [];

//public Supplierwise_Track_GF = ['Supplier', 'S_Value', 'Profit', 'Stock_Value', 'P_Value']; 
  public Ledger_Group = [];
  //public Ledger_Master_Rows = [];
  get_Ledger_Group() {
    this.isload = true;
    this.getc("Api/Master/get_Ledger_Group").subscribe((res: any) => {
      this.Ledger_Group = JSON.parse(res).record;
      this.isload = false;
      console.log()
    });

  }
  get_Ledger_group(data)
  {
      return  this.Ledger_Master_Row.filter(e=>e.cus_group_id==data);
  }


  public Estimate_Details_Rows = [];
  get_Estimate_Details() {
      
    this.getc("Api/transaction/get_Estimate_details1").subscribe((res: any) => {
      
      this.Estimate_Details_Rows = JSON.parse(res).record;

    });
  }

      public Deposit_Export = [
      { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'oc_category', Name: 'Category', Align: '', Type: 'text' },
      { Field: 'oc_projectname', Name: 'Ledger', Align: '', Type: 'text' },
      { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
      { Field: 'oc_received_bank', Name: 'Acc Name', Align: '', Type: 'text' },
      { Field: 'oc_amount', Name: 'Amount', Align: '', Type: 'number' },
      { Field: 'oc_created_by', Name: 'User', Align: 'right', Type: 'text' }
    ];

    public Income_Export = [
      { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'oc_category', Name: 'Category', Align: '', Type: 'text' },
      { Field: 'oc_ledger_name', Name: 'Ledger', Align: '', Type: 'text' },
      { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
      { Field: 'oc_received_bank', Name: 'Acc Name', Align: '', Type: 'text' },
      { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
      { Field: 'oc_created_by', Name: 'User', Align: '', Type: 'text' }
    ];

    public loan_Export = [
      { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'oc_category', Name: 'Category', Align: '', Type: 'text' },
      { Field: 'oc_ledger_name', Name: 'Ledger', Align: '', Type: 'text' },
      { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
      { Field: 'oc_received_bank', Name: 'Acc Name', Align: '', Type: 'text' },
      { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
      { Field: 'oc_created_by', Name: 'User', Align: '', Type: 'text' }
    ];

    public Expense_Export = [
      { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'oc_projectname', Name: 'project', Align: '', Type: 'text' },
      { Field: 'oc_ledger_name', Name: 'Ledger', Align: '', Type: 'text' },
      { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
      { Field: 'oc_received_bank', Name: 'Acc Name', Align: '', Type: 'text' },
      { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
      { Field: 'oc_created_by', Name: 'User', Align: '', Type: 'text' }
    ];

    public TransportMain_Export = [
      { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'oc_ledger_name', Name: 'Supplier', Align: '', Type: 'text' },
      { Field: 'oc_projectname', Name: 'project', Align: '', Type: 'text' },
      { Field: 'oc_narration1', Name: 'Expense', Align: '', Type: 'text' },
      { Field: 'oc_transport', Name: 'Vehicle No', Align: '', Type: 'text' },
      { Field: 'oc_nooflit', Name: 'No.of.Liters', Align: '', Type: 'number' },
      { Field: 'oc_perliter', Name: 'Per.Liters', Align: '', Type: 'number' },
      { Field: 'oc_km', Name: 'KM', Align: '', Type: 'number' },
      { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' }
    ];

    public Payment_Export = [
      { Field: 'AC_Date', Name: 'Date', Align: '', Type: 'date' },
      { Field: 'cb_project', Name: 'Project', Align: '', Type: 'text' },
      { Field: 'Bill_No', Name: 'BillNo', Align: '', Type: 'text' },
      { Field: 'Name', Name: 'Supplier', Align: '', Type: 'text' },
      { Field: 'cb_remarks', Name: 'Remarks', Align: '', Type: 'text' },
      { Field: 'cb_received_bank', Name: 'Bank', Align: 'right', Type: 'text' },
      { Field: 'Amount', Name: 'Amount', Align: '', Type: 'number' },
      { Field: 'cb_created_by', Name: 'User', Align: '', Type: 'text' }
    ];

  public oc_type="";
  public OtherCollection_Details_Row = [];
  get_OtherCollection_Details() {
    this.isload = true;
    this.OtherCollection_Details_Row = [];
    this.get("Api/Transaction/get_OtherCollection_details?From=" + this.S_From + "&To=" + this.S_To + "&Type=" + this.oc_type + "&Bank=" + this.S_Pay_Mode + "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.OtherCollection_Details_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }
  public Machiner_Details_GF = [
    { Field: 'oc_category', Name: 'Machiner Name', Align: '', Type: 'text' },
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_projectname', Name: 'Project Name', Align: '', Type: 'text' },
    { Field: 'oc_timeperiod', Name: 'TimePeriod', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
    { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' }
  ];

  public constructor_Details_GF = [
    { Field: 'oc_category', Name: 'Constructor Name', Align: '', Type: 'text' },
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_projectname', Name: 'Project Name', Align: '', Type: 'text' },
    { Field: 'oc_timeperiod', Name: 'TimePeriod', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
    { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' }
  ];



  
  public Dispg_code: boolean = false;
  //public STamilName: boolean = false;
  //public disp_category: boolean = false;
  public Grid_MPR_Disp: boolean = false;

  public Est_Search_GF = ['est_department','est_office','est_projectname'];
  public SProject_Rows = [];
  get_estimation() {
    this.isload = true;
   
    this.getc("Api/transaction/get_Estimation_details1").subscribe((res: any) => {
      this.isload = false;
      //this.Customer_Master_Rows = JSON.parse(res).record;
      this.SProject_Rows = JSON.parse(res).record;
    });
  }

  ////Payment

  Payment_Total_Amt = 0;
  Ledger_Payment_Row = [];
  get_Ledger_Payment(data) {
    this.isload = true;
    this.Payment_Total_Amt = 0;

    this.get("Api/Transaction/get_Ledger_Paid_Details?From=" + this.S_From + "&To=" + this.S_To+"&Ledger="+data).subscribe((res: any) => {
      this.Ledger_Payment_Row = JSON.parse(res).record;
      this.Payment_Total_Amt = (this.Ledger_Payment_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      this.isload = false;

    });

  }
  public Due_Amt=0;
  public selected_Out_customer: any = {}
  public selected_Out_supplier: any = {}
  public page_Name = "Payment_Entry";
  public M_From="";
  public RC_Bill_Amt_Check: boolean = true;

  public DB_Payment = 0;
  Payment_Details_Row = [];
  Payment_Row_Total = 0;
  Payment_Row_Cout = 0;
  get_Payment() {
    this.isload = true;
    this.DB_Payment = 0;
    this.get("Api/Transaction/get_Paid_Details?From=" + this.S_From + "&To=" + this.S_To + "&Bank=" + this.S_Pay_Mode).subscribe((res: any) => {
      this.Payment_Details_Row = JSON.parse(res).record;
      this.isload = false;
      try {

        this.Payment_Row_Total = (this.Payment_Details_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
        this.Payment_Row_Cout = this.Payment_Details_Row.length;
      } catch
      {

      }
      try {

        this.DB_Payment = (this.Payment_Details_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0));
      } catch
      {

      }
    });

  }

  
  public Area_Row = [];
  public Supplierwise_out_GF = ['Customer_Name', 'Amount', 'Phone_No'];
  public S_customer = "0";
  public Payment_Out=[];
  public Supplier_Outstand_Amt=0;
  public Supplier_Out = [];
  get_OutStanding_Supplier() {
    
    this.isload = true;
    this.get("Api/Transaction/get_Outstanding_Payment?Date=" + this.S_To +"&Customer="+this.S_customer+"&Area="+this.S_Area +"&Order_by=cb_billdate").subscribe((res: any) => {
      this.isload = false;
      this.Payment_Out = JSON.parse(res).record;
       this.Supplier_Out = JSON.parse(res).record;

      // this.Payment_Out = [];
      // var Ledger_ID = [...new Set(this.Supplier_Out.map(item => item.Ledger_ID))];


      // for (let data of Ledger_ID) {
      //   var sum = (this.Supplier_Out.filter(e => e.Ledger_ID == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      //   var count = [...new Set((this.Supplier_Out.filter(e => e.Ledger_ID == data)).map(item => item.Bill_No))].length;

      //   var crow = this.Customer_Master_Rows.filter(e => e.cus_id == data)[0];

        

      //   try {
      //     //if (Number(sum) != 0) {
      //       this.Payment_Out.push({ 'Customer_Name': crow.cus_name, 'Customer_ID': crow.cus_id, 'Area': crow.cus_city, 'Street': crow.cus_address1, 'Phone_No': crow.cus_contactno, 'count': 0, 'Amount': 0 });
      //     //}
      //   } catch { }
      // }

      // try {

      //   this.Supplier_Outstand_Amt = (this.Supplier_Out.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);


      // } catch
      // {

      // }


    });
  }


  public SupOutstanding_Report = [
  { Menu: 'Billwise', Link: '/report/billwise-supout' },
  { Menu: 'Supplierwise', Link: '/report/supplierwise-out' },
  { Menu: 'Due daywise', Link: '/report/duedaywise-supout' },

  ];
  public Billwise_Payable_outstanding_Export = [
    { Field: 'Bill_No', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'Bill_Date', Name: 'Bill Date', Align: '', Type: 'date' },
    { Field: 'Customer_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
    { Field: 'Phone_No', Name: 'Phone No', Align: '', Type: 'text' },
    { Field: 'Bill_Amount', Name: 'Bill Amt', Align: 'right', Type: 'number' },
    { Field: 'Amount', Name: 'Due Amt', Align: 'right', Type: 'number' }
  ];

  public Supplierwise_outstanding_Export = [
    { Field: 'Customer_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
    { Field: 'count', Name: 'count', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Duedaywise_Payable_out_Export = [
    { Field: 'Dues', Name: 'Dues', Align: '', Type: 'text' },
    { Field: 'count', Name: 'Bills Count', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Due Amt', Align: 'right', Type: 'number' }
  ];



public Billwise_Payable_out_GF = ['Customer_Name', 'Amount', 'Phone_No'];
  public Customer_Balance = 0;

public DB_payable = 0;
public DB_Due_Days_payable;
public DB_Due_Days_payable_=0;;
public Duedays_Payable_Out = [];

public Payable_Outstand_Amt = [];
public Supplierwise_Out = [];
public Billwise_Payable_Out = [];
public Payable_Outstanding_Rows = [];

get_Payable_OutStanding() {
  this.isload = true;
  this.DB_payable = 0;
  this.DB_Due_Days_payable_ = 0;

  this.get("Api/Reports/get_Purchase_outstanding?Date=" + this.S_To  + "&Customer=0&Area=" + this.S_Area + "&Type=" + this.select_mode + "&Order_by=Bill_Date").subscribe((res: any) => {

    this.Payable_Outstanding_Rows = JSON.parse(res).record;
    this.isload = false;

    this.Billwise_Payable_Out = [];
    var Purchase_No = [...new Set(this.Payable_Outstanding_Rows.map(item => item.Bill_No))];
    for (let data of Purchase_No) {
      var sum = (this.Payable_Outstanding_Rows.filter(e => e.Bill_No == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var rs = this.Payable_Outstanding_Rows.filter(e => e.Bill_No == data);

      this.Billwise_Payable_Out.push({ 'Bill_No': rs[0].Bill_No, 'Purchase_No': data, 'Bill_Date': rs[0].Bill_Date,  'Due_Date': rs[0].Due_Date_,'Customer_Name': rs[0].Customer_Name,'Due_Days': rs[0].Due_Days,'Ledger_ID': rs[0].Ledger_ID, 'Phone_No': rs[0].Contact_No, 'Bill_Amount': rs[0].Bill_Amount, 'Amount': sum });
    }
    for(var i=0;i<this.Billwise_Payable_Out.length;i++)
      {
      if(this.Billwise_Payable_Out[i]["Due_Days"]=="0")
      {
        this.DB_Due_Days_payable_=this.DB_Due_Days_payable_+1;
      }
      
      }
    
    this.Supplierwise_Out = [];
    var Ledger_ID = [...new Set(this.Payable_Outstanding_Rows.map(item => item.Ledger_ID))];


    console.log(Ledger_ID);
    for (let data of Ledger_ID) {
      var sum = (this.Payable_Outstanding_Rows.filter(e => e.Ledger_ID == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      var count = [...new Set((this.Payable_Outstanding_Rows.filter(e => e.Ledger_ID == data)).map(item => item.Bill_No))].length;

      var crow = this.PLedger_Master_Row.filter(e => e.cus_id == data)[0];//this.get_Ledger_group1('Supplier').filter(e => e.cus_id == data)[0];
      var rs = this.Payable_Outstanding_Rows.filter(e => e.Ledger_ID == data);


      try {
        if (Number(sum) != 0) {
          this.Supplierwise_Out.push({ 'Customer_Name': crow.cus_name, 'Customer_ID': crow.cus_id, 'Area': crow.cus_area, 'Street': crow.cus_area, 'Phone_No': crow.Phone_Number, 'Bill_No': rs[0].Bill_No, 'count': count, 'Amount': sum });
        }
      } catch { }
    }
    this.Duedays_Payable_Out = [];
    var Dues = [...new Set(this.Payable_Outstanding_Rows.map(item => item.Dues))];
    for (let data of Dues) {
      var sum = (this.Payable_Outstanding_Rows.filter(e => e.Dues == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

      var count = [...new Set((this.Payable_Outstanding_Rows.filter(e => e.Dues == data)).map(item => item.Bill_No))].length;

      this.Duedays_Payable_Out.push({ 'Dues': data, 'count': count, 'Amount': sum });
    }
    try {

      this.Payable_Outstand_Amt = (this.Payable_Outstanding_Rows.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);


    } catch
    {

    }
    try {

      this.DB_payable = (this.Payable_Outstanding_Rows.reduce((sum, current) => sum + parseFloat(current.Amount), 0));


    } catch
    {

    }



  });

}


  public Transport_Rows=[];

  public get_Vehicle()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_vehicle").subscribe((res: any) => {
      this.Transport_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }


  public Transport_Rpt_Rows=[];

  public get_Vehicle_Rpt(Type)
  {
    
    this.isload = true;
    this.get("Api/Master/get_vehicle?Type="+Type).subscribe((res: any) => {
      this.Transport_Rpt_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public TRM_From_Rows=[];

  public get_TRM_From()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_From_TRM").subscribe((res: any) => {
      this.TRM_From_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public TRM_To_Rows=[];

  public get_TRM_To()
  {
    this.isload = true;
    this.getc("Api/Master/get_To_TRM").subscribe((res: any) => {
      this.TRM_To_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public From_Area_Rows=[];

  public get_From_Area()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_From_Area").subscribe((res: any) => {
      this.From_Area_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public To_Area_Rows=[];

  public get_To_Area()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_To_Area").subscribe((res: any) => {
      this.To_Area_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public get_FromMaster_Rows=[];

  public get_FromMaster()
  {
    this.isload = true;
    this.getc("Api/Master/get_FromMaster").subscribe((res: any) => {
      this.get_FromMaster_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public Vehicle_Basic_Rate_Rows=[];

  public get_Vehicle_Basic_Rate()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_Vehicle_Basic_Rate").subscribe((res: any) => {
      this.Vehicle_Basic_Rate_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public Project_Rows=[];

  public get_Project()
  {
    
    this.isload = true;
    this.getc("Api/Master/get_Project").subscribe((res: any) => {
      this.Project_Rows = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public dashboard_data() {
    this.get_Payable_OutStanding();
    this.get_day_Book();
    this.get_Payment();
    this.get_Vehicle();
    this.get_TRM_From();
    this.get_TRM_To();
    this.get_Vehicle_Basic_Rate();
    this.get_Project();
    this.get_estimation();
    this.get_SLedger_Master();
    this.get_Ledger_Master2();
    this.get_Ledger_Master1();
    this.get_FromMaster();
    this.get_Bunk_Detail();
  }
  


  
  public Deposit_Details_Row = [];

public Deposit_Details_GF = [
  { Field: 'Project', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
  { Field: 'oc_projectname', Name: 'Type', Align: '', Type: 'text' },
  { Field: 'oc_timeperiod', Name: 'Paymode', Align: '', Type: 'text' },
  { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
  { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];

    
  public Inhouse_Details_Row = [];

public Inhouse_Details_GF = [
  { Field: 'oc_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'Project', Name: 'From Branch', Align: '', Type: 'text' },
  { Field: 'oc_projectname', Name: 'To Branch', Align: '', Type: 'text' },
  { Field: 'oc_from_bank', Name: 'From Bank', Align: '', Type: 'text' },
  { Field: 'oc_to_bank', Name: 'To Bank', Align: '', Type: 'text' },
  { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
  { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];



  public Userwise_Row = [];
  public Userwise_GF = ['Item_Name', 'User_', 'Amount', 'Qty'];


public Daywise_Details_GF = [
  { Field: 'oc_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'Project', Name: 'No of bills', Align: '', Type: 'number' },
  { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' },
];


  public Userwise_col_GF = ['Created_By', 'Amount'];
  public Areawise_col_GF = ['Area', 'Amount'];
  public Paymodewise_col_GF = ['Pay_Mode_', 'Amount'];
  public Custemerwise_col_GF = ['Customer', 'Amount'];
  public Entrywise_col_GF = ['Ledger_Name', 'Bill_No', 'Amount', 'Receipt_No'];
  public Collection_Row = [];
  public Customerwise_Coll_Row = [];
  public Userwise_Coll_Row = [];
  public Areawise_Coll_Row = [];
  public Paymodewise_Coll_Row = [];


  public Collection_Total_Amt = 0;
  get_Collections_Details()
  {
    this.isload = true;
    this.get("Api/Reports/get_Amount_Collection?From=" + this.S_From + "&To=" + this.S_To + "&Customer=" + this.S_customer + "&Area=" + this.S_Area + "&Pay_Mode=" + this.S_Pay_Mode + "&User=" + this.Search_User + "&order_by=Receipt_Date").subscribe((res: any) => {
      this.Collection_Row = JSON.parse(res).record;
      
      this.isload = false;
      var Ledger_Name = [...new Set(this.Collection_Row.map(item => item.Ledger_Name))];
      this.Customerwise_Coll_Row = [];
      for (let data of Ledger_Name) {
        var Amount_ = (this.Collection_Row.filter(e => e.Ledger_Name == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
        var rs = this.Collection_Row.filter(e => e.Ledger_Name == data);

        this.Customerwise_Coll_Row.push({ Ledger_Name: data,'Code': rs[0].Code, Amount: Amount_ })
      }
      var Created_By = [...new Set(this.Collection_Row.map(item => item.Created_By))];
      this.Userwise_Coll_Row = [];
      for (let data of Created_By) {
        var Amount_ = (this.Collection_Row.filter(e => e.Created_By == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

        this.Userwise_Coll_Row.push({ Created_By: data, Amount: Amount_ })
      }
      var Area = [...new Set(this.Collection_Row.map(item => item.Area))];
      this.Areawise_Coll_Row = [];
      for (let data of Area) {
        var Amount_ = (this.Collection_Row.filter(e => e.Area == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

        this.Areawise_Coll_Row.push({ Area: data, Amount: Amount_ })
      }
      var Pay_Mode_ = [...new Set(this.Collection_Row.map(item => item.Pay_Mode_))];
      this.Paymodewise_Coll_Row = [];
      for (let data of Pay_Mode_) {
        var Amount_ = (this.Collection_Row.filter(e => e.Pay_Mode_ == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);

        this.Paymodewise_Coll_Row.push({ Pay_Mode_: data, Amount: Amount_ })
      }




      try {

        this.Collection_Total_Amt = (this.Collection_Row.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);


      } catch
      {

      }


    });
  }


  public Billwise_Out = [];
  public Customerwise_Out = [];
  public Areawise_Out = [];
  public Streetwise_Out = [];
  public Sales_Personwise_Out = [];
  public Duedays_Out = [];
  public Areawise_out_GF = ['Area', 'Amount', 'count'];
  public Billwise_out_GF = ['Customer_Name', 'Amount', 'Phone_No'];
  public Customerwise_out_GF = ['Ledger_Name', 'Amount', 'Phone_Number','Loan_No','Loan_Amount','Area','Prin_Bal','Intr_Bal','Code'];
  // public Supplierwise_out_GF = ['Customer_Name', 'Amount', 'Phone_No'];
  get_OutStanding()
  {}

////////////////////////////////////////////////////////////////////

  public tpt_type="";
  public Transport_Entry_Details_Row = [];
  get_Transport_Entry_Details() {
    this.isload = true;
    this.Transport_Entry_Details_Row = [];
    this.get("Api/Transaction/get_Transport_Entry_details?From=" + this.S_From + "&To=" + this.S_To + "&Type=" + this.tpt_type
      + "&Branch_ID="+this.Branch_ID).subscribe((res: any) => {
      this.Transport_Entry_Details_Row = JSON.parse(res).record;
      this.isload = false;
    });

  }


  public JCB_Details_GF_ = ['tpt_projectname', 'tpt_transport','tpt_opening','tpt_closing','tpt_tothours', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
public JCB_Details_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_opening', Name: 'Opening ', Align: '', Type: 'text' },
  { Field: 'tpt_closing', Name: 'Closing ', Align: '', Type: 'text' },
  { Field: 'tpt_tothours', Name: 'Hours ', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount ', Align: 'right', Type: 'number' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];




public Tipper_Details_GF_ = ['tpt_projectname', 'tpt_transport', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
public Tipper_Details_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_from', Name: 'From', Align: '', Type: 'text' },
  { Field: 'tpt_to', Name: 'To', Align: '', Type: 'text' },
  { Field: 'tpt_material_name', Name: 'Material', Align: '', Type: 'text' },
  //{ Field: 'tpt_ttype', Name: 'Type', Align: '', Type: 'text' },
  { Field: 'tpt_load', Name: 'Load', Align: '', Type: 'text' },
  { Field: 'tpt_narration2', Name: 'Rate', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount ', Align: 'right', Type: 'number' },
  //{ Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];


public vehicle_entry_Details_GF_ = ['tpt_projectname', 'tpt_transport','tpt_date', 'tpt_material_name', 'tpt_load','tpt_ledger_address1', 'tpt_amount'];
public vehicle_entry_Details_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Name', Align: '', Type: 'text' },
  { Field: 'tpt_ledger_name', Name: 'Crusher', Align: '', Type: 'text' },
  { Field: 'tpt_ledger_address1', Name: 'Description', Align: '', Type: 'text' },
  { Field: 'tpt_material_name', Name: 'Type of Material', Align: '', Type: 'text' },
  { Field: 'tpt_narration3', Name: 'Unit', Align: '', Type: 'text' },
  { Field: 'tpt_load', Name: 'Load', Align: '', Type: 'text' },
  { Field: 'tpt_narration2', Name: 'Rate', Align: '', Type: 'text' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];

public Site_Visit_Details_GF = [
  { Field: 'oc_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'oc_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'oc_category', Name: 'Area', Align: '', Type: 'text' },
  { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];



public S_Transport="0";
public S_Type="";
public S_Project="all";
  public Transport_Report_Row = [];
  get_Transport_Report() {
    this.isload = true;
    this.Transport_Report_Row = [];

    this.get("Api/Reports/get_Transport_Report?From=" + this.S_From + "&To=" + this.S_To +"&transid="+ this.S_Transport+"&Project="+ this.S_Project+"&type="+ this.S_Type).subscribe((res: any) => {
      this.Transport_Report_Row = JSON.parse(res).record;
      this.isload = false;
      this.representatives=[];
    var tpt_transport=[...new Set(this.Transport_Report_Row.map(item => item.tpt_transport))];
    for (let data1 of tpt_transport) {
     this.representatives.push({'value':data1});
    }
    
      console.log(this.Transport_Report_Row);
    });

  }


  public Tipper_Reports_GF_ = ['tpt_projectname', 'tpt_transport', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
  public Tipper_Reports_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_from', Name: 'From', Align: '', Type: 'text' },
  { Field: 'tpt_to', Name: 'To', Align: '', Type: 'text' },
  { Field: 'tpt_material_name', Name: 'Material', Align: '', Type: 'text' },
  { Field: 'tpt_load', Name: 'Load', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount', Align: 'right', Type: 'number' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];


  public Tractor_Reports_GF_ = ['tpt_projectname', 'tpt_transport', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
  public Tractor_Reports_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_from', Name: 'From', Align: '', Type: 'text' },
  { Field: 'tpt_to', Name: 'To', Align: '', Type: 'text' },
  { Field: 'tpt_material_name', Name: 'Material', Align: '', Type: 'text' },
  { Field: 'tpt_ttype', Name: 'Type', Align: '', Type: 'text' },
  { Field: 'tpt_load', Name: 'Load', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount', Align: 'right', Type: 'number' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];


  public JCB_Reports_GF_ = ['tpt_projectname', 'tpt_transport', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
  public JCB_Reports_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_opening', Name: 'Opening ', Align: '', Type: 'text' },
  { Field: 'tpt_closing', Name: 'Closing ', Align: '', Type: 'text' },
  { Field: 'tpt_tothours', Name: 'Hours ', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount ', Align: 'right', Type: 'number' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];

  public Hitachi_Reports_GF_ = ['tpt_projectname', 'tpt_transport', 'tpt_from', 'tpt_to', 'tpt_material_name', 'tpt_load', 'tpt_amount'];
  public Hitachi_Reports_GF = [
  { Field: 'tpt_date', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'tpt_projectname', Name: 'Project Name', Align: '', Type: 'text' },
  { Field: 'tpt_transport', Name: 'Transport', Align: '', Type: 'text' },
  { Field: 'tpt_opening', Name: 'Opening ', Align: '', Type: 'text' },
  { Field: 'tpt_closing', Name: 'Closing ', Align: '', Type: 'text' },
  { Field: 'tpt_tothours', Name: 'Hours ', Align: '', Type: 'text' },
  { Field: 'tpt_amount', Name: 'Amount ', Align: 'right', Type: 'number' },
  { Field: 'tpt_remarks', Name: 'Remarks', Align: '', Type: 'text' },
];

    

public Contra_Export = [
  { Field: 'Ref_No', Name: 'No', Align: '', Type: 'text' },
  { Field: 'Ref_Date_', Name: 'Date', Align: '', Type: 'text' },
  { Field: 'From_Account_', Name: 'From', Align: '', Type: 'text' },
  { Field: 'To_Account_', Name: 'To', Align: '', Type: 'text' },
  { Field: 'Naration', Name: 'Description', Align: '', Type: 'text' },
  { Field: 'Amount', Name: 'Amount', Align: 'right', Type: 'number' }
];


  public Contra_Details_GF = [ 'Naration', 'Amount','From_Account','To_Account'];
  public Contra_Rows = [];
  public Contra_Total = 0;
  get_Contra() {
    this.isload = true;
    this.Contra_Rows = [];
    this.get("Api/Transaction/get_Contra?From=" + this.S_From + "&To=" + this.S_To +  "&Pay_Mode=" + this.S_Pay_Mode+  "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
      this.Contra_Rows = JSON.parse(res).record;
      this.isload = false;
      try {
        this.Contra_Total = 0;
        this.Contra_Total = (this.Contra_Rows.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      } catch
      { }
    });

  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

public Cus_Type="Ledger";
public Status="A";
public cus_order_by=" cus_name asc";


public Ledger_Rows1 = [];
get_SLedger_Master() {
this.isload = true;
  this.get("Api/Master/get_Ledger_Master?Status="+this.Status+"&Type="+this.Cus_Type+"&Order_by="+this.cus_order_by).subscribe((res: any) => {
    this.isload = false;
    this.Ledger_Master_Rows = JSON.parse(res).record;
    this.Ledger_Rows1 = JSON.parse(res).record;
  });
}




public GST2b_Details_GF = [ 'Naration', 'Amount','From_Account','To_Account'];
  public GST2b_Rows = [];
  get_GST2b() {
    this.isload = true;
    this.GST2b_Rows = [];
    this.get("Api/Transaction/get_GST2b?From=" + this.S_From + "&To=" + this.S_To ).subscribe((res: any) => {
      this.GST2b_Rows = JSON.parse(res).record;
      this.isload = false;
    });

  }


  public GST2b_comparison_Details_GF = [ 'Name', 'GSTNo','Amount','BAmount'];
  public GST2b_comparison_Rows = [];
  get_GST2b_comparison_reports() {
    this.isload = true;
    this.GST2b_comparison_Rows = [];
    this.get("Api/Reports/get_Gst_Comparison_Report?From=" + this.S_From + "&To=" + this.S_To ).subscribe((res: any) => {
      this.GST2b_comparison_Rows = JSON.parse(res).record;
      this.isload = false;
    });

  }


  //Transport Module///////////////////////////////////////////

  public tyre_order_by=" ty_id asc";

  public Tyre_Master_col_GF = ['ty_purno','ty_purdate', 'ty_ledger_name', 'ty_no', 'ty_type', 'ty_size','ty_refno','ty_amount'];
public Tyre_Master_Rows = [];
get_Tyre_Master() {
  this.Tyre_Master_Rows = [];
this.isload = true;
  this.get("Api/Master/get_Tyre_Master?Status="+this.Status+"&Order_by="+this.tyre_order_by).subscribe((res: any) => {
    this.isload = false;
    this.Tyre_Master_Rows = JSON.parse(res).record;
  });
}


public tyre_entry_order_by=" dbo.Date_(trr_date) asc";

public Tyre_Entry_col_GF = ['trr_date','trr_vehicle_no', 'trr_position', 'trr_area', 'trr_asmdate', 'trr_km','trr_tyre_no', 'trr_amount'];
public Tyre_Entry_Rows = [];
get_Tyre_Entry() {
this.Tyre_Entry_Rows = [];
this.isload = true;
this.get("Api/Transaction/get_Tyre_Entry?From=" + this.S_From + "&To=" + this.S_To +"&Order_by="+this.tyre_entry_order_by+ "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
  this.isload = false;
  this.Tyre_Entry_Rows = JSON.parse(res).record;
});
}


public tyre_entry_order_by1=" trr_date asc";
public Tyre_Entry_Rows1 = [];
get_Tyre_Entry_Report() {
this.Tyre_Entry_Rows1 = [];
this.isload = true;
this.get("Api/Reports/get_Tyre_Entry_Report?From=" + this.S_From + "&To=" + this.S_To +"&Order_by="+this.tyre_entry_order_by1).subscribe((res: any) => {
  this.isload = false;
  this.Tyre_Entry_Rows1 = JSON.parse(res).record;
  this.representatives=[];
var trr_vehicle_no=[...new Set(this.Tyre_Entry_Rows1.map(item => item.trr_vehicle_no))];
for (let data1 of trr_vehicle_no) {
 this.representatives.push({'value':data1});
}
});

}


  public Tyre_Report_Export = [
    // { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'trr_date', Name: 'Date', Align: '', Type: 'text' },
    { Field: 'trr_qty', Name: 'Qty', Align: '', Type: 'number' },
    { Field: 'ty_purno', Name: 'Billno', Align: '', Type: 'text' },
    { Field: 'trr_tyre_no', Name: 'SL.No', Align: '', Type: 'text' },
    { Field: 'ty_Brand', Name: 'Brand', Align: '', Type: 'text' },
    { Field: 'ty_size', Name: 'Size', Align: '', Type: 'text' },
    { Field: 'trr_vehicle_no', Name: 'VehicleNo', Align: '', Type: 'text' },
    { Field: 'trr_position', Name: 'Wheel Position', Align: '', Type: 'text' },
    { Field: 'trr_km', Name: 'KM', Align: '', Type: 'number' },
    { Field: 'trr_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];


  public Tyre_Entry_Report_Export = [
    // { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'trr_date', Name: 'Date', Align: '', Type: 'text' },
    { Field: 'trr_vehicle_no', Name: 'VehicleNo', Align: '', Type: 'text' },
    { Field: 'trr_tyre_no', Name: 'TyreNo', Align: '', Type: 'text' },
    { Field: 'trr_area', Name: 'Area', Align: '', Type: 'text' },
    { Field: 'trr_position', Name: 'Wheel Position', Align: '', Type: 'text' },
    { Field: 'trr_asmdate', Name: 'Assembly date', Align: '', Type: 'text' },
    { Field: 'trr_km', Name: 'KM', Align: '', Type: 'number' },
    { Field: 'trr_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

// log book
  public log_book_Export = [
    //{ Field: 'lbe_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'Veh_Type', Name: 'Type', Align: '', Type: 'text' },
    { Field: 'lbe_vehicle_no', Name: 'VehicleNo', Align: '', Type: 'text' },
    { Field: 'lbe_starting_km', Name: 'Openingkm', Align: '', Type: 'number' },
    { Field: 'lbe_closing_km', Name: 'Closingkm', Align: '', Type: 'number' },
    { Field: 'Total_Running_KM', Name: 'TotalKM', Align: 'right', Type: 'number' },
    { Field: 'Total_Diesel', Name: 'Diesel', Align: 'right', Type: 'number' },
    { Field: 'PerKm', Name: 'Mileage', Align: 'right', Type: 'number' },
  ];


public log_Details_GF = ['lbe_vehicle_no', 'lbe_date', 'lbe_starting_place', 'lbe_starting_km','lbe_closing_place','lbe_closing_km','lbe_running_km','lbe_remarks', 'lbe_created_by'];
public Log_Book_Details_Order_by=" convert(varchar,lbe_date,112),lbe_id desc";
public Log_Book_Details_Row = [];
get_Log_Book_Details() {
  this.isload = true;
  this.Log_Book_Details_Row = [];
  this.get("Api/Transaction/get_Log_Book_Entry?From=" + this.S_From + "&To=" + this.S_To + "&Order_by=" + this.Log_Book_Details_Order_by + "&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
    this.Log_Book_Details_Row = JSON.parse(res).record;
    this.isload = false;
   
  });

  
}
public Log_Book_Details_Rows = [];

get_Log_Book_Entry_Reports() {
    this.isload = true;
    this.Log_Book_Details_Rows = [];
    this.get("Api/Reports/get_Log_Book_Entry_Report?From=" + this.S_From + "&To=" + this.S_To ).subscribe((res: any) => {
      this.Log_Book_Details_Rows = JSON.parse(res).record;
      this.isload = false;
      this.representatives=[];
    var lbe_vehicle_no=[...new Set(this.Log_Book_Details_Rows.map(item => item.lbe_vehicle_no))];
    for (let data1 of lbe_vehicle_no) {
     this.representatives.push({'value':data1});
    }
    
      console.log(this.Log_Book_Details_Rows);
      
    });

  }

//bunk-reports
public Book_Details_Rows =[];

public bunk_Detail_GF = [ 'be_date', 'be_product','be_category','be_narration1',,'be_ledger_name','be_projectname','be_rate','be_type','be_amount',];
public TotalAmount = 0;

get_Bunk_Entry_Reports() {
  
    this.isload = true;
    this.Book_Details_Rows = [];
    this.get("Api/Reports/get_Bunk_Entry_Report?From=" + this.S_From + "&To=" + this.S_To ).subscribe((res: any) => {
      this.Book_Details_Rows = JSON.parse(res).record;
      this.isload = false;
      try {
        this.TotalAmount = 0;
        this.TotalAmount = (this.Book_Details_Rows.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
      } catch
      { }
      this.representatives=[];
    var Category=[...new Set(this.Book_Details_Rows.map(item => item.Category))];
    for (let data1 of Category) {
     this.representatives.push({'value':data1});
    }
    
      console.log(this.Book_Details_Rows);
      
    });

  }

  //
get_Closing_No(data)
{
  this.get("Api/Transaction/get_Closing_No?lbe_vehicle_id=" +data).subscribe((res: any) => {
   this.Ledger_Amt= res;
  });
}

// Daily_Bunk_Entry
  public Daily_Bunk_Export = [
    //{ Field: 'dbe_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'dbe_bunk_no', Name: 'Name', Align: '', Type: 'text' },
    { Field: 'dbe_bunk_opening', Name: 'Opening', Align: '', Type: 'number' },
    { Field: 'dbe_bunk_closing', Name: 'Closing', Align: '', Type: 'number' },
    { Field: 'dbe_closing_liter', Name: 'Total Sales', Align: '', Type: 'number' },
    { Field: 'dbe_bunk_rate', Name: 'Rate', Align: 'right', Type: 'number' },
    { Field: 'dbe_bunk_Amount', Name: 'Amount', Align: '', Type: 'number' },
    //{ Field: 'dbe_remarks', Name: 'Remarks', Align: 'right', Type: 'text' },
  ];



public Daily_Details_GF = ['dbe_bunk_no', 'dbe_date', 'dbe_bunk_opening', 'dbe_opening_liter','dbe_bunk_closing','dbe_closing_liter','dbe_bunk_rate','dbe_bunk_Amount','dbe_remarks', 'dbe_created_by'];


public Daily_Bunk_Details_Order_by=" convert(varchar,dbe_date,112),dbe_id desc";

public Daily_Bunk_Details_Row = [  ];
get_Daily_Bunk_Entry_Details() {
  this.isload = true;
  this.Daily_Bunk_Details_Row = [];
  this.get("Api/Transaction/get_Daily_Bunk_Entry_Details?From=" + this.S_From + "&To=" + this.S_To + "&Order_by=" + this.Daily_Bunk_Details_Order_by ).subscribe((res: any) => {
    this.Daily_Bunk_Details_Row = JSON.parse(res).record;
    this.isload = false;
  });

}

//bunk-entry-report
public Bunk_Details_Order_by=" dbe_bunk_no asc";
public Bunk_Entry_Details_Row = [  ];
public representatives=[];
get_Bunk_daily_Entry_reports() {
  this.isload = true;
  this.Bunk_Entry_Details_Row = [];
  this.get("Api/Reports/get_Bunk_daily_Entry_report?From=" + this.S_From + "&To=" + this.S_To + "&Order_by=" + this.Bunk_Details_Order_by ).subscribe((res: any) => {
    this.isload = false;
    this.Bunk_Entry_Details_Row = JSON.parse(res).record;
    
    this.representatives=[];
    var dbe_bunk_no=[...new Set(this.Bunk_Entry_Details_Row.map(item => item.dbe_bunk_no))];
    for (let data2 of dbe_bunk_no) {
     this.representatives.push({'value':data2});
    }
    

  });

}

  public bunk_export1 = [
    //{ Field: 'Date', Name: 'Date', Align: '', Type: 'date' },
    //{ Field: 'Product', Name: 'Product', Align: '', Type: 'text' },
    { Field: 'Category', Name: 'Category', Align: '', Type: 'text' },
    { Field: 'LedgerDescription', Name: 'Ledger&Description', Align: '', Type: 'text' },
    //{ Field: 'Description', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'site', Name: 'site', Align: '', Type: 'text' },
    //{ Field: 'Liter', Name: 'Liter', Align: 'right', Type: 'number' },
    //{ Field: 'Rate', Name: 'Rate', Align: '', Type: 'number' },
    { Field: 'Amount', Name: 'Amount', Align: '', Type: 'number' },
  ];




//bunk////
  public bunk_export = [
    { Field: 'be_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'be_product', Name: 'Product', Align: '', Type: 'text' },
    { Field: 'be_category', Name: 'Category', Align: '', Type: 'text' },
    { Field: 'be_ledger_name', Name: 'ledger', Align: '', Type: 'text' },
    { Field: 'be_narration1', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'be_projectname', Name: 'Project', Align: '', Type: 'text' },
    { Field: 'be_qty', Name: 'liter', Align: 'right', Type: 'number' },
    { Field: 'be_km', Name: 'KM', Align: '', Type: 'number' },
    { Field: 'be_rate', Name: 'Rate', Align: '', Type: 'number' },
    { Field: 'be_amount', Name: 'Amount', Align: '', Type: 'number' },
    { Field: 'be_created_by', Name: 'CreatedBy', Align: '', Type: 'text' },
  ];



public bunk_Details_GF = [ 'be_date', 'be_product','be_category','be_narration1',,'be_ledger_name','be_projectname','be_qty','be_km','be_rate','be_type','be_amount',];
public bunk_Rows = [];
get_Bunk_Detail() {
  this.isload = true;
  this.bunk_Rows = [];
  this.get("Api/Transaction/get_Bunk_Detail?From=" + this.S_From + "&To=" + this.S_To).subscribe((res: any) => {
    this.bunk_Rows = JSON.parse(res).record;
    this.isload = false;
    this.representatives=[];
    var be_category=[...new Set(this.bunk_Rows.map(item => item.be_category))];
    for (let data1 of be_category) {
     this.representatives.push({'value':data1});
    }
    try {
      this.Contra_Total = 0;
      this.Contra_Total = (this.bunk_Rows.reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
    } catch
    { }
  });

}
////



////////////purchase-report////////////
  public Pur_Export1 = [
    { Field: 'pur_ledger_name', Name: 'Supplier', Align: '', Type: 'text' },
    { Field: 'pur_gst_no', Name: 'GstNO', Align: '', Type: 'text' },
    { Field: 'pur_bill_no', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'pur_bill_date', Name: 'Bill Date', Align: '', Type: 'date' },
    { Field: 'pur_hsn_code', Name: 'HSNCode', Align: '', Type: 'text' },
    { Field: 'pur_qty', Name: 'Qty', Align: '', Type: 'number' },
    { Field: 'UOM', Name: 'UOM', Align: '', Type: 'text' },
    { Field: 'INV_Value', Name: 'INVOICE Amount', Align: 'right', Type: 'number' },
    { Field: 'pur_gst_per', Name: 'GST Per', Align: '', Type: 'number' },
    { Field: 'Taxable_amount', Name: 'Taxable Amount', Align: 'right', Type: 'number' },
    { Field: 'igst_amt', Name: 'IGST Amount', Align: 'right', Type: 'number' },
    { Field: 'sgst_amt', Name: 'SGST Amount', Align: 'right', Type: 'number' },
    { Field: 'cgst_amt', Name: 'CGST Amount', Align: 'right', Type: 'number' },
  ];

  public Bill_Type1="";
  public Pur_Type1="Purchase";
  public Pur_Details_Row1 = [];
  get_Auditor_pruchase_Reports() {
    this.isload = true;
    this.Pur_Details_Row1 = [];
    this.get("Api/Reports/get_Auditor_pruchase_Report?From=" + this.S_From + "&To=" + this.S_To + "&Type=" + this.Pur_Type1).subscribe((res: any) => {
      this.Pur_Details_Row1 = JSON.parse(res).record;
      this.isload = false;
      this.representatives=[];
    var pur_ledger_name=[...new Set(this.Pur_Details_Row1.map(item => item.pur_ledger_name))];
    for (let data1 of pur_ledger_name) {
     this.representatives.push({'value':data1});
    }
    
      console.log(this.Pur_Details_Row1);
    });
  }


  ///Vechile mainteance//


    public Fuel_Entry_Report_Export = [
    // { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'be_ledger_name', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'be_date', Name: 'Date', Align: '', Type: 'date' },
    // { Field: 'be_ledger_name', Name: 'Supplier', Align: '', Type: 'text' },
    { Field: 'be_product', Name: 'product', Align: '', Type: 'text' },
    { Field: 'be_category', Name: 'Category', Align: '', Type: 'text' },
    { Field: 'be_qty', Name: 'No.of.Ltrs', Align: '', Type: 'number' },
    { Field: 'be_rate', Name: 'Per.Ltr', Align: '', Type: 'number' },
    { Field: 'be_km', Name: 'KM', Align: '', Type: 'number' },
    { Field: 'KM', Name: 'TotalKM', Align: '', Type: 'number' },
    { Field: 'PerKm', Name: 'p/KM', Align: '', Type: 'number' },
    { Field: 'be_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Fuel_Entry_report_GF = ['be_ledger_name', 'be_date', 'be_category', 'be_qty', 'be_rate','be_km','be_amount'];
  public Fuel_Entry_Report_Row = [];
  get_Fuel_Entry_Report() {
    this.isload = true;
    this.get("Api/Reports/get_Fuel_Entry_Reports?From=" + this.S_From + "&To=" + this.S_To +"&Type=bunk").subscribe((res: any) => {
      this.Fuel_Entry_Report_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }

    public Vehicle_Maintenance_report_Export = [
    { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_ledger_name', Name: 'Supplier', Align: '', Type: 'text' },
    { Field: 'oc_category', Name: 'Expense', Align: '', Type: 'text' },
    { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Vehicle_Maintenance_report_GF = ['oc_vehicle_no', 'oc_date', 'oc_ledger_name', 'oc_category', 'oc_narration1', 'oc_amount'];
  public Vehicle_Maintenance_Report_Row = [];
  
  
  get_Vehicle_Maintenance_Report() {
    this.isload = true;
    this.get("Api/Reports/get_Vehicle_Maintenance_Reports?From=" + this.S_From + "&To=" + this.S_To +"&Type=Vehicle Maintanace").subscribe((res: any) => {
      this.Vehicle_Maintenance_Report_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }


  public Vechile_Wise_Expense_Report_Export = [
    // { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_ledger_name', Name: 'Supplier', Align: '', Type: 'text' },
    { Field: 'oc_category', Name: 'Expense', Align: '', Type: 'text' },
    { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public S_Vehicle_No="0";
  public Vechile_Wise_Expense_report_GF = ['oc_vehicle_no', 'oc_date', 'oc_ledger_name', 'oc_category', 'oc_narration1', 'oc_amount'];
  public Vechile_Wise_Expense_Report_Row = [];
  get_Vechile_Wise_Expense_Report() {
    this.isload = true;
    this.get("Api/Reports/get_Vechile_Wise_Expense_Reports?From=" + this.S_From + "&To=" + this.S_To +"&Type=Vehicle Maintanace" + "&VehicleNo=" + this.S_Vehicle_No).subscribe((res: any) => {
      this.Vechile_Wise_Expense_Report_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }

  public Supplier_Wise_Expense_Report_Export = [
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_invoice_no', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'oc_vehicle_no', Name: 'Vehicle No', Align: '', Type: 'text' },
    { Field: 'oc_category', Name: 'Expense', Align: '', Type: 'text' },
    { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public S_Supplier="0";
  public Supplier_Wise_Expense_report_GF = ['oc_vehicle_no','oc_invoice_no', 'oc_date', 'oc_ledger_name', 'oc_category', 'oc_narration1', 'oc_amount'];
  public Supplier_Wise_Expense_Report_Row = [];
  get_Supplier_Wise_Expense_Report() {
    this.isload = true;
    this.get("Api/Reports/get_Supplier_Wise_Expense_Reports?From=" + this.S_From + "&To=" + this.S_To +"&Type=Vehicle Maintanace" + "&Supplier=" + this.S_Supplier).subscribe((res: any) => {
      this.Supplier_Wise_Expense_Report_Row = JSON.parse(res).record;
      this.isload = false;
    });
  }
  
  public Expense_Report_Export = [
    { Field: 'oc_date', Name: 'Date', Align: '', Type: 'date' },
    { Field: 'oc_category', Name: 'Category', Align: '', Type: 'text' },
    { Field: 'oc_ledger_name', Name: 'Ledger', Align: '', Type: 'text' },
    { Field: 'oc_narration1', Name: 'Description', Align: '', Type: 'text' },
    { Field: 'oc_paymode', Name: 'Pay Mode', Align: '', Type: 'text' },
    { Field: 'oc_remarks', Name: 'Remarks', Align: '', Type: 'text' },
    { Field: 'oc_amount', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Expense_Report_GF = ['oc_date', 'oc_category', 'oc_ledger_name', 'oc_paymode', 'oc_narration1', 'oc_remarks', 'oc_amount'];
  public Expense_Report_Rows = [];
  public Expense_Group_Report_Rows = [];
  get_Expense_Report() {
    this.isload = true;
    this.Expense_Report_Rows = [];
    this.get("Api/reports/get_Expense_Report?From=" + this.S_From + "&To=" + this.S_To ).subscribe((res: any) => {
      this.Expense_Report_Rows = JSON.parse(res).record;
      this.isload = false;
  
    //   var category = [...new Set(this.Expense_Report_Rows.map(item => item.oc_category))];
    //   this.Expense_Group_Report_Rows = [];
    //   for (let data of category) {
    //     var Amount_ = (this.Itemwise_purchase_Row.filter(e => e.Item_Name == data).reduce((sum, current) => sum + parseFloat(current.Amount), 0)).toFixed(2);
  
    //     this.Expense_Group_Report_Rows.push({ Item_Name: data, Qty: Qty_, Amount: Amount_,Profit:Profit_ ,S_Rate:S_Rate_})
    //   }
     });

  }

  public RM_all_item:boolean=true;
  get_Item_Master() {
  debugger
    this.loading = true;
    this.isload = true;
    this.Item_Master_Rows = [];
    this.get("Api/Master/get_Item_Master?Order_by=" + this.Item_Orderby_Name).subscribe((res: any) => {
      this.loading = false;
      this.Item_Master_Rows = JSON.parse(res).record;
      this.Perment_Item_Master_Row = JSON.parse(res).record;
  
      
    });
  }
  open_purchase_pdf(data) {
    window.open(this.Server_URL + "report/Purchase_Order?PO_No=" + data.dc_no + "&Company=" + this.Company, "_blank");
  }

public Purchase_Type="Purchase";
public Purchase_Item_Rowdata = "";
public Purchase_Date = "";
public Purchase_Customer: any = {};
public Purchase_Item_Row = [];
public Delivery_Challan_Item_Row = [];
public Delivery_Challan_Details() {
  this.isload = true;
  this.Delivery_Challan_Item_Row = [];
  this.get("Api/EInvoice/get_Delivery_Challan_Item?ID=" + this.Purchase_Item_Rowdata + "&From=" + this.S_From + "&To=" + this.S_To+ "&order_by=dc_bill_date desc").subscribe((res: any) => {
  this.Delivery_Challan_Item_Row = JSON.parse(res).record;
  this.Purchase_Customer = this.Delivery_Challan_Item_Row[0];
      this.isload = false;
  
    });
  
  }

public Delivery_Challan_GF = [];
public Delivery_Challan_Export = [];
public Delivery_Challan_Row = [];
get_Delivery_Challan_Details() {
  this.isload = true;
  this.Delivery_Challan_Row = [];
  
  this.get("Api/EInvoice/get_Delivery_Challan_Details?From=" + this.S_From  + "&To=" + this.S_To + "&User=" + this.Search_User + "&Type=" + this.Purchase_Type + "&order_by=dc_no&Branch_ID=" + this.Branch_ID).subscribe((res: any) => {
    
    this.isload = false;
    this.Delivery_Challan_Row = JSON.parse(res).record;

  });

}


public Eway_Bill_Data:any ={};
public einvoice_Data:any ={};

  public Purchase_Gst_Export = [
    { Field: 'Bill_No', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'Bill_Date', Name: 'Bill Date', Align: '', Type: 'date' },
    { Field: 'Ledger_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
    { Field: 'GST_No', Name: 'GST No', Align: 'right', Type: 'text' },
    { Field: 'Taxable_Amount', Name: 'Taxable', Align: 'right', Type: 'number' },
    { Field: 'IGST_Amt', Name: 'IGST', Align: 'right', Type: 'number' },
    { Field: 'SGST_Amt', Name: 'SGST', Align: 'right', Type: 'number' },
    { Field: 'CGST_Amt', Name: 'CGST', Align: 'right', Type: 'number' },
    { Field: 'Tax_Amt', Name: 'Tax', Align: 'right', Type: 'number' },
    { Field: 'Net_Amt', Name: 'Amount', Align: 'right', Type: 'number' }
  ];


  public Purchase_Gst_Report = [
    { Menu: 'Purchase GST', Link: '/report/purchase-gst-report', class: '' },
    { Menu: 'Purchase GST(%)', Link: '/report/purchase-gst-one', class: '' },
    // { Menu: 'GST Non Tax ', Link: '/report/gst-non-tax', class: '' },
    { Menu: 'HSNwise Tax ', Link: '/report/purchase-hsnwise-tax', class: '' },
  ];


  public Purchase_Details_GF = ['Customer_Name', 'Bill_No', 'Area'];
  public Purchase_Row = [];
  get_Purchase_Details() {
    this.isload = true;
    this.Purchase_Row = [];

    this.get("Api/Reports/get_Purchase_Detail?From=" + this.S_From + "&To=" + this.S_To + "&User=" + this.Search_User + "&Bill_Type=" + this.S_Bill_Type + "&Area=" + this.S_Area + "&order_by=pur_bill_date,pur_bill_no").subscribe((res: any) => {
      this.Purchase_Row = JSON.parse(res).record;
      this.isload = false;
      
      

    });

  }


  public Purchase_Gst_one_Export = [
  { Field: 'Bill_No', Name: 'Bill No', Align: '', Type: 'text' },
  { Field: 'Bill_Date', Name: 'Bill Date', Align: '', Type: 'date' },
  { Field: 'Ledger_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
  { Field: 'GST_No', Name: 'GST No', Align: 'right', Type: 'text' },
  { Field: 'Sub_Total', Name: 'Amount', Align: 'right', Type: 'number' },
  { Field: 'Disc_Amt', Name: 'Disc Amt', Align: 'right', Type: 'number' },
  { Field: 'Taxable_Amount', Name: 'Gross Amt', Align: 'right', Type: 'number' },
  { Field: 'GST_Taxable_0', Name: '0PerAmt', Align: 'right', Type: 'number' },
  { Field: 'GST_Taxable_5', Name: '5PerAmt', Align: 'right', Type: 'number' },
  { Field: 'GST_Taxable_12', Name: '12PerAmt', Align: 'right', Type: 'number' },
  { Field: 'GST_Taxable_18', Name: '18PerAmt', Align: 'right', Type: 'number' },
  { Field: 'GST_Taxable_28', Name: '28PerAmt', Align: 'right', Type: 'number' },
  { Field: 'GST_Tax_0', Name: '0Per', Align: 'right', Type: 'number' },
  { Field: 'GST_Tax_5', Name: '5Per', Align: 'right', Type: 'number' },
  { Field: 'GST_Tax_12', Name: '12Per', Align: 'right', Type: 'number' },
  { Field: 'GST_Tax_18', Name: '18Per', Align: 'right', Type: 'number' },
  { Field: 'GST_Tax_28', Name: '28Per', Align: 'right', Type: 'number' },
  { Field: 's_Tax', Name: 'GST_Amt', Align: 'right', Type: 'number' },
  { Field: 'Net_Amt', Name: 'Net Amt', Align: 'right', Type: 'number' }
];

public Purchase_Gst_Row = [];
  get_Purchase_Gst_Details() {
    this.isload = true;
    this.Purchase_Gst_Row = [];
    this.get("Api/Reports/get_Purchase_Gst_Detail?From=" + this.S_From + "&To=" + this.S_To + "&User=" + this.Search_User + "&Bill_Type=" + this.S_Bill_Type + "&GST_No=" + this.S_GST_Type + "&Area=" + this.S_Area + "&order_by=Bill_Date,Bill_No").subscribe((res: any) => {
      this.Purchase_Gst_Row = JSON.parse(res).record;
      this.isload = false;

    });

  }

    public Pur_HSNWise_Gst_Export = [
    { Field: 'Invoice_No', Name: 'Bill No', Align: '', Type: 'text' },
    { Field: 'Invoice_Date', Name: 'Bill Date', Align: '', Type: 'date' },
    { Field: 'Ledger_Name', Name: 'Supplier Name', Align: '', Type: 'text' },
    { Field: 'GST_No', Name: 'GST No', Align: 'right', Type: 'text' },
    { Field: 'HSN_Code', Name: 'HSN_Code', Align: 'right', Type: 'text' },
    { Field: 'Qty', Name: 'Qty', Align: 'right', Type: 'number' },
    { Field: 'Taxable', Name: 'Taxable', Align: 'right', Type: 'number' },
    { Field: 'GST_Per', Name: 'GST(%)', Align: 'right', Type: 'number' },
    { Field: 'IGST', Name: 'IGST', Align: 'right', Type: 'number' },
    { Field: 'SGST', Name: 'SGST', Align: 'right', Type: 'number' },
    { Field: 'Net', Name: 'Amount', Align: 'right', Type: 'number' }
  ];

  public Pur_HSN_Details_GF = ['Ledger_Name', 'Invoice_No', 'Invoice_Date'];
  public DB_HSNWise_Total = 0;
  public Pur_HSNWise_GST_Row = [];
  get_Pur_HSNWise_GST() {
    this.isload = true;
    this.DB_HSNWise_Total = 0;
    this.Pur_HSNWise_GST_Row=[];
    this.get("Api/Reports/get_Pur_HSNWise_GST?From=" + this.S_From + "&To=" + this.S_To + "&User=" + this.Search_User + "&Bill_Type=" + this.S_Bill_Type+"&GST_No=" + this.S_GST_Type+"&Area=" + this.S_Area + "&order_by=Bill_Date,Bill_No").subscribe((res: any) => {
    this.Pur_HSNWise_GST_Row = JSON.parse(res).record;
    this.isload = false;

        
      try {
        this.DB_HSNWise_Total = this.Pur_HSNWise_GST_Row.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0);
      } catch { }

    });

  }

}
