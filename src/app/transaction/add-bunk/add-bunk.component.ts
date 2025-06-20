import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-bunk',
  templateUrl: './add-bunk.component.html',
  styleUrls: ['./add-bunk.component.scss']
})
export class AddBunkComponent implements OnInit {
  
ngOnInit() { }
public rows = [];
public add: any = {};
public btndisable: boolean = false;
public addValidation: boolean = false;
public btndisable1: boolean = false;
    
headers;
data;
isadd = "0";
Category_rows=[];
constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  if (this.appservice.Branch_ID != 0) {
      this.add.be_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }

  this.isadd = appservice.isadd;
  this.Category_rows=appservice.get_ref('bunk_Category');
  if (this.isadd == "0") {
    this.Clear();
      this.add.be_branch = this.appservice.Branch_ID;
    this.add.ID = "0";
    this.get_Bunk_No() ;
    this.add.be_date = appservice.T_Date;
    this.add.be_type = "bunk";
  }
  else {
    this.add = appservice.Edit_Row;
    this.add.be_date = appservice.datefromat(appservice.Edit_Row.be_date);
  }
}

calc_tempdata()
{
 this.add.be_amount=Number(this.add.be_qty)*Number(this.add.be_rate);
}


public refRow:any ={};
  onChange(data)
  {
    this.refRow=this.appservice.get_ref('bunk_Category').filter(e => e.value == data)[0];
    this.add.be_category=this.refRow.label;
  }

  public refRow1:any ={};
  onChange1(data)
  {
    this.refRow=this.appservice.SProject_Rows.filter(e => e.value == data)[0];
    this.add.be_projectname=this.refRow.label;
  }
  get_Bunk_No() {
    this.appservice.getc("Api/Transaction/get_Bunk_No").subscribe(( res: any) => {
      this.add.be_voucherno=res;
    });
  }




  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.be_type = "bunk";
    this.add.ID=this.add.be_id;
    this.add.ColumnPerfix = "be_";
    this.add.Table_Name = "Bunk_Entry";
    
    if(parseFloat(this.add.oc_amount)<=0)
    {

      this.toastr.error("Amount Should not be Zero", "Error", { timeOut: 3000 });
      return;
    }

      
    //   try{
    //   if(this.add.oc_received_bank=="0"|| this.add.oc_received_bank==null ||  this.add.oc_received_bank== undefined || Number(this.add.oc_received_bank)==0)
    //   {
    //     this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //     return;
    //   }
    // }catch{
      
    //   this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //   return;
    // }
   


    this.add.Created_by = this.appservice.CREATED_BY;
   
    // if (f.invalid === true)
    //   this.addValidation = true;
      
    // else 
    {

      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Bunk_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              
              this.toastr.success("Details Salved Success", 'Msg');
            //  this.appservice.get_Adjustments();
              this.Clear();
              this.appservice.pay_Mode_reset();
              f.submitted=false;
             
              this.get_Bunk_No();

              this.isadd = "0";
                this.add.ID = "0";

                this.appservice.get_Bunk_Detail();
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
        'be_id': '0',
        'be_voucherno': 'BA',
        'be_date': this.appservice.T_Date,
        'be_Category': '',
        'be_type': '',
        'be_product': '',
        'be_ledger_id': '',
        'be_ledger_name': '',
        'be_projectid': '',
        'be_Narration1': '',
        'be_Narration2': '',
        'be_projectno': '',
        'be_projectname': '',
        'be_qty': '',
        'be_rate': '',
        'be_Amount': '0',
        'be_created_by': '',
        'be_created_date': '',
        'be_status': '',
      };
  }
}
