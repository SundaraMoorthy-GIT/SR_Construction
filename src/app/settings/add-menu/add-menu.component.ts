import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  public btndisable:boolean=false;

  constructor(public appservice:AppService,private toastr: ToastrService, public http: HttpClient,) { 

    
    if( this.appservice.isEdit==true)
    {
    this.add=this.appservice.Edit_Row;
    this.get_parents();
    this.add=this.appservice.Edit_Row;
    }
    else
    {
      this.clear();
    }

  }


  get_lenght()
  {
    this.add.Order_No=this.appservice.Menu_Master_Rows.filter(e=>e.Parent_ID==this.add.Parent_ID).length;
  }
 
  clear()
  {
    this.add={};
      this.add.ID="0";
  }

modules_Parents=[];
  get_parents()
  {

    
    this.modules_Parents=this.appservice.Menu_Master_Rows.filter(e=>e.Module==this.add.Module);

    this.modules_Parents=this.modules_Parents.filter(e=>e.Type!="Menu");

    this.add.Parent_ID=this.modules_Parents[0].ID;
    this.get_lenght();
  }

  get_parent_Menus()
  {
    if(this.add.Type=="Label")
    {
      this.modules_Parents=[{Display_Name:'No Parents',ID:'0'}];
    }
    else{
      this.get_parents()
    }
  }
  
add:any={}; 
headers;
  save() {

    this.add.Company="";
    this.add.Created_by=this.appservice.CREATED_BY;
    
    this.add.Table_Name="Menu_Master";
         this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
          this.appservice.isload=true;
          this.btndisable=true;

          this.http.post(this.appservice.Server_URL + 'api/Master/Post_Menu', this.add, { headers: this.headers })
            .subscribe(

              (val: string) => {
                this.appservice.isload=false;
                this.btndisable=false;

                if (val == "True") {
                      this.toastr.success("Submtted Successfully", 'Msg');
                      if(this.appservice.isEdit=true)
                      {
                      this.appservice.isEdit=false;
                      this.appservice.get_Menu_Master();
                      this.clear();
                      }
                      else
                      { this.appservice.isEdit=false;
                        this.appservice.get_Menu_Master();
                        this.appservice.back();
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

  ngOnInit(): void {
  }

}
