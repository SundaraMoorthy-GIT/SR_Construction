import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-hitachi',
  templateUrl: './add-hitachi.component.html',
  styleUrls: ['./add-hitachi.component.scss']
})
export class AddHitachiComponent implements OnInit {

  
  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  Type_rows=[];
  public btndisable1: boolean = false;
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
       if (this.appservice.Branch_ID != 0) {
      this.add.tpt_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    this.isadd = appservice.isadd;
    this.Type_rows=this.appservice.Transport_Rpt_Rows;
    if (this.isadd == "0") {
      this.add.tpt_id = "0";
      this.add.tpt_date =this.appservice.tr_Date;
    }
    else {
      this.add = appservice.Edit_Row;
      this.add.tpt_date = appservice.datefromat(appservice.Edit_Row.tpt_date);
    }
    if (this.appservice.from_customer_page == true) {
      this.add.tpt_projectno = this.appservice.Selected_Customer.est_unino;
      this.add.tpt_projectdate = this.appservice.Selected_Customer.est_tenderdate;
      this.add.tpt_projectname = this.appservice.Selected_Customer.est_projectname; 
      this.add.tpt_projectid = this.appservice.Selected_Customer.est_deptid;
      this.add.tpt_contact_no = this.appservice.Selected_Customer.est_department;
      this.add.tpt_ledger_name = this.appservice.Selected_Customer.est_office;
    }
  }

  public refRow:any ={};
  onChange1(data)
  {
    this.refRow=this.Type_rows.filter(e => e.value == data)[0];
    this.add.tpt_transport=this.refRow.label;
    this.add.tpt_tpttype=this.refRow.Veh_Make;
    this.add.tpt_narration1=this.refRow.Veh_Type;
  }

  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

  }
  
  public Rate_Rows:any ={};
  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.tpt_type = "Hitachi";
    this.add.Table_Name = "Transport_Entry";
    this.add.ColumnPerfix = "tpt_";
    try{
    this.Rate_Rows=this.appservice.Vehicle_Basic_Rate_Rows.filter(e => e.br_type == this.add.tpt_tpttype)[0];;
    this.add.tpt_amount=(Number(this.add.tpt_tothours)*Number(this.Rate_Rows.br_rate))+Number(this.Rate_Rows.br_extra);
    }
    catch{}
    
// if(this.add.tpt_tpttype =="Company")
// {
//     this.add.tpt_amount=(this.add.tpt_tothours*850)+50;
// }
// else
// {
//   this.add.tpt_amount=(this.add.tpt_tothours*850)+200;
// }
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.btndisable=true;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/transaction/Post_Transport_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            this.btndisable=false;
            if (val == "True") {
              this.appservice.tr_Date=this.add.tpt_date;
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Jcb_Hitachi();
              this.Clear();
              f.submitted=false;
              if (this.isadd != "0") {
                this.add.tpt_date=this.appservice.tr_Date;
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
      'tpt_id': '0',
      'tpt_type': '',
      'tpt_no': '',
      'tpt_date': this.appservice.T_Date,
      'tpt_projectname': '',
      'tpt_transid': '',
      'tpt_fromid': '',
      'tpt_toid': '',
      'tpt_material_name': '',
      'tpt_load': '',
      'tpt_remarks': '',
      'tpt_branch': this.appservice.Branch_ID,
    };
  }

}
