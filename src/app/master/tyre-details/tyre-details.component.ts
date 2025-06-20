import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tyre-details',
  templateUrl: './tyre-details.component.html',
  styleUrls: ['./tyre-details.component.scss']
})
export class TyreDetailsComponent implements OnInit {
  public showSearch = false;
 
  public Ledger_Master_Rows=[];
  constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 

    this.appservice.Status="A";
    this.appservice.get_Tyre_Master();

  }

  Back() {
    this._location.back();
  }

  onChange(data)
  {
    this.appservice.get_Tyre_Master();
  }

  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['master/add-tyre']);
  }

  onEdit(item) {
    this.appservice.isadd = "1";
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-tyre']);
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
    this.appservice.get("Api/Master/delete_Tyre_Master?ID=" + item.ty_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
      this.appservice.get_Tyre_Master();
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
    this.appservice.get("Api/Master/delete_Tyre_Master?ID=" + item.cus_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=A").subscribe((res: any) => {
      this.appservice.get_Tyre_Master();
    });
  }



  export_excel(data)
  {
   this.appservice.Customer_Master_Export =  this.appservice.get_fields_of('Tyre_Master');

   this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
   this.appservice.Excel_Data.items=this.appservice.Tyre_Master_Rows;
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {
  this.appservice.Customer_Master_Export =  this.appservice.get_grid_fields_of('Tyre_Master');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.appservice.Customer_Master_Export;
  this.appservice.Excel_Data.items=this.appservice.Tyre_Master_Rows;
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
