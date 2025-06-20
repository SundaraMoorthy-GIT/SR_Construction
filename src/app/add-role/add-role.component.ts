import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  headers;
  data;
  Ref_ID="0";
  isadd="0";
  constructor(private _location: Location,public appservice: AppService, private toastr: ToastrService,private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
  
    this.appservice.get_Dashboard();
    this.isadd=appservice.isadd;
    
    if(this.isadd=="0")
    {

    this.add.Ref_ID=appservice.Ref_ID;
    this.add.ID="0";
    this.get_Code();
    }
    else
    { 
      
      console.log(this.appservice.Edit_Row);
      this.add=appservice.Edit_Row;

      this.add.ID=appservice.Edit_Row.value;
      this.add.Code=appservice.Edit_Row.RGV_vCode;
      this.add.Ref_ID=appservice.Edit_Row.Ref_ID;
      this.add.Descrption=appservice.Edit_Row.RGV_vDesciption;
     
    }
  }

  get_Code() {
    this.appservice.get("Api/Transaction/get_Ref_Code?Type="+this.add.Ref_ID).subscribe(( res: any) => {
      this.add.Code=res;
    });
  }
  public btndisable:boolean=false;

  addData(f) {

    f.form.value.Company = this.appservice.Company;
    console.log(f.form.value);
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.btndisable=true;

    this.http.post(this.appservice.Server_URL + 'api/master/insert_Reference_Values', f.form.value, { headers: this.headers })
    .subscribe(
      (val:string) => {
        this.btndisable=false;

        if(val=="True")
        {
          
          this.toastr.success("Details Salved Success",'Msg');
         
          this.get_Reference();
          this.Clear();
       
          f.form.value.Ref_ID=this.Ref_ID;


        }
      else
      {
        this.toastr.error( val,"Error", { timeOut: 3000 });
      }
      },
      response => {
        
      this.toastr.error('Error ', response, {
        timeOut: 3000
      });

      });


    }

    get_Reference() {
      this.appservice.getc("Api/Master/get_reference").subscribe((res: any) => {
        this.appservice.Reference_Rows = JSON.parse(res).record;
        
        this._location.back();
      });
    }


    Back()
    {
      this._location.back();
    }
    
  Clear() {
    this.add =
      {
        'ID': '0',
        'Ref_ID': '',
        'Code': '',
        'Descrption': '',
        'Remarks': '',
        'Created_by': '',
        'Created_Date': '',
        'Status': ''

      };
  }
}


