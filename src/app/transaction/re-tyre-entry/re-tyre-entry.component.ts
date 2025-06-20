import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-re-tyre-entry',
  templateUrl: './re-tyre-entry.component.html',
  styleUrls: ['./re-tyre-entry.component.scss']
})
export class ReTyreEntryComponent implements OnInit {

  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
   public btndisable1: boolean = false;
  headers;
  data;
  isadd = "0";
  // Selected_Project = "";
  public Contractor_Row = [];
  public Bill_Mode_Row=[];
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
     if (this.appservice.Branch_ID != 0) {
      this.add.trr_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    
    this.isadd = appservice.isadd;
    if (this.appservice.isEdit) {
      this.add = appservice.Edit_Row;
      this.add.trr_date = appservice.datefromat(this.appservice.Edit_Row.trr_date);
      this.add.trr_asmdate = appservice.datefromat(this.appservice.Edit_Row.trr_asmdate);
      this.add.trr_dsmdate = appservice.datefromat(this.appservice.Edit_Row.trr_dsmdate);
      
    }
    else {
      this.add.ID = "0";
      this.add.trr_date=this.appservice.T_Date;
      this.add.trr_asmdate =this.appservice.T_Date;
      this.add.trr_dsmdate =this.appservice.T_Date;
    }
  }

  onChange(data)
  {
    this.add.trr_vehicle_no=this.appservice.Transport_Rows.filter(e => e.value == data)[0].label;  
  }
  

  onChange1(data)
  {
    this.add.trr_tyre_no=this.appservice.Tyre_Master_Rows.filter(e => e.value == data)[0].label;   
  }
  
  addData(f) {
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.Table_Name = "Tyre_Entry";
    this.add.Company = this.appservice.Company;
    this.add.ID=this.add.trr_id;
    this.add.ColumnPerfix = "trr_";
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Tyre_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Bank_Master();
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

  Back() {
    this._location.back();
  }

  Clear() {
    this.add =
      {
        'ID': '0',
        'Adj_Type': 'Expense',
        'Adj_No': '',
        'trr_date': this.appservice.T_Date,
        'trr_asmdate':this.appservice.T_Date,
        'trr_dsmdate':this.appservice.T_Date,
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
        'trr_branch':this.appservice.Branch_ID
      };
  }

  ngOnInit(): void {
  }

}
