import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-rating-master',
  templateUrl: './add-rating-master.component.html',
  styleUrls: ['./add-rating-master.component.scss']
})
export class AddRatingMasterComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
  public Room_Types = [];
  public Room_Floor = [];
  public Area_From_Row = [];

  constructor(private _location: Location, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.isadd = appservice.isadd;
    this.Area_From_Row=this.appservice.get_FromMaster_Rows;
    if (this.isadd == "0") {
      this.add.trm_id = "0";
    }
    else {
      this.add = appservice.Edit_Row;
    }
  }

  public ToRow:any ={};
  onChange3(data)
  {
    this.ToRow=this.Area_From_Row.filter(e => e.value == data)[0];
    this.add.trm_from=this.ToRow.label;
  }
  
  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.Created_by = this.appservice.CREATED_BY;
    this.add.Table_Name = "Transport_Rating_Master";
    if (f.invalid === true)
      this.addValidation = true;
    else 
    {
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.appservice.Server_URL + 'api/master/Post_Transport_Rating_Master', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            if (val == "True") {
              this.toastr.success("Details Salved Success", 'Msg');
              //this.appservice.get_Transportrate_Master();
              this.appservice.get_Vehicle_Basic_Rate();
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
  Back() {
    this._location.back();
  }

  Clear() {
    this.add =
      {
        'ID': '0',
        'Name': '',
        'PNumber': '',
        'Status': '',
        'Designation': '',
        'Address': '',
      };
  }


}
