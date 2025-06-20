import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.scss']
})
export class AddContractorComponent implements OnInit {

  Selected_State = "";

  public State_Row = [];
  add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;


  isadd="0";

  constructor(private _location: Location,public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.State_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "State");
    this.isadd = appservice.isadd;
    if (this.isadd == "0") {
      this.add.Con_Id = "0";
    }
    else {
      this.add = appservice.Edit_Row;
      this.Selected_State=appservice.Edit_Row.Con_StateId;
    }
    this.add.Company = this.appservice.Company;
    this.add.Con_CreatedBy = this.appservice.CREATED_BY;
  }
  
  

  addData(f) {
    
    this.addValidation = false;
    this.btndisable=true;

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.appservice.Server_URL + 'api/Master/insert_contractor_master', f.form.value, { headers: this.headers })
      .subscribe(
        
        (val: string) => {
          this.btndisable=false;

          if (val == "True") {
            this.toastr.success("Details Saved Success", 'Msg');
            //this.appservice.get_User_Master();
            this.Clear();
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
  Back()
  {
    this._location.back();
  }
  Clear() {
    this.add =
    {
      'Con_Code': '',
      'Con_Name': '',
      'Con_Address': '',
      'Con_Addr2': '',
      'Con_ContactNo': '',
      'Con_GSTIN': '',
      'Con_State': '',
      'Con_OB': '',
    };
  }
  ngOnInit(): void {
  }

}
