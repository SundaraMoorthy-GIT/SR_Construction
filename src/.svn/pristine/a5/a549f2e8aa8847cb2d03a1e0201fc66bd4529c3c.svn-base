import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-page-settup',
  templateUrl: './page-settup.component.html',
  styleUrls: ['./page-settup.component.scss']
})
export class PageSettupComponent implements OnInit {
  public add:any ={};
  public btndisable:boolean=false;


  constructor(private _location: Location, public appservice: AppService,private toastr: ToastrService, public http: HttpClient) 
{
  
  this.appservice.getc("Api/Setting/get_PDF_File_Setting").subscribe((res: any) => {
    this.add = JSON.parse(res).record[0];

   this.add.Generated_By=  this.add.Generated_By.toLowerCase()=="true";
   this.add.Generated_Date=  this.add.Generated_Date.toLowerCase()=="true";
   this.add.Generated_Time=  this.add.Generated_Time.toLowerCase()=="true";

   this.add.Compnay_Address=  this.add.Compnay_Address.toLowerCase()=="true";
   this.add.Compnay_Name=  this.add.Compnay_Name.toLowerCase()=="true";
   this.add.Page_No=  this.add.Page_No.toLowerCase()=="true";

    console.log(this.add);
  });
  
}


addData(f)
{
 
   this.add.Company=this.appservice.Company;
   this.add.Company_ID=this.appservice.Company;
   this.add.Created_by=this.appservice.CREATED_BY;
   this.add.Table_Name="Pdf_file_setting";
   if (f.invalid === false)
   {

   this.btndisable=true;
         this.http.post(this.appservice.Server_URL + 'api/Master/Post_Data', this.add, { headers: this.appservice.headers })
           .subscribe(
             (val: string) => {
               this.btndisable=false;

               if(val=="True")
               { this.toastr.success("Details Salved Success", 'Msg');
               this.appservice.isEdit=false;
               this.appservice.back();
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


  ngOnInit(): void {


  }  
}
