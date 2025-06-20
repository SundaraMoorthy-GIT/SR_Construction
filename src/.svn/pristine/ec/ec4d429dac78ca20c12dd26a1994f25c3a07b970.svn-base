import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fields-setting',
  templateUrl: './fields-setting.component.html',
  styleUrls: ['./fields-setting.component.scss']
})
export class FieldsSettingComponent implements OnInit {

  Details_Row=[];

  Table_Name="";
  public rs = [];
  constructor( private toastr: ToastrService, public http: HttpClient,public appservice: AppService) 
  {
    this.get_Fields();
    this.appservice.get_Field_Setting_Table();
  }

  
add:any={}; 
headers;
public btndisable:boolean=false;
  save() {

    this.add.Company=this.appservice.Company;
    this.add.Created_by=this.appservice.CREATED_BY;
    this.add.Table_Name=this.Table_Name;
    this.add.items=this.Details_Row.filter(e=>String(e.Visible).toLocaleLowerCase()=="true");
   
         this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Authorization': 'Bearer ' + this.appservice.access_tocken });
          this.btndisable=true;
          this.http.post(this.appservice.Server_URL + 'api/Setting/Post_Field_Setting', this.add, { headers: this.headers })
            .subscribe(
              (val: string) => {
                this.btndisable=false;
                if (val == "True") {
                  this.toastr.success("Submtted Successfully", 'Msg');
                  this.appservice.isEdit=false;
                  this.Details_Row=[];
                this.appservice.get_Field_Setting();
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


  display()
  {
    this.get_Table();    
  }

    get_Fields()
    {
      this.rs=[];
      this.appservice.isload=true;
      this.appservice.get("Api/Setting/get_Fields?Table=Field_setting").subscribe((res1: any) => {
        this.rs = JSON.parse(res1).record;
        this.appservice.isload=false;
       
      });
    }
    
  
    get_Table()
    {
      this.appservice.isload=true;
      this.Details_Row=[];
      this.appservice.get("Api/Setting/get_Field_Setting?Table="+this.Table_Name).subscribe((res: any) => {
        this.appservice.isload=false;   
        this.Details_Row=JSON.parse(res).record;
    
       
        for(var i=0;i<this.Details_Row.length;i++)
        {
          var stringValue="";
          stringValue = this.Details_Row[i].Visible;
          this.Details_Row[i].Visible= String(stringValue).toLowerCase() == 'true';
      
           stringValue = this.Details_Row[i].IsEdit;
          this.Details_Row[i].IsEdit= String(stringValue).toLowerCase() == 'true';

     
          stringValue = this.Details_Row[i].Validate;
          this.Details_Row[i].Validate= String(stringValue).toLowerCase() == 'true';

          
          stringValue = this.Details_Row[i].GVisible;
          this.Details_Row[i].GVisible= String(stringValue).toLowerCase() == 'true';

     
        }
        

      });

    }

  ngOnInit(): void {
  }

}
