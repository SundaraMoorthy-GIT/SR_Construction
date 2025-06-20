import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  
  add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;

  public UOM_Row = [];

  isadd="0";

  constructor(private _location: Location,public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.UOM_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "UOM");

    this.isadd = appservice.isadd;
    if (this.isadd == "0") {
      this.add.pm_id = "0";
    }
    else {
      this.add = appservice.Edit_Row;
    }
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

  this.appservice.get("Api/Collection_/delete_Ledger_Document?ID=" + item).subscribe((res: any) => {
    
  });
}
  
  
    

  
  Valid;

  addData(f) {
    
    this.addValidation = false;
    this.btndisable=true;
    this.add.pm_type=this.appservice.vType;
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;    
    this.add.ID=this.add.pm_id;
    this.add.pm_item_group="1";
    this.add.Table_Name="Product_Master";
    this.add.ColumnPerfix="pm_";

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.appservice.Server_URL + 'api/Master/Post_Data', this.add, { headers: this.headers })
      .subscribe(
        
        (val: string) => {
          this.btndisable=false;

          if (val == "True") {
            this.toastr.success("Details Saved Success", 'Msg');
            //this.appservice.get_User_Master();
            this.Clear();
            if (this.isadd != "0") {
              this._location.back();
            }
          }
          else {
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }

        },
        response => {
          this.toastr.error('Error ', response, {
            timeOut: 3000
          });
        });
  }
  Back()
  {
    this._location.back();
  }
  Clear() {
    this.add =
    {
      'PM_id': '',
      'pm_brand': '',
      'pm_Group': '',
      'pm_name': '',
      'pm_Code': '',
      'pm_hsncode': '',
      'pm_UOM': '',
      'pm_nqty': '',
      'pm_GST': '',
      'pm_mrpprice': '',
      'pm_purprice': '',
    };
  }
  ngOnInit(): void {
  }

}
