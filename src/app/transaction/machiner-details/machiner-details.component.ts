import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machiner-details',
  templateUrl: './machiner-details.component.html',
  styleUrls: ['./machiner-details.component.scss']
})
export class MachinerDetailsComponent implements OnInit {

  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 

    this.appservice.oc_type="MachinerUsage";
    this.appservice.get_OtherCollection_Details();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-machiner']);
  }

  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.Edit_Row = item;
    return this.router.navigate(['/transaction/add-machiner']);

  }
  onDelete(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(item.oc_no)
      }
    });
}
Delete(item) {
  this.appservice.get("Api/transaction/delete_OtherCollection?Purchase_No=" + item).subscribe((res: any) => {
    this.appservice.get_OtherCollection_Details();
  });
}
  export_excel(data)
  {
  //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');

  //  this.appservice.Excel_Data.Header=this.appservice.Action_Details_Export ;
  //  this.appservice.Excel_Data.items=this.appservice.Action_Details_Row
  //  this.appservice.export_excel();
 
  }


  
  export_pdf(data)
 {

  // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  // this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  // this.appservice.Excel_Data.Header=this.appservice.Action_Details_Export;
  // this.appservice.Excel_Data.items=this.appservice.Action_Details_Row
  // this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }


}
