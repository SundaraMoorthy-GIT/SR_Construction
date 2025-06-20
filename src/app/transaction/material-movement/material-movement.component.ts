import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-movement',
  templateUrl: './material-movement.component.html',
  styleUrls: ['./material-movement.component.scss']
})
export class MaterialMovementComponent implements OnInit {

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

    this.appservice.get_MM_Details();
    this.appservice.get_To_Area();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-material-movement']);
  }

  onEdit(item) {
    this.appservice.Edit_Row = item;
    // this.appservice.from_customer_page=true;
    // this.appservice.Selected_Customer=this.appservice.Patry_Row.filter(e => e.Cus_ID == item.Ledger_ID)[0];
    
    this.appservice.get("Api/transaction/Material_Movement_details?Purchase_No=" + item.mm_no).subscribe((res: any) => {
      this.appservice.Details_Row = JSON.parse(res).record;
      console.log(this.appservice.Details_Row)
      this.appservice.isEdit=true;
      this.router.navigate(['/transaction/add-material-movement']);
      
    });

  }
  onDelete(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(item.mm_no)
      }
    });
}
Delete(item) {
  this.appservice.get("Api/transaction/delete_Material_Movement?Purchase_No=" + item).subscribe((res: any) => {
    this.appservice.get_MM_Details();
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
