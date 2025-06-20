import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location, DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-log-book-entry',
  templateUrl: './log-book-entry.component.html',
  styleUrls: ['./log-book-entry.component.scss']
})
export class LogBookEntryComponent implements OnInit {

  ngOnInit(): void {}
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";

  public btndisable:boolean=false;
  public Ledger = [];


  public btndisable1: boolean = false;
  constructor(public datePipe :DatePipe,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    if (this.appservice.Branch_ID != 0) {
      this.add.lbe_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }

    this.isadd=this.appservice.isadd;
    if (this.isadd == "0") {
      this.add.ID = "0";
      this.Clear();
      this.add.lbe_branch = this.appservice.Branch_ID;
      this.add.lbe_date=this.appservice.Log_Date;
      this.add.lbe_vehicle_id=this.appservice.Vehicle_No;
      this.onChange(this.add.lbe_vehicle_id)
    }
    else {
      this.add = appservice.Edit_Row;
     // this.add.Adj_Date = 1;
     try{
      this.add.lbe_date = appservice.datefromat(appservice.Edit_Row.lbe_date);
      }catch{}
     
     
    }
   
  }
  calc_tempdata()
  {
   this.add.lbe_running_km=Number(this.add.lbe_closing_km)-Number(this.add.lbe_starting_km);
  }

  public res: any = {};
  onChange(data)
  {
    
    try{
    this.add.lbe_vehicle_no=this.appservice.Transport_Rows.filter(e => e.value == data)[0].label; 
    this.appservice.get("Api/Transaction/get_Closing_No?ID="+this.add.lbe_vehicle_id).subscribe((res: any) => { 
      
      this.res = JSON.parse(res).record;
      this.add.lbe_starting_km=this.res[0].Closing;
      this.add.lbe_starting_date=this.res[0].date;
        
    }); 
  }
  catch{}
  }

  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.ID=this.add.lbe_id;
    this.add.ColumnPerfix = "lbe_";
    this.add.Table_Name = "Log_Book_Entry";
    this.add.Created_by = this.appservice.CREATED_BY;
   this.add.lbe_running_km=this.add.lbe_closing_km-this.add.lbe_starting_km;
    // if (f.invalid === true)
    //   this.addValidation = true;
      
    // else 
    {

      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Log_Book_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              
              this.toastr.success("Details Salved Success", 'Msg');
              
              this.appservice.Log_Date=this.add.lbe_date;
              this.appservice.Vehicle_No=this.add.lbe_vehicle_id;
            //  this.appservice.get_Adjustments();
              this.Clear();
              f.submitted=false;

              this.isadd = "0";
                this.add.ID = "0";

                this.appservice.get_Log_Book_Details();
                this.add.lbe_date=this.appservice.Log_Date;
                this.add.lbe_vehicle_id=this.appservice.Vehicle_No;
                this.onChange(this.add.lbe_vehicle_id);
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
        'lbe_id': '0',
        'lbe_date': this.appservice.T_Date,
        'lbe_vehcile_id': '',
        'lbe_vehcile_no': '',
        'lbe_starting_place': '',
        'lbe_starting_km': '',
        'lbe_closing_place': '',
        'lbe_closing_km': '',
        'lbe_running_km': '',
        'lbe_remarks': '',
        'lbe_branch':this.appservice.Branch_ID
        
      };
  }

}

