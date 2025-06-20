import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-transport-rating-master',
  templateUrl: './transport-rating-master.component.html',
  styleUrls: ['./transport-rating-master.component.scss']
})
export class TransportRatingMasterComponent implements OnInit {
  public showSearch = false;
  Rows = [];
  cols: any[];
  public add: any = {};
  public vType="S";
  constructor(public confirmationService:ConfirmationService,private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    
    this.add.select_mode="A";
    this.get_Transportrate_Master(this.add.select_mode);
    this.appservice.get_FromMaster();
  }

  Back() {
    this._location.back();
  }

  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['master/add-rating-master']);
  }

  onEdit(item) {
    this.appservice.isadd = "1";
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-rating-master']);
  }
  onDelete(item) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete press Yes?',
        accept: () => {
          //this.Delete(item) 
          this.appservice.get("Api/Master/delete_Transport_Rating_Master?ID=" + item.trm_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
             this.get_Transportrate_Master(this.add.select_mode);
          });
        }
    });
  }
  onActive(item) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Activate press Yes?',
        accept: () => {
          this.appservice.get("Api/Master/delete_Transport_Rating_Master?ID=" + item.trm_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=A").subscribe(
            (res: any) => {
            this.get_Transportrate_Master(this.add.select_mode);
            });
         
        }
    });
  }
  get_Transportrate_Master(Status) {
      
    this.appservice.get("Api/Master/get_Transport_Rating_Master?Status=" + Status+"&Order_by="+this.appservice.Transport_Order_by).subscribe((res: any) => {
      
      this.appservice.Transportrate_Master_Rows = JSON.parse(res).record;

    });
  }

  export_excel(data)
  {
   //this.appservice.Transportrate_Master_Export =  this.appservice.get_fields_of('Transportrate_Master');

   this.appservice.Excel_Data.Header=this.appservice.Transportrate_Master_Export;
   this.appservice.Excel_Data.items=this.appservice.Transportrate_Master_Rows;
   this.appservice.export_excel();
  }


  export_pdf(data)
 {
  //this.appservice.Supplier_Master_Export =  this.appservice.get_grid_fields_of('Supplier_Master');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.appservice.Transportrate_Master_Export;
  this.appservice.Excel_Data.items=this.appservice.Transportrate_Master_Rows
  this.appservice.export_pdf();
  }
  ngOnInit() {

  }

}
