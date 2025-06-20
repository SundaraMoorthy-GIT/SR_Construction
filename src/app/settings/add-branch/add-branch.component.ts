import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent {

add:any={};
  public btndisable:boolean=false;
  constructor(public appservice:AppService,private toastr: ToastrService, private http: HttpClient) {
    if(this.appservice.isEdit)
    {
      this.get_Manager_Name();
      this.add=appservice.Edit_Row;
      this.add.Manager=this.add.Manager
    }
    else
    {
     this.get_Manager_Name();
      this.clear();
      this.add.ID="0";
    }
   }

   Manager_Name_Row=[];
   get_Manager_Name(){ 
     this.appservice.getc("Api/master/get_Manager_Name").subscribe((res:any )=>{
     this.Manager_Name_Row=JSON.parse(res).record;   
   });
   }
   
   clear()
   {
    this.add.Branch_Name="";
    this.add.Branch_Address="";
    this.add.Email="";
    this.add.Pincode="";
    this.add.Mobile_No="";
    this.add.Phone_No="";
    this.add.Manager="";
    this.add.City="";
    this.add.State="";
   } 
   addData(f)
   {
    
      this.add.Company=this.appservice.Company;
      this.add.Company_ID=this.appservice.Company;
      this.add.Created_by=this.appservice.CREATED_BY;
      this.add.Table_Name="Branch_Details";
      if (f.invalid === false)
      {
  
      this.btndisable=true;
      this.appservice.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
            this.http.post(this.appservice.Server_URL + 'api/Setting/Post_Branch_Master', this.add, { headers: this.appservice.headers })
              .subscribe(
                (val: string) => {
                  this.btndisable=false;

                  if(val=="True")
                  { this.toastr.success("Details Salved Success", 'Msg');

                  if(this.appservice.isEdit)
                  {
                    this.appservice.back();

                  }
                  else
                  {
                  this.appservice.isEdit=false;    
                  $(".cls_0").focus();
                  f.submitted=false;
                  this.clear();
                  }
                }
                else{
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
   Back()
   {
    this.appservice.back();
   }
  ngOnInit(): void {
  }


}
