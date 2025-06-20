import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-gmail-setting',
  templateUrl: './gmail-setting.component.html',
  styleUrls: ['./gmail-setting.component.scss']
})
export class GmailSettingComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.get_gmail_Details();

    
  }
  server;

  uploadedFiles: any[] = [];
  get_gmail_Details()
  {
     this.appservice.getc("Api/Common/Get_Gmail").subscribe((res:any )=>{
     this.add=JSON.parse(res).record[0];
    });

  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.toastr.success("File Uploaded  Success", 'Msg');

  }
  public btndisable:boolean=false;

  addData(f)
    {
      f.form.value.ID="1";
      f.form.value.Company=this.appservice.Company;
      this.btndisable=true;

      this.http.post(this.appservice.Server_URL+'api/Common/insert_Gmail_setting', f.form.value)
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
  Back() {
    this._location.back();
  }

 
}

