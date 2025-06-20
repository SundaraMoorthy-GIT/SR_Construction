import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location, DatePipe } from '@angular/common';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-bunk-entry',
  templateUrl: './add-bunk-entry.component.html',
  styleUrls: ['./add-bunk-entry.component.scss']
})
export class AddBunkEntryComponent implements OnInit {
  ngOnInit(): void {}
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
    public btndisable: boolean = false;
    
  headers;
  data;
  isadd = "0";

  public btndisable1: boolean = false;
  public dbe_bunk_no = [];
  public Pump_Rows = [];

  constructor(public datePipe :DatePipe,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    if (this.appservice.Branch_ID != 0) {
      this.add.dbe_branch = appservice.Branch_ID;
      this.btndisable1 = true;

    }
    else {
      this.btndisable1 = false;
    }
 

    this.Pump_Rows=appservice.get_ref('Pump');
    this.isadd=this.appservice.isadd;
    if (this.isadd == "0") {
      this.add.ID = "0";
      this.Clear();
      this.add.dbe_branch = appservice.Branch_ID;
      this.add.dbe_date=this.appservice.T_Date;
      this.add.dbe_bunk_id=this.appservice.dbe_bunk_no;
      //this.onChange(this.add.dbe_bunk_id)
    }
    else {
      this.add = appservice.Edit_Row;
      this.add.dbe_date = appservice.datefromat(appservice.Edit_Row.dbe_date);
     // this.add.Adj_Date = 1;
     
     
    }
   
  }
  
public refRow:any ={};
  calc_tempdata()
  {
   this.add.dbe_closing_liter=Number(this.add.dbe_bunk_closing)-Number(this.add.dbe_bunk_opening);
   this.add.dbe_bunk_Amount=Number(this.add.dbe_closing_liter)*Number(this.add.dbe_bunk_rate);
  }

  public res: any = {};
  onChange(data)
  {
    this.add.dbe_bunk_no = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Pump").filter(e => e.value == data)[0].label;
    try{

     this.appservice.get("Api/Transaction/get_Bunk_No1?BunkNo="+this.add.dbe_bunk_no).subscribe((res: any) => { 
      
       this.res = JSON.parse(res).record;
       this.add.dbe_bunk_opening=this.res[0].Closing;
      this.add.dbe_starting_date=this.res[0].date;
        
     }); 
   }
  catch{}
  }

  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.ID=this.add.dbe_id;
    this.add.ColumnPerfix = "dbe_";
    this.add.Table_Name = "Daily_Bunk_Entry";
    this.add.Created_by = this.appservice.CREATED_BY;

    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {

      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Daily_Bunk_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              
              this.toastr.success("Details Salved Success", 'Msg');
              
            //  this.appservice.get_Adjustments();
              this.Clear();
              f.submitted=false;

              this.isadd = "0";
                this.add.ID = "0";

                this.appservice.get_Daily_Bunk_Entry_Details();
                this.add.dbe_bunk_id=this.appservice.dbe_bunk_no;
                this.onChange(this.add.dbe_bunk_id);
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
        'dbe_id': '0',
        'dbe_date': this.appservice.T_Date,
        'dbe_bunk_no': '',
        'dbe_bunk_opening': '',
        'dbe_opening_liter': '',
        'dbe_bunk_closing': '',
        'dbe_closing_liter': '',
        'dbe_bunk_rate': '',
        'dbe_bunk_Amount': '',
        'dbe_remarks': '',
        
      };
  }

}

