import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-add-estimate',
  templateUrl: './add-estimate.component.html',
  styleUrls: ['./add-estimate.component.scss']
})
export class AddEstimateComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public Dept_Row = [];
  public Tax_Type_Row = [];
  public Tax_Value_Row = [];
  public btndisable1: boolean = false;
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute,private auto:AutoCompleteModule) {
     if (this.appservice.Branch_ID != 0) {
      this.add.est_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    this.Dept_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Department");
    this.Tax_Type_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Tax_Type");
    this.Tax_Value_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Tax_Value");
    this.add.est_tax_type="Inclusive";
    this.add.est_tax_per="28.00";
    this.isadd = appservice.isadd;
    if (this.appservice.isEdit) {
      this.add = appservice.Edit_Row;
      this.add.est_Date = appservice.datefromat(this.appservice.Edit_Row.est_date);
      this.add.est_tenderdate = appservice.datefromat(this.appservice.Edit_Row.est_tenderdate);
      this.add.est_agreementdate = appservice.datefromat(this.appservice.Edit_Row.est_agreementdate);
      this.add.est_completiondate = appservice.datefromat(this.appservice.Edit_Row.est_completiondate);
      
    }
    else {
      this.add.est_id = "0";
      this.get_Estimate_No();
      this.add.est_date =this.appservice.T_Date;
      this.add.est_tenderdate =this.appservice.T_Date;
      this.add.est_agreementdate =this.appservice.T_Date;
      this.add.est_completiondate =this.appservice.T_Date;
    }
    
  }

  public refRow:any ={};
  onChange(data)
  {
    this.refRow=this.appservice.Reference_Rows.filter(e => e.value == data)[0];
    this.add.est_department=this.refRow.label;
  }

  Calc_Sum() {
    var Tax_Type = "exclusive";
    try {
      Tax_Type = this.add.est_tax_type
    }
    catch {
      Tax_Type = "exclusive"
    }
    this.add.est_taxable_amount=this.add.est_amount;
    if (String(Tax_Type).toLowerCase() == "inclusive") {

      this.add.est_taxable_amount = Math.round((
        (
          ((Number(this.add.est_amount))
            /
            (100 + Number(this.add.est_tax_per))
          )
          * 100
        )));
  }
  this.add.est_tax_amt=Math.round((Number(this.add.est_taxable_amount)*(Number(this.add.est_tax_per)/100)));
  this.add.est_net_amt=(Number(this.add.est_taxable_amount)+(Number(this.add.est_tax_amt)));
}
  
  addData(f) {
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.Table_Name = "Estimation";
    this.add.Company = this.appservice.Company;
    this.add.ID = this.add.est_id;
    this.add.est_vouctype = "Estimation";
    this.add.ColumnPerfix = "est_";
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Estimation', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              this.appservice.get_Project();
              this.appservice.get_estimation();
              this.Clear();
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
    return this.router.navigate(['/customer-search']);

  }
  get_Estimate_No() {
    this.appservice.getc("Api/Transaction/get_Estimation_No").subscribe((res: any) => {
      this.add.est_unino = res;
    });
  }
  Back() {
    this._location.back();
  }

  Clear() {
    this.add ={};
    this.add.est_id = "0";
    this.get_Estimate_No();
    this.add.est_date =this.appservice.T_Date;
    this.add.est_confdate =this.appservice.T_Date;
    this.add.est_tax_type="Inclusive";
    this.add.est_tax_per="28.00";
  }


}
