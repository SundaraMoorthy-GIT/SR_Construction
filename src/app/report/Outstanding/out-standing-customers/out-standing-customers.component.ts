import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare let $: any;
@Component({
  selector: 'app-out-standing-customers',
  templateUrl: './out-standing-customers.component.html',
  styleUrls: ['./out-standing-customers.component.scss']
})

export class OutStandingCustomersComponent implements OnInit {

  public Open_Customer_Row = [];


  public Open_Customer_Total = 0;
  public Open_Customer_Length = 0;
  constructor(public appservice: AppService) {

    this.Open_Customer_Row = [];


    this.appservice.getc("Api/Collection_/get_Open_Customer").subscribe((res: any) => {
      this.Open_Customer_Row = JSON.parse(res).record;
      this.Open_Customer_Total = (this.Open_Customer_Row.reduce((sum, current) => sum + parseFloat(current.Intr_Bal), 0)).toFixed(2);
      this.Open_Customer_Length = this.Open_Customer_Row.length;
    });



    try {
      if (appservice.Customerwise_Out.length <= 0)
        this.appservice.get_OutStanding();
    }
    catch {
      this.appservice.get_OutStanding();
    }
  }

  select_Customer(rowData) {
    // this.appservice.selected_Collection=true;
    this.appservice.selected_Out_customer = rowData;
    this.appservice.load_page(this.appservice.Add_Receipt_Page);
  }

  selected_row1(row_No, dt) {


    var len = 0;
    try {
      len = dt.filteredValue.length;

    } catch { }


    if (len == 0) {
      this.select_Customer(dt.value[row_No]);

    }
    else {
      this.select_Customer(dt.filteredValue[row_No]);

    }

  }


  row_No = -1;

  up() {
    if (this.row_No >= 0) {
      this.row_No = this.row_No - 1;
    }
  }

  down() {
    this.row_No = this.row_No + 1;
  }



  ngOnInit(): void {
    $(".itext").focus();
  }

}
