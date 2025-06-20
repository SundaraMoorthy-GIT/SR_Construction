import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimate-details',
  templateUrl: './estimate-details.component.html',
  styleUrls: ['./estimate-details.component.scss']
})
export class EstimateDetailsComponent implements OnInit {

  public showSearch = false;
  public btndisable: boolean = false;
  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

    //this.appservice.Est_Details_GF = [...new Set(this.appservice.get_fields_of('Estimation').map(item => item.Field))];
    this.appservice.get_Est_Details();
    this.appservice.get_Party_details();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-estimate']);
  }

  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.from_customer_page=true;
    this.appservice.Edit_Row = item;
    this.appservice.Selected_Customer=this.appservice.Patry_Row.filter(e => e.cus_id == item.est_ledger_id)[0];
    return this.router.navigate(['/transaction/add-estimate']);

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
  this.appservice.get("Api/transaction/delete_Estimation?ID=" + item + "&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
    this.appservice.get_Est_Details();
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
