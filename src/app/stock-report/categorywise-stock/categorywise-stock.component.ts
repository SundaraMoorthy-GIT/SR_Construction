import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-categorywise-stock',
  templateUrl: './categorywise-stock.component.html',
  styleUrls: ['./categorywise-stock.component.scss']
})
export class CategorywiseStockComponent implements OnInit {
  public btndisable: boolean = false;

  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
     if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }


    this.appservice.get_stock_category_Row();
  
  }
  
  export_excel(data)
  {
  // this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');

   //this.appservice.Excel_Data.Header=this.appservice.Pur_Details_GF ;
  // this.appservice.Excel_Data.items=this.appservice.Pur_Details_Row
  // this.appservice.export_excel();
 
  }


  
  export_pdf(data)
 {

  //this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  //this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

 // this.appservice.Excel_Data.Header=this.appservice.Pur_Details_GF;
  //this.appservice.Excel_Data.items=this.appservice.Pur_Details_Row
 // this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }

}
