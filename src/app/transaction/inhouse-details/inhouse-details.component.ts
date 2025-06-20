import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inhouse-details',
  templateUrl: './inhouse-details.component.html',
  styleUrls: ['./inhouse-details.component.scss']
})
export class InhouseDetailsComponent implements OnInit {

  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 

    this.appservice.oc_type="Contractor";
    this.appservice.get_OtherCollection_Details();
    // this.appservice.get_Party_details();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-inhouse']);
  }

  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.from_customer_page=true;
    this.appservice.Edit_Row = item;
    this.appservice.Selected_Customer=this.appservice.Patry_Row.filter(e => e.Cus_ID == item.Est_CusId)[0];
    return this.router.navigate(['/transaction/add-inhouse']);

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
  // this.appservice.get("Api/Collection_/delete_Action_Details?ID=" + item).subscribe((res: any) => {
  //   var index = this.appservice.Action_Details_Row.findIndex(function (items, i) {
  //     return items.ID === item
  //   });
  //   if (index > -1) {
  //     this.appservice.Action_Details_Row.splice(index, 1);
  //   }
  //   this.appservice.Action_Details_Row = this.appservice.Action_Details_Row;
  //   this.appservice.get_Action_Details();
  // });
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
