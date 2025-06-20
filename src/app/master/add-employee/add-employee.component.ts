import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {


  add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;

  public State_Row = [];

  public cus_groupid="4";
  isadd="0";

  constructor(private _location: Location,public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {


    this.isadd = appservice.isadd;
    if (this.isadd == "0") {
      this.add.Emp_id = "0";
    }
    else {
      this.add = appservice.Edit_Row;
    }
    this.add.Company = this.appservice.Company;
    this.add.Emp_CreatedBy = this.appservice.CREATED_BY;
  }
  
  

  addData(f) {
    
    this.add.cus_group_id=this.cus_groupid;
    this.add.cus_type=this.appservice.Cus_Type;
    this.add.Company=this.appservice.Company;
    this.add.Created_by=this.appservice.CREATED_BY;
    this.add.ID=this.add.cus_id;
    this.add.Table_Name="Ledger_Master";
    this.add.ColumnPerfix="cus_";
    this.addValidation = false;
    this.btndisable=true;

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.appservice.Server_URL + 'api/Master/Post_Master_Data', f.form.value, { headers: this.headers })
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
    this.add ={
      'cus_id': '0',
      'cus_group_id': this.cus_groupid,
      'cus_code': '',
      'cus_type': this.appservice.Cus_Type,
      'cus_ledger_type': '',
      'cus_category': '',
      'cus_name': '',
      'cus_address1': '',
      'cus_address2': '',
      'cus_address3': '',
      'cus_address4': '',
      'cus_address5': '',
      'cus_city': '',
      'cus_state': 'Tamil Nadu',
      'cus_scode': '33',
      'cus_country': '',
      'cus_pincode': '',
      'cus_area': '',
      'cus_tax_type': '',
      'cus_gstin': '',
      'cus_pan_no': '',
      'cus_aadhar_no': '',
      'cus_duedays': '0',
      'cus_contact_number': '',
      'cus_contact_person': '',
      'cus_phone_number': '',
      'cus_email_id': '',
      'cus_distance': '0',
      'cus_insurance': this.appservice.T_Date,
      'cus_fcdate': this.appservice.T_Date,
      'cus_permitdate': this.appservice.T_Date,
    };
    // this.add =
    // {
    //   'Emp_code': '',
    //   'Emp_name': '',
    //   'Emp_address': '',
    //   'Emp_phone': '',
    //   'Emp_email': '',
    //   'Emp_designation': '',
    //   'Emp_department': '',
    //   'Emp_Salary': '',
    //   'Emp_commission': '',
    // };
  }
  ngOnInit(): void {
  }

}
