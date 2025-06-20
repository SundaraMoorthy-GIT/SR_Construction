import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-menu-maping',
  templateUrl: './company-menu-maping.component.html',
  styleUrls: ['./company-menu-maping.component.scss']
})
export class CompanyMenuMapingComponent implements OnInit {

   
  Selected_Company="";
  Selected_Module=""
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public Module_Row = [];
  public Rights_Row = [];
  Row = [];
  public rs = [];
  constructor( public appservice: AppService, private toastr: ToastrService, public http: HttpClient) 
  {

    this.rs = [

       { Field: 'Check', Name: 'Check', width: '10%', align: 'left', type: 'checkbox' },
       { Field: 'Module', Name: 'Module', width: '20%', align: 'left', type: 'text' },
       { Field: 'Type', Name: 'Type', width: '20%', align: 'left', type: 'text' },
       { Field: 'Display_Name', Name: 'Name', width: '25%', align: 'left', type: 'text' },
       { Field: 'Order_No', Name: 'Order', width: '10%', align: 'right', type: 'number' },
       { Field: 'Remarks', Name: 'Remarks', width: '15%', align: 'left', type: 'text' }
    ];
    
    this.get_Company();
    this.get_Module();
  }

  Company_Rows=[];
  public get_Company()
  {
    this.appservice.getc("Api/Common/get_Companys").subscribe((res: any) => {
      this.Company_Rows = JSON.parse(res).record;
     
    });
  }

Selected=false;
  select()
  {
    
    for(var i=0;i<this.Row.length;i++)
    {
      this.Row[i].Check= this.Selected;
    }
  }
 
   Back() {
    this.appservice.back();
  }


  display() {
    
    this.Row=[];
    this.appservice.get("Api/Setting/get_Company_Menu?Companys=" + this.Selected_Company +"&Module=" + this.Selected_Module).subscribe((res: any) => {
    this.Row = JSON.parse(res).record;

      for(var i=0;i<this.Row.length;i++)
      {
        var stringValue = this.Row[i].Check;
        this.Row[i].Check= stringValue.toLowerCase() == "true";
      }


    });
  }

  ngOnInit() {
  }


  public btndisable:boolean=false;

  save() {

    this.add.Company=this.Selected_Company;
    this.add.Created_by=this.appservice.CREATED_BY;
    this.add.Module=this.Selected_Module;
    this.add.items=this.Row.filter(e=>e.Check==true);
   
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
          this.appservice.isload=true;
          this.btndisable=true;

          this.http.post(this.appservice.Server_URL + 'api/Setting/Post_Menu_Master', this.add, { headers: this.headers })
            .subscribe(
              (val: string) => {
                this.appservice.isload=false;
                this.btndisable=false;

                if (val == "True") {
                  this.toastr.success("Submtted Successfully", 'Msg');
                  this.appservice.isEdit=false;
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


 

  Module_Name=[];
  get_Module() {
    this.appservice.getc("Api/Setting/get_ModuleName1").subscribe((res: any) => {
      this.Module_Row = JSON.parse(res).record;


    
    });
  }

  change(data)
  {
    var index = this.Row.findIndex(function(item, i){
      return item.ID === data.ID
    });
 
    

    if (index > -1) {

      var chk = this.Row[index]["Visble"];

      if (chk == "0")
        this.Row[index]["Visble"] = "1";
      else

        this.Row[index]["Visble"] = "0";
    }
  }

}


