import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  public select_mode="Manual";

    ngOnInit() {
      
    }
    public tab=1;

    public rows = [];
    public txt_Ledger_Name="";
    public add: any = {};
    public addValidation: boolean = false;
    public btndisable1:boolean=false;
    headers;
    data;
    x=2;
    isadd = "0";
 
    constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) 
    {
        if (this.appservice.Branch_ID != 0) {
      this.add.cb_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
      this.isadd = appservice.isadd;
      
      this.add.Late_Fee=0;
      this.get_Pay_Mode();
      this.get_Banks();
      this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    if (this.isadd == "0") {
      this.add.cb_date = appservice.Pay_Date;
      this.add.cb_id = "0";
      this.add.cb_disc=0;
      this.add.cb_pay_mode=this.appservice.Default_Payment_ID;
      this.add.cb_received_bank=this.appservice.Default_Bank_ID;
     
    }
    else
    {
      this.add = appservice.Edit_Row;
     // this.add.Adj_Date = 1;
     try{
      this.add.cb_date = appservice.datefromat(appservice.Edit_Row.AC_Date);
      }
      catch{}
      this.add.cb_received_bank=this.appservice.Edit_Row.cb_received_bank1;
      this.add.ID=appservice.Edit_Row.cb_id;
      this.add.cb_ledger_id=appservice.Edit_Row.cb_ledger_id;
      this.add.Ledger_Name=appservice.Edit_Row.Name;
      this.txt_Ledger_Name=appservice.Edit_Row.Name;
      this.add.cb_billno=appservice.Edit_Row.cb_billno;
      this.add.cb_billamt=appservice.Edit_Row.cb_billamt;
      this.add.cb_project_id=appservice.Edit_Row.cb_project_id;
      this.add.cb_amountout=appservice.Edit_Row.cb_amountout;

    }
    if(this.appservice.selected_Out_supplier)
    {
    this.add.cb_ledger_id=this.appservice.selected_Out_supplier.Customer_ID; 
    this.add.Ledger_Name=this.appservice.selected_Out_supplier.Customer_Name; 
    this.txt_Ledger_Name=this.appservice.selected_Out_supplier.Customer_Name; 
    this.get_Bill_No(this.add.cb_ledger_id);
    this.get_Amount_OS(this.add.cb_ledger_id);
    this.appservice.selected_Out_supplier={};
    this.b_No="";
    }
    appservice.get_CR_DB_Amount(this.add.cb_received_bank);
    }


    Selected=false;
  select()
  {
    
    if(this.Selected==true)
    {
      //this.Selected=true;
      if(this.Bill_No_)
      {
      this.add.cb_billno=this.Bill_No_[0].value;
        this.get_OS_Bill_Amount(this.Bill_No_[0].value)        
      }
    }
    else
    {
      //this.Selected=false;
      this.add.cb_billno="";
      this.add.cb_billamt="0";
    }
  }


  onChange(data)
{
  
  this.appservice.Default_Payment_ID=data;
  this.appservice.DF_Paymode=this.appservice.get_ref('Pay_Mode').filter(e => e.label == data)[0].value; 
}

onChange1(data)
{
  this.add.cb_project=this.appservice.SProject_Rows.filter(e => e.value == data)[0].label;
}
  
    load_p()
    {
      this.appservice.page_Name='Payment_Entry'
      this.appservice.vType="Supplier";
      this.appservice.Cus_Type="Supplier";
      this.appservice.get_Ledger_Master();
      this.router.navigate(['/report/outstanding-supplier']);
    }

    get_Customer_Name(data)
    {
     this.add.cb_ledger_id=data;
     this.get_Amount_OS(this.add.cb_ledger_id);
    }
    public Bill_Amt=0;
    public Bill_date="";
    get_Bill_No(data)
    {
      this.appservice.Due_Amt=0;
      //this.appservice.get("Api/Transaction/get_os_Po_bills?ID="+data).subscribe(( res: any) => {
        this.appservice.get("Api/Transaction/get_os_po_bills?ID="+data).subscribe(( res: any) => {
      this.Bill_No_ = JSON.parse(res).record; 
      this.Bill_Amt = (this.Bill_No_.reduce((sum, current) => sum + parseFloat(current.Bill_Amount), 0)).toFixed(2);
      this.appservice.Due_Amt = (this.Bill_No_.reduce((sum, current) => sum + parseFloat(current.Net_Amt), 0)).toFixed(2);
      this.Bill_date = this.Bill_No_[0].Bill_Date;
      this.get_history(data);
      this.b_No="";
      
      });
    }

    delete_data(data)
    {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete press Yes?',
        accept: () => {
          this.Delete(data.ID) ;
  
        }
    });
    }
  
   
  
    
    Delete(item) { 
   
        this.appservice.get("Api/Transaction/delete_Paid_Amount?ID=" + item).subscribe((res: any) => {
          this.appservice.get_Ledger_Payment(this.add.cb_ledger_id);
          this.get_Bill_No(this.add.cb_ledger_id);
          this.get_Amount_OS(this.add.cb_ledger_id);
        });
      }
  hisory_Data=[];
  get_history(data)
  {
    //this.appservice.get("Api/Transaction/get_os_bills?ID="+data).subscribe(( res: any) => {
      this.appservice.get("Api/Transaction/get_ledger_his?ID="+data+"&From="+this.appservice.M_From+"&To="+this.appservice.S_To).subscribe(( res: any) => {
    this.hisory_Data = JSON.parse(res).record; 

    
    });
  }
  get_Print(data)
  {
    return window.open(this.appservice.Server_URL+"report/PRS_Receipt_Bill?ID="+data+"&From="+this.appservice.M_From+"&To="+this.appservice.S_To+"&Company="+this.appservice.Company, "_blank");
 
  }


    b_No="";
      get_OS_Bill_Amount(Bill_No)
      {
        if(this.Bill_No_)
        {
        this.add.cb_billamt=this.Bill_No_.filter(e=>e.label==Bill_No)[0]["Bill_Amount"];
        }
      }

    Bill_No_=[];
    Bill_No_1=[];
    Rows=[];
    cols=[];
    
    get_Amount_OS(data) {
      this.add.cb_billamt="0";
      this.appservice.get("Api/Transaction/get_Amount_OS?ID="+data).subscribe(( res: any) => {
      this.Rows = JSON.parse(res).record; 
      this.get_Bill_No(data);
      this.cols = [
          { field: 'Date', header: 'Date', width: '89px' },
          { field: 'Narration1', header: 'Narration', width: '' },
          { field: 'Created_by', header: 'User', width: '' },

          { field: 'CR_Amt', header: 'Credit', width: 'right' },
          { field: 'DB_Amt', header: 'Debit', width: 'right' }
        ];
        try{
          this.Total=0;
          this.cr= (this.Rows.reduce((sum, current) => sum +parseFloat(current.CR_Amt), 0)).toFixed(2);
          this.db= (this.Rows.reduce((sum, current) => sum +parseFloat(current.DB_Amt), 0)).toFixed(2);
          this.Total=this.cr-this.db;
          this.add.Received_Amount=this.Total;
  
      }catch
      {}
  
      });
    }
      cr=0;
      db=0;
      Total=0;
  
  
    get_Receipt_no() {
      this.appservice.getc("Api/Transaction/get_Receipt_No1").subscribe(( res: any) => {
        this.add.cb_uniqno=res;
      });
    }
  
    public Banks_=[];
    get_Banks() {
      this.Banks_ =this.appservice.Bank_Master_Rows;
      this.add.cb_received_bank=this.appservice.Default_Bank_ID;
    }
  
    public Customers_=[];
    get_Customer() {
      this.get_Ledger_Master();
    }

    public Ledger_Master_Rows=[]; 
    get_Ledger_Master() { 
            this.appservice.getc("Api/Transaction/get_Out_Standing_Supplier").subscribe((res: any) => { 
            this.Customers_ = JSON.parse(res).record; 

            try{
           this. add.cb_ledger_id=this.appservice.selected_Out_supplier.ID;
           this.get_Amount_OS(this.add.cb_ledger_id)
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
      // this.get_Receipt_no();
      // if(this.add.cb_billno=="")
      // {
      //   this.toastr.error("Bill No Should not empty", "Error", { timeOut: 3000 });
      //   return;
      // }
      
      // if(this.add.cb_billamt=="")
      // {
      //   this.toastr.error("Bill Amount Should not empty", "Error", { timeOut: 3000 });
      //   return;
      // }
      
      if(this.add.cb_amountout=="")
      {
        this.toastr.error("Bill No Should not empty", "Error", { timeOut: 3000 });
        return;
      }

   
      
    // if(this.appservice.RC_Bill_Amt_Check && this.select_mode=='Manual')
    // {
    //    if((parseFloat(this.add.cb_amountout)+parseFloat(this.add.cb_disc))>parseFloat(this.add.cb_billamt))
    //   {
    //     this.toastr.error("Received Amount is more than Bill Amount", "Error", { timeOut: 3000 });
    //     return;
    //   }
    // }
    
    f.form.value.Company = this.appservice.Company;
    f.form.value.cb_date=this.add.cb_date;
    // f.form.value.Room_No=this.add.Room_No;
    f.form.value.Created_by=this.appservice.CREATED_BY;
    
    f.form.value.select_mode=this.select_mode;
    f.form.value.cb_vtype="Payment";
    f.form.value.Table_Name="Balance";
    f.form.value.ColumnPerfix="cb_";
    f.form.value.cb_billdate=this.Bill_date;
    f.form.value.cb_duedate=this.Bill_date;
    f.form.value.cb_bill_type="Purchase";
    f.form.value.cb_uniqno=this.add.cb_uniqno;
    f.form.value.cb_project=this.add.cb_project;
    this.add.cb_narration1=this.appservice.SProject_Rows.filter(e => e.value == this.add.cb_project_id)[0].label
    f.form.value.cb_remarks=this.add.cb_remarks+' '+this.add.cb_narration1;
      
    if(this.add.cb_pay_mode!=this.appservice.Cash_ID)
    {

      
      try{
      if(this.add.cb_received_bank==null ||  this.add.cb_received_bank== undefined || Number(this.add.cb_received_bank)==0)
      {
        this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
        return;
      }
    }catch{
      
      this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
      return;
    }
    }
    else
    {
      
      f.form.value.cb_received_bank="0";
      this.add.cb_received_bank="0";
    }
    
      // if (f.invalid === true)
      //   this.addValidation = true;
      // else
       {
        this.addValidation = false;
        this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

        this.btndisable=true;
        this.http.post(this.appservice.Server_URL + 'api/Transaction/insert_Payment', f.form.value, { headers: this.headers })
          .subscribe(
            (val: string) => {
              this.btndisable=false;
              if (val == "True") {
                this.toastr.success("Details Salved Success", 'Msg');
                this.get_Amount_OS(this.add.cb_ledger_id); 
                this.appservice.get_Payment();
                this.appservice.get_Payable_OutStanding();

                this.appservice.Pay_Date=this.add.cb_date;
                this.appservice.get_Ledger_Payment(this.add.cb_ledger_id);
                this.get_history(this.add.cb_ledger_id)
                //this.Clear();
                this.add.cb_amountout="";
                this.add.cb_remarks="";
                f.submitted=false;
               // this.appservice.back();
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
          'cb_id': '0',
          'CIN_ID': '',
          'Receipt_No': '',
          'Voucher_No': '',
          'cb_date': '',
          'cb_ledger_id': '',
          'cb_billamt': '0',
          'cb_amountout': '0',
          'Card_Charge': '0',
          'cb_disc': '0',
          'cb_billno': '',
          'cb_narration1': '',
          'cb_narration2': '',
          'Room_No':'',
          'cb_pay_mode': this.appservice.Cash_ID,
          'cb_received_bank': '0',
          'cb_cheque_no': '',
          'cb_cheque_date': '',
          'cb_remarks': '',
          'Created_by': '',
          'Created_Date': '',
          'Status': '',
        };
    }

}
