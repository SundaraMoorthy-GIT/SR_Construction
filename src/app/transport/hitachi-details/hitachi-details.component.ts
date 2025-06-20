import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hitachi-details',
  templateUrl: './hitachi-details.component.html',
  styleUrls: ['./hitachi-details.component.scss']
})
export class HitachiDetailsComponent implements OnInit {

  public showSearch = false;
 
public btndisable:boolean=false;
  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    this.appservice.tpt_type="Hitachi";
    this.appservice.get_Vehicle_Rpt("Hitachi");
    this.appservice.get_Transport_Entry_Details();
    this.appservice.get_Party_details();
  
  }
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transport/add-hitachi']);
  }

  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.isadd = "1";
    this.appservice.Edit_Row = item;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transport/add-hitachi']);

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
  this.appservice.get("Api/transaction/delete_Transport_Entry?Purchase_No=" + item).subscribe((res: any) => {
    
    this.appservice.get_Transport_Entry_Details();
  });
}
  export_excel(data)
  {
   //this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');

   this.appservice.Excel_Data.Header=this.appservice.Hitachi_Reports_GF ;
   this.appservice.Excel_Data.items=this.appservice.Transport_Entry_Details_Row
   this.appservice.export_excel();
 
  }


  
  export_pdf(data)
 {

  //this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
  this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);

  this.appservice.Excel_Data.Header=this.appservice.Hitachi_Reports_GF;
  this.appservice.Excel_Data.items=this.appservice.Transport_Entry_Details_Row
  this.appservice.export_pdf();
  }


  ngOnInit(): void {
  }


}
