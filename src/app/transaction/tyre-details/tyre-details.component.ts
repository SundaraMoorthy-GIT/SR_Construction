import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tyre-details',
  templateUrl: './tyre-details.component.html',
  styleUrls: ['./tyre-details.component.scss']
})
export class TyreDetailsComponent implements OnInit {
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
      

    this.appservice.get_Vehicle();
    this.appservice.get_Tyre_Master();
    this.appservice.get_Tyre_Entry();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    return this.router.navigate(['/transaction/re-tyre-entry']);
  }

  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.Edit_Row = item;
    return this.router.navigate(['/transaction/re-tyre-entry']);

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
  this.appservice.get("Api/Transaction/delete_Tyre_Entry?ID="+item+"&UserName=" + this.appservice.CREATED_BY).subscribe((res: any) => {
         
    this.appservice.get_Tyre_Entry();
  });
}
  export_excel(data)
  {
  //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
  this.appservice.Excel_Data.Header=this.appservice.Tyre_Entry_Report_Export;
  this.appservice.Excel_Data.items=this.appservice.Tyre_Entry_Rows
  this.appservice.export_excel();
 
  }


  
  export_pdf(data)
 {

  // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.appservice.Tyre_Entry_Report_Export;
  this.appservice.Excel_Data.items=this.appservice.Tyre_Entry_Rows
  this.appservice.export_pdf();
  }



  ngOnInit(): void {
  }

}
