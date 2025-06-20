import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-contractordetails',
  templateUrl: './contractordetails.component.html',
  styleUrls: ['./contractordetails.component.scss']
})
export class ContractordetailsComponent implements OnInit {

  public showSearch = false;

  Rows = [];
  cols: any[]; 
  public add: any = {};
  public order_by=" con_name asc ";
  constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.add.select_mode="A";
    this.get_contractor_master(this.add.select_mode);
  }

  Back() {
    this._location.back();
  }

  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['master/add-contractor']);
  }

  onEdit(item) {
    this.appservice.isadd = "1";
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-contractor']);
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
    this.appservice.get("Api/Master/delete_contractor_master?ID=" + item.Con_Id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
      this.get_contractor_master(this.add.select_mode);
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
    this.appservice.get("Api/Master/delete_contractor_master?ID=" + item.Con_Id + "&UserName=" + this.appservice.CREATED_BY + "&Status=A").subscribe((res: any) => {
      this.get_contractor_master(this.add.select_mode);
    });
  }

  get_contractor_master(Status) {
      
    this.appservice.get("Api/Master/get_contractor_master?Status=" + Status+"&Order_by="+this.order_by).subscribe((res: any) => {
      
      this.appservice.contractor_Master_Rows = JSON.parse(res).record;

    });
  }

  export_excel(data)
  {
   this.appservice.Customer_Master_Export =  this.appservice.get_fields_of('Customer_Master');
   this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
   this.appservice.Excel_Data.items=this.appservice.contractor_Master_Rows
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {

  this.appservice.Customer_Master_Export =  this.appservice.get_grid_fields_of('Customer_Master');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
  this.appservice.Excel_Data.items=this.appservice.contractor_Master_Rows
  this.appservice.export_pdf();
  }
  
  ngOnInit() { 

  }

}
