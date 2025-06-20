import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location , DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-vechile',
  templateUrl: './add-vechile.component.html',
  styleUrls: ['./add-vechile.component.scss']
})
export class AddVechileComponent implements OnInit {

  Selected_VehType = "";

  public VehType_Row = [];
  public Type_Row = [];
  add: any = {};
  public btndisable: boolean = false;
  public addValidation: boolean = false;
  headers;
  data;
  //public Date1="";
  isadd="0";
  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mmm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '35px'
  };


  onDateChanged(data) {

  }

  private selectedDate: Object = {};
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };
  public Min_Date = "";
  constructor(public datePipe: DatePipe,private _location: Location,public confirmationService: ConfirmationService,public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.VehType_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Vehicle_Type");
    this.Type_Row = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Vehicle_Type1");
    this.isadd = appservice.isadd;
    this.add.Veh_Insurance = appservice.T_Date;
    this.add.Veh_FCDate = appservice.T_Date;
    this.add.Veh_PermitDate = appservice.T_Date;
    if (this.isadd == "0") {
      this.add.Veh_ID = "0";
    }
    else {
      this.add = appservice.Edit_Row;
      this.Selected_VehType=appservice.Edit_Row.Veh_TypeId;
      try{
        //this.Date1=appservice.datefromat(appservice.Edit_Row.Insurance);
        this.add.Veh_Insurance = appservice.datefromat(appservice.Edit_Row.Insurance);
        this.add.Veh_FCDate = appservice.datefromat(appservice.Edit_Row.FCDate);
        this.add.Veh_PermitDate = appservice.datefromat(appservice.Edit_Row.PermitDate);

      }
      catch{}
      //this.add.Veh_Insurance = this.appservice.Edit_Row.Insurance;
      //this.add.Veh_Insurance = "2023-05-25";
      // this.add.Veh_FCDate = this.appservice.Edit_Row.FCDate;
      // this.add.Veh_PermitDate = this.appservice.Edit_Row.PermitDate;
    }
    this.add.Company = this.appservice.Company;
    this.add.Veh_CreatedBy = this.appservice.CREATED_BY;
  }
  
  

  addData(f) {
    this.add.Veh_Type=this.Selected_VehType;
    this.addValidation = false;
    this.btndisable=true;

    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.appservice.Server_URL + 'api/Master/insert_Vehicle_master', this.add, { headers: this.headers })
      .subscribe(
        
        (val: string) => {
          this.btndisable=false;

          if (val == "True") {
            this.toastr.success("Details Saved Success", 'Msg');
            //this.appservice.get_User_Master();
            
          this.appservice.get_Vehicle();
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
      'Veh_Code': '',
      'Veh_VehicleNo': '',
      'Veh_Type': '',
      'Veh_Make': '',
      'Veh_Model': '',
      'Veh_Insurance': '',
      'Veh_FCDate': '',
      'Veh_PermitDate': '',
    };
  }
  ngOnInit(): void {
  }

}
