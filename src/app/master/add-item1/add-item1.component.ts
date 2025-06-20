import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-add-item1',
  templateUrl: './add-item1.component.html',
  styleUrls: ['./add-item1.component.scss']
})
export class AddItem1Component implements OnInit {

  add: any = {};
  public btndisable: boolean = false;
  public UOM_Row = [];
  public Auto_Code: boolean = false;
  public server: string;

  constructor(public appservice: AppService, private toastr: ToastrService, private http: HttpClient) {
    this.UOM_Row = this.appservice.get_ref('UOM');
    
    if (this.appservice.isEdit) {
      this.add = appservice.Edit_Row;
    } else {
      this.clear(); 
    }

    this.server = `${appservice.Server_URL}Api/Master/UploadItemImage?ID=${this.add.ID}&Company=${appservice.Company}&Name=${this.add.Item_Name}&Description=${this.add.Description}`;
  }

  clear() {
    this.add = {
      ID: "0",
      pm_type: "Raw-Material",
      // Add other default values if needed
    };

    if (this.Auto_Code) {
      this.get_item_Code();
    }
  }

  get_item_Code() {
    if (!this.appservice.isEdit) {
      this.appservice.getc("Api/Master/get_Item_Code").subscribe((res: any) => {
        this.add.Item_Code = res;
      });
    }
  }

  uploadedFiles: any[] = [];

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.toastr.success("File Uploaded Successfully", 'Msg');
  }

  addData(f) {
    this.btndisable = true;
    this.add.created_date = this.appservice.T_Date_Time
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.ID = this.add.pm_id;
    this.add.pm_item_group = "1";
    this.add.Table_Name = "Product_Master";
    this.add.ColumnPerfix = "pm_";

    this.http.post(this.appservice.Server_URL + 'api/Master/Post_Data', this.add, { headers: this.appservice.headers })
      .subscribe(
        (val: string) => {
          this.btndisable = false;

          if (val === "True") {
            this.toastr.success("Details Saved Successfully", 'Msg');

            if (this.appservice.isEdit) {
              this.appservice.back();
            } else {
              this.appservice.isEdit = false;
              this.appservice.get_product_Master1();
              $(".cls_0").focus();
              f.submitted = false;
              this.clear();
            }
          } else {
            this.toastr.error(val, "Error", { timeOut: 3000 });
          }
        },
        response => {
          this.toastr.error('Error ', response, { timeOut: 3000 });
        }
      );
  }

  ngOnInit(): void {}
}
