import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-tyre',
  templateUrl: './add-tyre.component.html',
  styleUrls: ['./add-tyre.component.scss']
})
export class AddTyreComponent implements OnInit {

 
  add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;


  isadd="0";

  constructor(private _location: Location,public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.isadd = appservice.isadd;
    if (this.isadd == "0") {
      this.add.ty_purdate =this.appservice.T_Date;
    }
    else {
      this.add = appservice.Edit_Row;
      this.add.Company = this.appservice.Company;
      this.add.ty_purdate = appservice.datefromat(appservice.Edit_Row.ty_purdate);
    }
  }
  
 

  addData(f) {
    this.add.Company=this.appservice.Company;
    this.add.Created_by=this.appservice.CREATED_BY;
    this.add.ID=this.add.ty_id;
    this.add.Table_Name="Tyre_Master";
    this.add.ColumnPerfix="ty_";
    console.log(f);
    if (f.invalid == true)
    this.addValidation = true;
  else {
    this.addValidation = false;
    this.btndisable=true;
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.appservice.Server_URL + 'api/Master/Post_Tyre_Master', this.add, { headers: this.headers })
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
  }
  Back()
  {
    this._location.back();
  }
  Clear() {
    this.add ={
      'ty_id': '0',
      'ty_purno': '',
      'ty_purdate': this.appservice.T_Date,
      'ty_ledger_id': '',
      'ty_ledger_name': '',
      'ty_no': '',
      'ty_refno': '',
      'ty_type': '',
      'ty_size': '',
      'ty_amount': '',
  };
  }


  ngOnInit(): void {
  }

}
