import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-deposit',
  templateUrl: './add-deposit.component.html',
  styleUrls: ['./add-deposit.component.scss']
})
export class AddDepositComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public btndisable1:boolean=false;
  // Selected_Project = "";
  public Contractor_Row = [];
  public Bill_Mode_Row=[];
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
     if (this.appservice.Branch_ID != 0) {
      this.add.oc_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    
    this.isadd = appservice.isadd;
    this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    if (this.appservice.isEdit) {
      this.add = appservice.Edit_Row;
      this.add.oc_date = appservice.datefromat(this.appservice.Edit_Row.oc_date);
      this.add.oc_received_bank=this.appservice.Edit_Row.oc_received_bank1;
      
    }
    else {
      this.add.ID = "0";
      this.get_Receipt_no();
      this.add.oc_date =this.appservice.T_Date;
      this.add.oc_pay_mode=appservice.DF_Paymode;
      this.add.oc_received_bank=this.appservice.Default_Bank_ID;
    }
    if (this.appservice.from_customer_page == true) {
      this.add.oc_projectno = this.appservice.Selected_Customer.est_unino;
      this.add.oc_projectname = this.appservice.Selected_Customer.est_projectname;
      this.add.oc_projectid = this.appservice.Selected_Customer.est_id;
      this.add.oc_ledger_id = this.appservice.Selected_Customer.est_id;
      this.add.oc_ledger_name = this.appservice.Selected_Customer.est_projectname;
    }
    appservice.get_CR_DB_Amount(this.add.oc_received_bank);
  }

  onChange(data)
  {
    
    this.appservice.DF_Paymode=data;
    this.appservice.Default_Payment_ID=this.appservice.get_ref('Pay_Mode').filter(e => e.value == data)[0].label;  
  }
  
  addData(f) {
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.Table_Name = "Other_Collection";
    this.add.Company = this.appservice.Company;
    this.add.ID=this.add.oc_id;
    this.add.ColumnPerfix = "oc_";
    this.add.oc_type="EMD";
    this.add.oc_categoryid=0;
    this.add.oc_category=this.add.oc_vtype;
    this.add.oc_projectname=this.appservice.SProject_Rows.filter(e => e.value == this.add.oc_projectid)[0].label;  
    // this.add.Est_ProjectName=this.Selected_Project;
    // this.add.Est_Company=this.appservice.Company;
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Other_Collection', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Bank_Master();
              this.Clear();
              this.get_Receipt_no();
              f.submitted=false;
              if (this.isadd != "0") {
                this._location.back();
              }
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
  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

  }
  get_Receipt_no() {
    this.appservice.get("Api/Transaction/get_OtherCollection_No?Type=EMD").subscribe(( res: any) => {
      this.add.oc_no=res;
    this.get_Image_details();
    });
  }

  get_Image_details()
  {
     this.server=this.appservice.Server_URL+"Api/Master/Upload_Expense_Document?Ref_Type=EMD&Ref_ID=1&Name="+this.add.oc_no+"&Description=EMD&Company="+this.appservice.Company;
  }


  get_image()
  { 
     var timeStamp = (new Date()).getTime();
     return this.appservice.Server_URL+"Image/C"+this.appservice.Company+"/EMD/"+this.add.oc_no+".png?data="+timeStamp;
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
        'Adj_Type': 'Expense',
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
