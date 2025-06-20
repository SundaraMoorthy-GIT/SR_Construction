import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public showSearch = false;

  Rows = [];
  cols: any[]; 
  public add: any = {};
  constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.appservice.Status="A";
    this.appservice.Cus_Type="Employee";
    this.appservice.get_SLedger_Master();
  }

  Back() {
    this._location.back();
  }

  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['master/add-employee']);
  }

  onEdit(item) {
    this.appservice.isadd = "1";
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-employee']);
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
    this.appservice.get("Api/Master/delete_employee_master?ID=" + item.Emp_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
      
    this.appservice.get_SLedger_Master();
    });
  }

  onActive(item) {
    this.confirmationService.confirm({
        message: 'Do you want retrieve data press Yes?',
        accept: () => {
          this.Active(item) 
        }
    });
  }
  Active(item) {
    this.appservice.get("Api/Master/delete_employee_master?ID=" + item.Emp_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=A").subscribe((res: any) => {
      
    this.appservice.get_SLedger_Master();
    });
  }

  onChange(data)
  {
    this.appservice.get_SLedger_Master();
  }

  export_excel(data)
  {
   this.appservice.Customer_Master_Export =  this.appservice.get_fields_of('Customer_Master');

   this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
   this.appservice.Excel_Data.items=this.appservice.Employee_Master_Rows
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Customer_Master_Export =  this.appservice.get_grid_fields_of('Customer_Master');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
  this.appservice.Excel_Data.items=this.appservice.Employee_Master_Rows
  this.appservice.export_pdf();
  }
  
  ngOnInit() { 

  }

}
