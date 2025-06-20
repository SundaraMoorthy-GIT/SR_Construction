import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location, DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  public btndisable1:boolean=false;
  headers;
  data;
  isadd = "0";
  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mmm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '35px'
  };

  private selectedDate:Object = {};
  private selDate: IMyDate = {year: 0, month: 0, day: 0};

  public Min_Date="";
  public btndisable:boolean=false;
  constructor(public datePipe :DatePipe,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
      if (this.appservice.Branch_ID != 0) {
      this.add.oc_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }

    this.add.oc_pay_mode=appservice.DF_Paymode;
    this.isadd = appservice.isadd;
    this.add.oc_date = appservice.T_Date;
    this.add.oc_cheque_date = appservice.T_Date;
    this.add.oc_type = "Loan";
    this.get_Ledger_Category();

    if (this.isadd == "0") {
      this.Clear();
      this.add.ID = "0";
      this.get_Receipt_no() ;
      this.add.oc_branch = this.appservice.Branch_ID;
      this.add.oc_pay_mode=this.appservice.DF_Paymode;
      // this.add.oc_pay_mode=this.appservice.Default_Payment_ID;
      this.add.oc_received_bank=this.appservice.Default_Bank_ID;
      
    }
    else {
      this.add = appservice.Edit_Row;
     // this.add.Adj_Date = 1;
     try{
      this.add.oc_date = appservice.datefromat(appservice.Edit_Row.oc_date);
      this.add.oc_cheque_date=appservice.datefromat(appservice.Edit_Row.oc_cheque_date);
      this.add.oc_received_bank=this.appservice.Edit_Row.oc_received_bank1;
      }catch{}
      this.appservice.Pay_Mode=appservice.Edit_Row.Pay_Mode;
      this.appservice.Receiving_Bank= this.appservice.Edit_Row.Received_Bank;
      this.appservice.Cheque_No= this.appservice.Edit_Row.Cheque_No;
      this.appservice.Cheque_Date=this.appservice.Edit_Row.Cheque_Date;
      this.add.Card_Charge=this.appservice.Edit_Row.Card_Charge;
      this.appservice.Remarks=this.appservice.Edit_Row.Remarks;
     
    }
    if (this.appservice.from_customer_page == true) {
      this.add.oc_projectno = this.appservice.Selected_Customer.est_unino;
      this.add.oc_projectdate = this.appservice.Selected_Customer.est_tenderdate;
      this.add.oc_projectname = this.appservice.Selected_Customer.est_projectname;
      this.add.oc_projectid = this.appservice.Selected_Customer.est_id;
      
    }
    appservice.get_CR_DB_Amount(this.add.oc_received_bank);
  }

  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

  }

  public refRow:any ={};
  onChange(data)
  {
    this.refRow=this.Exp_Category_.filter(e => e.value == data)[0];
    this.add.oc_ledger_name=this.refRow.label;
  }

  public refRow1:any ={};
  onChange1(data)
  {
    this.refRow=this.appservice.Ledger_Master_Rows.filter(e => e.value == data)[0];
    this.add.oc_ledger_name=this.refRow.label;
  }
  onChange2(data)
  {
    this.appservice.DF_Paymode=data;
    this.appservice.Default_Payment_ID=this.appservice.get_ref('Pay_Mode').filter(e => e.value == data)[0].label; 
  }
  get_Receipt_no() {
    this.appservice.get("Api/Transaction/get_OtherCollection_No?Type=loan").subscribe(( res: any) => {
      this.add.oc_no=res;
    this.get_Image_details();
    });
  }
  add_Category()
  {
    
    this.appservice.Ref_ID="Exp_Category";
    this.appservice.isadd="0";
    return this.router.navigate(['master/add-reference']);
  }

  
  public Pay_Mode_=[]
  get_Pay_Mode() {
    var data="Pay_Mode";
    this.Pay_Mode_=this.appservice.Reference_Rows.filter(e => e.Ref_ID.toLowerCase().includes(data.toLocaleLowerCase()));

  }
  public Exp_Category_=[]
  public Ledger_Category = [];
  get_Ledger_Category() {
   this.Exp_Category_ = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");
  }

  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.oc_type = "Loan";
    this.add.ID=this.add.oc_id;
    this.add.ColumnPerfix = "oc_";
    this.add.Table_Name = "Other_Collection";
    this.add.oc_categoryid=0;
    
    this.add.oc_category=this.add.oc_vtype;
    if(parseFloat(this.add.oc_amount)<=0)
    {

      this.toastr.error("Amount Should not be Zero", "Error", { timeOut: 3000 });
      return;
    }


 
      
    //   try{
    //   if(this.add.oc_received_bank=="0"|| this.add.oc_received_bank==null ||  this.add.oc_received_bank== undefined || Number(this.add.oc_received_bank)==0)
    //   {
    //     this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //     return;
    //   }
    // }catch{
      
    //   this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //   return;
    // }
   


    this.add.Created_by = this.appservice.CREATED_BY;
   
    // if (f.invalid === true)
    //   this.addValidation = true;
      
    // else 
    {

      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Other_Collection', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              
              this.toastr.success("Details Salved Success", 'Msg');
            //  this.appservice.get_Adjustments();
              this.Clear();
              this.appservice.pay_Mode_reset();
              f.submitted=false;
             
              this.get_Receipt_no() ;

              this.isadd = "0";
                this.add.ID = "0";

                this.appservice.get_OtherCollection_Details();
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

  get_Image_details()
  {
     this.server=this.appservice.Server_URL+"Api/Master/Upload_Expense_Document?Ref_Type=Contractor&Ref_ID=1&Name="+this.add.oc_no+"&Description=Machiner Expense&Company="+this.appservice.Company;
  }


  get_image()
  { 
     var timeStamp = (new Date()).getTime();
     return this.appservice.Server_URL+"Image/C"+this.appservice.Company+"/Loan/"+this.add.oc_no+".png?data="+timeStamp;
  }

  uploadedFiles: any[] = [];

  server;
 onUpload(event) {
     for(let file of event.files) {
         this.uploadedFiles.push(file);
     }

     this.toastr.success("File Uploaded  Success", 'Msg');
     
 }

 
  Back() {
    this._location.back();
  }
  Clear() {
    this.add =
      {
        'ID': '0',
        'Adj_Type': 'loan',
        'Adj_No': '',
        'oc_date': this.appservice.T_Date,
        'Category': '',
        'Ledger_ID': '',
        'Narration1': '',
        'Narration2': '',
        'Narration3': '',
        'Amount': '0',
        'Pay_Mode': this.appservice.Cash_ID,
        'Received_Bank': '0',
        'Cheque_No': '',
        'Cheque_Date': this.appservice.T_Date,
        'Remarks': '',
        'Created_by': '',
        'Created_Date': '',
        'Status': '',
        'oc_branch':this.appservice.Branch_ID
      };
  }
}


