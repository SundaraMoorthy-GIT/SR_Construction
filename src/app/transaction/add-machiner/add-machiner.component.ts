import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-machiner',
  templateUrl: './add-machiner.component.html',
  styleUrls: ['./add-machiner.component.scss']
})
export class AddMachinerComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  // Selected_Project = "";
  public Mach_Row = [];
  Type_rows=[];
  public Bill_Mode_Row=[];
  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    
    this.Mach_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Machine");
    this.isadd = appservice.isadd;
    this.appservice.Project_Row=this.appservice.Estimate_Details_Rows;
    if (this.appservice.isEdit) {
      this.add = appservice.Edit_Row;
      this.add.oc_date = appservice.datefromat(this.appservice.Edit_Row.oc_date);
      this.get_Image_details();
      
    }
    else {
      this.add.oc_id = "0";
      this.get_othercol_No();
      this.add.oc_date =this.appservice.T_Date;
      //this.get_Image_details();
    }
    if (this.appservice.from_customer_page == true) {

      this.add.oc_projectno = this.appservice.Selected_Customer.est_unino;
      this.add.oc_projectdate = this.appservice.Selected_Customer.est_confdate;
      this.add.oc_projectname = this.appservice.Selected_Customer.est_projectname;
      this.add.oc_projectid = this.appservice.Selected_Customer.est_projectid;
      this.add.oc_contact_no = this.appservice.Selected_Customer.est_contact_no;
      this.add.oc_ledger_id = this.appservice.Selected_Customer.est_ledger_id;
      this.add.oc_ledger_name = this.appservice.Selected_Customer.est_ledger_name;
      this.add.oc_gst_no = this.appservice.Selected_Customer.est_gst_no;
      this.add.oc_ledger_address1 = this.appservice.Selected_Customer.est_ledger_address1;
      this.add.oc_ledger_address2 = this.appservice.Selected_Customer.est_ledger_address2;
      //this.add.mm_ledgerpin = this.appservice.Selected_Customer.est_ledgerpin;
      //this.add.mm_ledgerloc = this.appservice.Selected_Customer.est_ledgerloc;
      this.add.oc_ledgerstcd=this.appservice.Selected_Customer.est_ledgerstcd;
    }
  }
  
  public SelRow:any ={};
  onChange(data)
  {
  this.SelRow=this.Mach_Row.filter(e => e.value == data)[0];
  this.add.oc_category=this.SelRow.label;
  }
  onChange1(data)
  {
    //this.get_Stock_Row();
  }
  addData(f) {
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.Table_Name = "Other_Collection";
    this.add.Company = this.appservice.Company;
    this.add.ID=this.add.oc_id;
    this.add.ColumnPerfix = "oc_";
    this.add.oc_type="MachinerUsage";
    // this.add.Est_ProjectName=this.Selected_Project;
    // this.add.Est_Company=this.appservice.Company;
    // if (f.invalid === true)
    //   this.addValidation = true;
    // else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Other_Collection', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Bank_Master();
              this.Clear();
              f.submitted=false;
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
  }

  get_customers() {
    return this.router.navigate(['/project-search']);

  }
  get_othercol_No() {
    this.appservice.getc("Api/Transaction/get_othercol_No").subscribe((res: any) => {
      this.add.oc_no = res;
      this.get_Image_details();
    });
  }
  Back() {
    this._location.back();
  }

  get_Image_details()
  {
     this.server=this.appservice.Server_URL+"Api/Master/Upload_Expense_Document?Ref_Type=Machiner&Ref_ID=1&Name="+this.add.oc_no+"&Description=Machiner Expense&Company="+this.appservice.Company;
  }


  get_image()
  { 
     var timeStamp = (new Date()).getTime();
     return this.appservice.Server_URL+"Image/C"+this.appservice.Company+"/Expense/"+this.add.oc_no+".png?data="+timeStamp;
  }
  uploadedFiles: any[] = [];

  server;
 onUpload(event) {
     for(let file of event.files) {
         this.uploadedFiles.push(file);
     }
     this.toastr.success("File Uploaded  Success", 'Msg');
     
 }
  Clear() {
    this.add =
      {
        'ID': '0',
        'Est_No': '',
        'Est_Date': this.appservice.T_Date,
        'Ledger_ID': '0',
        'Customer_Name': '',
        'Contact_No': '',
        'Customer_Address1': '',
        'Customer_Address2': '',
        'CusLoc': '',
        'CusPin': '',
        'st_CusGST': '',
        'CusStcd': '',
        'ProjectId': '0',
        'ProjectName': '',
        'ConfDate': this.appservice.T_Date,
        'Location': '',
        'Period': '',
        'Amount': '',
      };
  }

}
