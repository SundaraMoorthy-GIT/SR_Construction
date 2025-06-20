  import { Component, OnInit } from '@angular/core';
  import { AppService } from 'src/app/app.service';
  
  import { Router, ActivatedRoute } from '@angular/router';
  import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
  import { ToastrService } from 'ngx-toastr';
  import { Location } from '@angular/common';
  import { ConfirmationService } from 'primeng/api';
  
  @Component({
    selector: 'app-user-master',
    templateUrl: './user-master.component.html',
    styleUrls: ['./user-master.component.scss']
  })
  export class UserMasterComponent implements OnInit {

    authType: string;
  
    ngOnInit() {
    }
    Rows = [];
    cols: any[];
    constructor(public confirmationService:ConfirmationService,private toastr: ToastrService, public appservice: AppService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
      this.display();
  
     
    }
    addReset() {
      this.appservice.isadd = "0";
      return this.router.navigate(['add-user']);
    }
    onEdit(item) {
      this.appservice.isadd = "1";
      this.appservice.Edit_Row = item;
      return this.router.navigate(['add-user']);
    }
    onDelete(item) {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to delete press Yes?',
          accept: () => {
            this.Delete(item) 
          }
      });
    }
    
    Delete(item) {
      this.appservice.get("Api/Common/delete_User_Master?ID=" + item).subscribe((res: any) => {
        this.display();
      });
    }


    display() {
      
      this.appservice.getc("Api/Common/get_User_Master").subscribe((res: any) => {
        this.appservice.User_Master_Rows = JSON.parse(res).record;
        this.Rows =this.appservice.User_Master_Rows;
        this.cols = [
        { field: 'UM_Full_Name', header: 'Full Name', width: '' },
        { field: 'UM_User_Name', header: 'User Name', width: '' },
        { field: 'Rights', header: 'Rights', width: '' }
        ];
      });
    }

    
  
    public Excel_Data: any = {  'ID': '',
    "item":'',
    "Header":'',
  };
  
    headers;
  
    export_excel()
    {
     
      this.Excel_Data.items=this.Rows;
      this.Excel_Data.Header=this.cols;
      this.Excel_Data.Company=this.appservice.Company;
      this.Excel_Data.User="vino";
      this.Excel_Data.Report_Name="Bank Details";
      
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
     
      this.http.post(this.appservice.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
      .subscribe(
        (val:string) => {
         
          if(val=="True")
          {
            var parm="User=vino&Company="+this.appservice.Company;
            window.open(this.appservice.Server_URL+"Report/JsontToExcel?"+parm, "_blank");
            this.toastr.success("Details Salved Success",'Msg');
           
          }
        else
        {
          
          console.log(val);
          this.toastr.error( val,"Error", { timeOut: 3000 });
        }
        },
        response => {
          console.log(response);
        this.toastr.error('Error ', response, {
          timeOut: 3000
        });
  
        });
  
    }
  }
  

