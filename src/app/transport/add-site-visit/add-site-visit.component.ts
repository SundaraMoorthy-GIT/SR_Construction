import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-site-visit',
  templateUrl: './add-site-visit.component.html',
  styleUrls: ['./add-site-visit.component.scss']
})
export class AddSiteVisitComponent implements OnInit {

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
    f.form.value.Created_by = this.appservice.CREATED_BY;
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/transaction/insert_Daily_Sitevisit', f.form.value, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Jcb_Hitachi();
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
        'Name': '',
        'PNumber': '',
        'Status': '',
        'Designation': '',
        'Address': '',
      };
  }


}
