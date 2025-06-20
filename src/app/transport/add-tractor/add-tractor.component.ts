import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-tractor',
  templateUrl: './add-tractor.component.html',
  styleUrls: ['./add-tractor.component.scss']
})
export class AddTractorComponent implements OnInit {

  
  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public select_mode="Load";
  Type_rows=[];
  TRM_To_Rows1=[];
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
    this.TRM_To_Rows1=this.appservice.TRM_To_Rows;
    if (this.isadd == "0") {
      this.add.tpt_id = "0";
      this.add.tpt_date =this.appservice.tr_Date;
    }
    else {
      this.add = appservice.Edit_Row;
      this.add.tpt_date = appservice.datefromat(appservice.Edit_Row.tpt_date);
      this.select_mode = this.add.tpt_ttype;
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

  public FromRow:any ={};
  onChange2(data)
  {
    this.FromRow=this.appservice.TRM_From_Rows.filter(e => e.value == data)[0];
    this.add.tpt_from=this.FromRow.label;
    this.TRM_To_Rows1=this.appservice.TRM_To_Rows.filter(e => e.label1 == this.FromRow.label);
  }
  public ToRow:any ={};
  onChange3(data)
  {
    this.ToRow=this.TRM_To_Rows1.filter(e => e.value == data)[0];
    this.add.tpt_to=this.ToRow.label;
    //this.add.tpt_fromid=this.add.tpt_toid;
  }
  
  public Rate_Rows:any ={};
  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.tpt_type = "Tractor";
    this.add.Table_Name = "Transport_Entry";
    this.add.ColumnPerfix = "tpt_";
    this.add.tpt_ttype = this.select_mode;
    // if(this.add.tpt_narration1=="TRACTOR")
    // {
    //   if(this.add.tpt_ttype=="Load")
    //   {
    // this.Rate_Rows=this.appservice.Vehicle_Basic_Rate_Rows.filter(e => e.br_tpttype.toLowerCase() == this.add.tpt_narration1.toLowerCase())[0];;
    // this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.br_rate))+Number(this.Rate_Rows.br_extra);
    //   }
    //   else
    //   {
    //     this.add.tpt_amount="1600";
    //   }
    // }
    // else
    // {
    //   this.Rate_Rows=this.appservice.TRM_To_Rows.filter(e => e.trm_from == this.add.tpt_from);
    //   this.Rate_Rows=this.Rate_Rows.filter(e => e.trm_to == this.add.tpt_to)[0];
    //   if(this.add.tpt_tpttype=="7U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_7U))
    //   }
    //   if(this.add.tpt_tpttype=="5.7U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_57U))
    //   }
    //   if(this.add.tpt_tpttype=="5U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_5U))
    //   }
    //   if(this.add.tpt_tpttype=="4U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_4U))
    //   }
    //   if(this.add.tpt_tpttype=="3U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_3U))
    //   }
    //   if(this.add.tpt_tpttype=="2U")
    //   {
    //     this.add.tpt_amount=(Number(this.add.tpt_load)*Number(this.Rate_Rows.trm_2U))
    //   }
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
              this.appservice.get_TRM_From();
              this.appservice.get_TRM_To();
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

  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

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
