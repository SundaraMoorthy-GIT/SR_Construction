  import { Component, OnInit } from '@angular/core';
  import { AppService } from 'src/app/app.service';
  import { HttpClient } from '@angular/common/http';
  import { utc } from 'moment';
import { ToastrService } from 'ngx-toastr';
  
  declare const $:any;
  
  
  @Component({
    selector: 'app-update-company-details',
    templateUrl: './update-company-details.component.html',
    styleUrls: ['./update-company-details.component.scss']
  })
  export class UpdateCompanyDetailsComponent implements OnInit {  
   
  
    public uptC:any ={};
    
  
    uptCompany:boolean = false;
  
    constructor(public appservice:AppService,private http:HttpClient, private toastr: ToastrService) {
      this.get_compnay_Details();
      
     }
     
    
  
     public btndisable:boolean=false;

  
     get_compnay_Details()
     {
        this.appservice.getc("Api/Common/Get_Company").subscribe((res:any )=>{
        this.uptC=JSON.parse(res).record[0];
        this.server=this.appservice.Server_URL+"Api/Master/UploadCompanyImage?ID="+this.uptC.CM_ID+"&Company="+this.appservice.Company+"&Name="+this.uptC.CM_Name+"&Description="+this.uptC.CM_Description;
        this.server_sign=this.appservice.Server_URL+"Api/Master/Upload_Sign_Image?ID="+this.uptC.CM_ID+"&Company="+this.appservice.Company+"&Name="+this.uptC.CM_Name+"&Description="+this.uptC.CM_Description;

       });
      
  
     }
     
     get_Company_image()
     { 
        var timeStamp = (new Date()).getTime();
       return this.appservice.Server_URL+"image/Company/"+this.uptC.CM_ID+".png?data="+timeStamp;
     }
     get_Company_sign()
     { 
        var timeStamp = (new Date()).getTime();
       return this.appservice.Server_URL+"image/Company/S_"+this.uptC.CM_ID+".png?data="+timeStamp;
     }
  
    ngOnInit() {
  
    }

    server_sign;
    server;
    uploadedFiles: any[] = [];
  
    
    onUpload(event) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      
  
      this.toastr.success("File Uploaded  Success", 'Msg');
  
    }
  }
  
    
    updateCompany(f)
    {
      f.form.value.CM_ID=this.appservice.Company.replace("_","") ; 
      this.btndisable=true;

      this.http.post(this.appservice.Server_URL+'api/Common/Update_Company_Master', f.form.value)
      .subscribe(
        (val:any) => {
          this.btndisable=false;

          if(val=="True")
          {
            this.toastr.success("Company Details Saved Successfully", 'Msg');
          }
          else
          {
            this.toastr.success(""+val, 'Msg');
          }
        },
        response => {
            console.log("POST call in error", response);
       },
        () => {
            console.log("The POST observable is now completed.");
        });
      }
  
     }
    