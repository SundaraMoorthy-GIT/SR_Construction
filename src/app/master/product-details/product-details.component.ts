import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  Rows = [];
  cols: any[]; 
  public add: any = {};
  public vType="Product";
  constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.appservice.vType=this.vType;
    this.add.select_mode="A";
    this.appservice.get_product_Master(this.add.select_mode);
  }

  Back() {
    this._location.back();
  }

  addReset() {
    this.appservice.vType=this.vType;
    this.appservice.isadd = "0";
    this.appservice.Product_details="Product";
    return this.router.navigate(['master/add-product']);
  }

  onEdit(item) {
    this.appservice.vType=this.vType;
    this.appservice.isadd = "1";
    this.appservice.Product_details="Product";
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-product']);
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
    this.appservice.get("Api/Master/delete_Product_Master?ID=" + item.pm_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
      this.appservice.get_product_Master(this.add.select_mode);
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
    this.appservice.get("Api/Master/delete_Product_Master?ID=" + item.pm_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=A").subscribe((res: any) => {
      this.appservice.get_product_Master(this.add.select_mode);
    });
  }

  public Product_Master_Export = [];
  export_excel(data)
  {
   this.Product_Master_Export =  this.appservice.get_fields_of('Product_Master');

   this.appservice.Excel_Data.Header=this.Product_Master_Export;
   this.appservice.Excel_Data.items=this.appservice.Product_Master_Rows
   this.appservice.export_excel();
 
  }


  export_pdf(data)
 {
  this.Product_Master_Export =  this.appservice.get_fields_of('Product_Master');

  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.Product_Master_Export;
  this.appservice.Excel_Data.items=this.appservice.Product_Master_Rows
  this.appservice.export_pdf();
  }
  
  ngOnInit() { 

  }

}
