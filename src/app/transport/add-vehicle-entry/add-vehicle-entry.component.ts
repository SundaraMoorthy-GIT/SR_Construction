import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-vehicle-entry',
  templateUrl: './add-vehicle-entry.component.html',
  styleUrls: ['./add-vehicle-entry.component.scss']
})
export class AddVehicleEntryComponent implements OnInit {

  
  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  public TStatus=true;
  isadd = "0";
  public Room_Types = [];
  public Godown_Rows=[];
  public select_mode="Load";
  public Room_Floor = [];
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
    this.Godown_Rows = this.appservice.get_Ledger_group("10");
    if (this.isadd == "0") {
      this.add.tpt_id = "0";
      this.add.tpt_date =this.appservice.T_Date;
      this.select_mode = this.add.tpt_ttype;
    }
    else {
      this.add = appservice.Edit_Row;
      this.add.tpt_date = appservice.datefromat(appservice.Edit_Row.tpt_date);
     
    }
    this.add.tpt_projectid=""+appservice.Edit_Row.tpt_projectid;

    if (this.appservice.from_customer_page == true) {
    //  this.add.tpt_projectno = this.appservice.Selected_Customer.est_unino;
     // this.add.tpt_projectid = this.appservice.Selected_Customer.est_id; 
   //   this.add.tpt_projectname = this.appservice.Selected_Customer.est_projectname; 
      this.add.tpt_ledger_name = this.appservice.Selected_Customer.est_office;
    }
  }

  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

  }
  public refRow:any ={};
  onChange1(data)
  {
    this.refRow=this.appservice.SProject_Rows.filter(e => e.value == data)[0];
    this.add.tpt_projectname=this.refRow.label;
   

  }
  onChange2(data)
  {
    this.add.tpt_transport=this.appservice.Transport_Rows.filter(e => e.value == data)[0].label;
     
  }
  onChange3(data)
  {
    this.refRow=this.Godown_Rows.filter(e => e.value == data)[0];
    this.add.tpt_ledger_name=this.refRow.label;
  }

  s_load:Number=0;
  s_rate:Number=0;
  onSearchChange(searchValue: string): void {  
      this.s_load=Number(this.add.tpt_load);
      if(isNaN(Number(this.add.tpt_load)))
      {
        this.s_load=0;
      }
      this.s_rate=Number(this.add.tpt_narration2);
      if(isNaN(Number(this.add.tpt_narration2)))
      {
        this.s_rate=0;
      }
    this.add.tpt_amount=(Number(this.s_load)*Number(this.s_rate));
  }
  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.tpt_type = "VEHICLE";
    this.add.Table_Name = "Transport_Entry";
    this.add.ColumnPerfix = "tpt_";
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/transaction/Post_Transport_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Vehicle_Entry();
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
        'tpt_id': '0',
        'tpt_type': '',
        'tpt_no': '',
        'tpt_date': this.appservice.T_Date,
        'tpt_projectname': '',
        'tpt_narration2': '',
        'tpt_narration3': '',
        'tpt_transport': '',
        'tpt_ledger_address1': '',
        'tpt_opening': '',
        'tpt_closing': '',
        'tpt_material_name': '',
        'tpt_load': '',
        'tpt_remarks': '',
        'tpt_branch': this.appservice.Branch_ID,
      };
  }

}
