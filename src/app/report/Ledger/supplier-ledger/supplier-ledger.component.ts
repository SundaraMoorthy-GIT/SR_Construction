import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
  import { HttpClient } from '@angular/common/http';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Location } from '@angular/common';
@Component({
  selector: 'app-supplier-ledger',
  templateUrl: './supplier-ledger.component.html',
  styleUrls: ['./supplier-ledger.component.scss']
})
export class SupplierLedgerComponent implements OnInit {

  ngOnInit() {
      
  }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
    this.isadd = appservice.isadd;
    this.add.Late_Fee=0;
    this.get_Pay_Mode();
    this.get_Banks();
    this.add.Receipt_Date = appservice.T_Date;
    this.add.ID = "0";
    if(this.appservice.Selected_Customer)
    {
      console.log(this.appservice.Selected_Customer);
    this.add.Ledger_ID=this.appservice.Selected_Customer.ID; 
    this.add.Ledger_Name=this.appservice.Selected_Customer.Ledger_Name; 
  // this.appservice.Ledger_ID=this.appservice.Selected_Customer.ID; 
  

    this.appservice.Selected_Customer={};
    }
  }
 
  load_p()
  {
    this.appservice.Ledger_Type = "2";
    return this.router.navigate(['/cutomer-search']);
  }

  get_Customer_Name(data)
  {
   this.add.Ledger_ID=data;
   this.get_Amount_OS();
  }

  get_Bill_No(data)
  {
    this.appservice.get("Api/Collection_/get_os_bills?ID="+data).subscribe(( res: any) => {
    this.Bill_No_ = JSON.parse(res).record; 

    if(this.Bill_No_)
    {
      this.add.Bill_No=this.Bill_No_[0].value;
      this.get_OS_Bill_Amount(this.Bill_No_[0].value)        
    }
    });
  }


  get_OS_Bill_Amount(Bill_No)
  {
    if(this.Bill_No_)
    {
    this.add.Bill_Amount=this.Bill_No_.filter(e=>e.label==Bill_No)[0]["Bill_Amount"];
    }
  }

  Bill_No_=[];
  Rows=[];
  cols=[];
  
  get_Amount_OS() {
  
    this.add.Bill_Amount="0";
    this.appservice.get("Api/Collection_/get_Amount_OS1?ID="+this.add.Ledger_ID+"&From=" + this.appservice.S_From + "&To=" + this.appservice.S_To).subscribe(( res: any) => {
    this.Rows = JSON.parse(res).record; 
    
    this.cols = [
        { field: 'Date', header: 'Date', width: '' },
        { field: 'Narration1', header: 'Narration', width: '' },
        { field: 'CR_Amt', header: 'Credit', width: 'right' },
        { field: 'DB_Amt', header: 'Debit', width: 'right' }
      ];
      try{
        // this.appservice.Ledger_cr= (this.Rows.reduce((sum, current) => sum +parseFloat(current.CR_Amt), 0)).toFixed(2);
        // this.appservice.Ledger_db= (this.Rows.reduce((sum, current) => sum +parseFloat(current.DB_Amt), 0)).toFixed(2);
        // this.appservice.Ledger_Total=this.appservice.Ledger_db-this.appservice.Ledger_cr;
        // this.add.Received_Amount=this.appservice.Ledger_Total;
        

    }catch
    {}

    });
  }
   
    export_excel()
  {
 
  //  this.appservice.Excel_Data.Header=this.appservice.Customer_Ledger_Export;
  //  this.appservice.Excel_Data.items=this.Rows
  //  this.appservice.Excel_Data.Report_Name="Customer Ledger"
  //  this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  // this.appservice.Excel_Data.Header=this.appservice.Customer_Ledger_Export;
  // this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  // this.appservice.Excel_Data.Total_Amount="Total Amount : "+this.appservice.sum_of(data,'Amount');
  // this.appservice.Excel_Data.items=this.Rows
  // this.appservice.Excel_Data.Report_Name="Customer Ledger"
  // this.appservice.export_pdf1();
  }
    
   
  get_Receipt_no() {
    this.appservice.getc("Api/Transaction/get_Receipt_No1").subscribe(( res: any) => {
      this.add.Receipt_No=res;
    });
  }

  public Banks_=[];
  get_Banks() {
    this.Banks_ =this.appservice.Bank_Master_Rows;
  }

  public Customers_=[];
  get_Customer() {
    this.get_Ledger_Master();
  }

  public Ledger_Master_Rows=[]; 
  get_Ledger_Master() { 
          this.appservice.getc("Api/Collection_/get_Out_Standing_Customer").subscribe((res: any) => { 
          this.Customers_ = JSON.parse(res).record; 

          try{
         this.add.Ledger_ID=this.appservice.Selected_Customer.ID;
         this.get_Amount_OS()
          }catch{}
  }); 
} 



  
  public Pay_Mode_=[]
  get_Pay_Mode() {
    var data="Pay_Mode";
    this.Pay_Mode_=this.appservice.Reference_Rows.filter(e => e.Ref_ID.toLowerCase().includes(data.toLocaleLowerCase()));

  }


  back()
  {
    this._location.back();
    
  }

  public btndisable:boolean =false;
  addData(f) {


    if(this.add.Bill_No=="")
    {
      this.toastr.error("Bill No Should not empty", "Error", { timeOut: 3000 });
      return;
    }
    
    if(this.add.Bill_Amount=="")
    {
      this.toastr.error("Bill Amount Should not empty", "Error", { timeOut: 3000 });
      return;
    }
    
    if(this.add.Received_Amount=="")
    {
      this.toastr.error("Bill No Should not empty", "Error", { timeOut: 3000 });
      return;
    }

   // if(parseFloat(this.add.Received_Amount)>parseFloat(this.add.Bill_Amount))
     // {
       // this.toastr.error("Received Amount is more than Bill Amount", "Error", { timeOut: 3000 });
       // return;
      //}

    f.form.value.Company = this.appservice.Company;
    f.form.value.Receipt_Date=this.add.Receipt_Date;
    f.form.value.Room_No=this.add.Room_No;
    f.form.value.Created_by=this.appservice.CREATED_BY;
    
    
  if(this.appservice.Pay_Mode!=this.appservice.Cash_ID)
  {
    if(this.add.Received_Bank==0)
    {
      this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
      return;
    }
  }
  else
  {
    this.add.Received_Bank=0
  }
    if (f.invalid === true)
      this.addValidation = true;
    else {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/insert_Amount_Collection', f.form.value, { headers: this.headers })
        .subscribe(
          (val: string) => {
            this.btndisable=false;
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              // this.appservice.get_Recipts();
              // this.appservice.get_OutStanding();
              this.Clear();
              f.submitted=false;
              this.appservice.back();
              this.isadd == "0";
                this.add.ID = "0";
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
  Back() {
    this._location.back();
  }
  Clear() {
    this.add =
      {
        'ID': '',
        'CIN_ID': '',
        'Receipt_No': '',
        'Voucher_No': '',
        'Receipt_Date': '',
        'Ledger_ID': '',
        'Received_Amount': '0',
        'Card_Charge': '0',
        'Late_Fee': '0',
        'Narration1': '',
        'Narration2': '',
        'Room_No':'',
        'Pay_Mode': '',
        'Received_Bank': '',
        'Cheque_No': '',
        'Cheque_Date': '',
        'Remarks': '',
        'Created_by': '',
        'Created_Date': '',
        'Status': '',
      };
  }
} 

