import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
declare let $: any;

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  Row = [];
  constructor(public appservice: AppService,private router: Router) {

    this.appservice.get_Ledger_Master();
   
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Customer_details="Customer";
    this.appservice.isEdit=false;
    return this.router.navigate(['master/add-customer']);
  }

 
  

  select_Ledger(rowData) {
    this.appservice.from_customer_page=true;
    this.appservice.Selected_Customer = rowData;
    this.appservice.back();
  }

  selected_row1(row_No, dt) {


    var len = 0;
    try {
      len = dt.filteredValue.length;

    } catch { }


    if (len == 0) {
      this.select_Ledger(dt.value[row_No]);
      
    }
    else {
      this.select_Ledger(dt.filteredValue[row_No]);
      
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
