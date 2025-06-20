import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location, DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-contra',
  templateUrl: './add-contra.component.html',
  styleUrls: ['./add-contra.component.scss']
})
export class AddContraComponent implements OnInit {

  
  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;

  headers;
  data;
  isadd = "0";
 l4
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
  public btndisable1:boolean=false;
  public btndisable:boolean=false;
  public  From_Amt="0";

  constructor(public datePipe :DatePipe,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    if (this.appservice.Branch_ID != 0) {
      this.add.Branch_ID = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }

    this.add.Pay_Mode == appservice.Cash_ID;
    this.appservice.Ledger_Amt="0";
    this.isadd = appservice.isadd;
    this.add.Ref_Date = appservice.T_Date;
    
    
    if (this.isadd == "0") {
     this.Clear();
      this.add.ID = "0";
      this.add.Branch_ID = this.appservice.Branch_ID;

      this.get_Receipt_no() ;
    
    }
    else {
      this.add = appservice.Edit_Row;
     // this.add.Adj_Date = 1;
      this.add.Ref_Date=appservice.datefromat(appservice.Edit_Row.Ref_Date_);

    }
    appservice.get_CR_DB_Amount(this.add.From_Account);
    appservice.get_CR_DB_Amount(this.add.To_Account);
 
  }

get_CR_DB_Amount(data)
  {
    this.appservice.get("Api/Transaction/get_CR_DB_Amount?Ledger_ID=" +data).subscribe((res: any) => {
    this.appservice.To_Amt= res;
  });
  }
  get_Receipt_no() {

    this.appservice.getc("Api/Transaction/get_Contra_No").subscribe(( res: any) => {
      this.add.Ref_No=res;
    });
  }





  
  
  public Pay_Mode_=[]
  get_Pay_Mode() {
    var data="Pay_Mode";
    this.Pay_Mode_=this.appservice.Reference_Rows.filter(e => e.Ref_ID.toLowerCase().includes(data.toLocaleLowerCase()));

  }


  public Exp_Category_=[]
  get_Category() {
    var data="Exp_Category";
    this.Exp_Category_=this.appservice.Reference_Rows.filter(e => e.Ref_ID.toLowerCase().includes(data.toLocaleLowerCase()));


    
  }


  addData(f) {

  
    f.form.value.Company = this.appservice.Company;
    f.form.value.Branch_ID = this.appservice.Branch_ID;
    
    f.form.value.Adj_Type = "Income";

    if(parseFloat(this.add.Amount)<=0)
    {

      this.toastr.error("Amount Should not be Zero", "Error", { timeOut: 3000 });
      return;
    }
    if(this.add.From_Account==this.add.To_Account)
    {

      this.toastr.error(" FROM & To account  Should not be same", "Error", { timeOut: 3000 });
      return;
    }
    try{
      if( this.add.From_Account==null ||  this.add.From_Account== undefined )
      {
        this.toastr.error("Please Select From Account ", "Error", { timeOut: 5000 });
        return;
      }
    }catch{
      
      this.toastr.error("Please Select From Account ", "Error", { timeOut: 5000 });
      return;
    }
    try{
      if( this.add.To_Account==null ||  this.add.To_Account== undefined )
      {
        this.toastr.error("Please Select To Account ", "Error", { timeOut: 5000 });
        return;
      }
    }catch{
      
      this.toastr.error("Please Select To_Account ", "Error", { timeOut: 5000 });
      return;
    }
   
 /*   var Paymode = this.appservice.Reference_Rows.filter(e => e.RGV_iID==this.add.Pay_Mode)[0]["RGV_vDesciption"];
    if(Paymode!="Cash")
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
    }*/
    

    f.form.value.Created_by = this.appservice.CREATED_BY;
   
    if (f.invalid === true)
      this.addValidation = true;
      
    else {

      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/insert_Contra', f.form.value, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              
              this.toastr.success("Details Salved Success", 'Msg');
            //  this.appservice.get_Adjustments();
              this.Clear();
              f.submitted=false;
             
              this.get_Receipt_no() ;

              this.isadd = "0";
                this.add.ID = "0";

                this.appservice.get_Contra();
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
        'ID': '0',
        'Ref_No': '',
        'Ref_Date': this.appservice.T_Date,
        'From_Account': '',
        'To_Account': '',
        'Naration': '',
        'Amount': '0',
        'Pay_Mode': this.appservice.Cash_ID,
        'Received_Bank': '',
        'Cheque_No': '',
        'Cheque_Date': '',
        'Remarks': '',
        'Created_by': '',
        'Created_Date': '',
        'Status': '',
        'Branch_ID':this.appservice.Branch_ID
      };
  }

}
