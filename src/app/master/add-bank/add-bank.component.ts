import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public Room_Types = [];
  public Room_Floor = [];
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.isadd = appservice.isadd;
    if (this.isadd == "0") {
      this.add.ID = "0";
    }
    else {
      this.add = appservice.Edit_Row;
    }
  }
  
  addData(f) {
    
    f.form.value.Company = this.appservice.Company;
    if (f.invalid === true)
      this.addValidation = true;
    else {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/master/insert_Bank_Master', f.form.value, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              this.appservice.get_Bank_Master();
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
        'Bank_Name': '',
        'Account_Number': '',
        'Account_Name': '',
        'Branch': '',
        'IFSC_Code': '',
        'Location': '',
        'Created_by': '',
        'Created_date': '',
        'Status': '',
      };
  }

}
