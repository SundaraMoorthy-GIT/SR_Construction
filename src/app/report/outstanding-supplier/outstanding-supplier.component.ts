import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare let $: any;

@Component({
  selector: 'app-outstanding-supplier',
  templateUrl: './outstanding-supplier.component.html',
  styleUrls: ['./outstanding-supplier.component.scss']
})
export class OutstandingSupplierComponent implements OnInit {

  
   public btndisable: boolean = false;
   constructor(public appservice: AppService) {

    //this.appservice.select_mode="Pending";
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    try {
      if (appservice.Supplierwise_Out.length <= 0)
        this.appservice.get_Payable_OutStanding();
    }
    catch{
      this.appservice.get_Payable_OutStanding();
    }
  }

  select_Customer(rowData) {
    this.appservice.selected_Out_supplier = rowData;
    this.appservice.load_page('/transaction/add-payment');
  }



  getdata(data)
  {
    this.appservice.get_Payable_OutStanding();
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
