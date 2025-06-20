import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-area-mapping',
  templateUrl: './area-mapping.component.html',
  styleUrls: ['./area-mapping.component.scss']
})
export class AreaMappingComponent implements OnInit {
  Selected_Rights="";
  
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public Module_Row = [];
  public Rights_Row = [];
  Row = [];
 rs=[];
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) 
  {
      this.Rights_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID=="User_Role");
      this.get_Module();
      this.rs = [

        { Field: 'Check', Name: 'Check', width: '10%', align: 'left', type: 'checkbox' },
        { Field: 'Area', Name: 'Area', width: '25%', align: 'left', type: 'text' },
      ];
       
  }

  btndisable:boolean=false;

  
  Selected = false;
  select() {

    for (var i = 0; i < this.Row.length; i++) {
      this.Row[i].Check = this.Selected;
    }
  }



  
  save() {

    this.add.Rights = this.Selected_Rights;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.User_ID = this.User_ID;
    this.add.User_Name = this.User_Row.filter(e=>e.User_ID==this.User_ID)[0].User_Name;

    this.add.Company = this.appservice.Company;
    this.add.items = this.Row.filter(e => e.Check == true);

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.btndisable = true;
    this.http.post(this.appservice.Server_URL + 'api/Setting/Post_User_Area', this.add, { headers: this.headers })
      .subscribe(
        (val: string) => {
          this.btndisable = false;
          if (val == "True") {
            this.toastr.success("Submtted Successfully", 'Msg');
            this.appservice.isEdit = false;
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

 
   Back() {
    this._location.back();
  }

User_ID="0";
display() {
  
  this.appservice.isload=true;
  this.appservice.get("Api/Setting/get_Area_Maping?User_ID=" + this.User_ID).subscribe((res: any) => {
    this.appservice.isload=false;
    this.Row = JSON.parse(res).record;

    for (var i = 0; i < this.Row.length; i++) {
      var stringValue = this.Row[i].Check;
      this.Row[i].Check = stringValue.toLowerCase() == "true";
    }


  });

  
}

  ngOnInit(): void {
  }
  save_data()
  {
    
    for(var i=0;i<this.Row.length;i++)
    {
     

      this.appservice.get("Api/Setting/Update_Rights?Rights="+this.Selected_Rights+"&Menu="+this.Row[i]["ID"]+"&Visble="+this.Row[i]["Visble"]).subscribe((res: any) => {
       
      });
    }
    this.toastr.success("Details Salved Success",'Msg');
  }
  User_Row=[];
  get_Module() {
    this.appservice.getc("Api/Setting/get_User_Name").subscribe((res: any) => {
      this.User_Row = JSON.parse(res).record;
    });
  }

 
}


