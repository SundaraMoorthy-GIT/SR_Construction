import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  public showSearch = false;
   public btndisable: boolean = false;
  constructor(public confirmationService:ConfirmationService,public appservice:AppService,public router:Router) {
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    
    try
    {
      if(appservice.Payment_Details_Row.length<=0)
      {
        appservice.get_Payment()
      }
    }
    catch{
      appservice.get_Payment()
    }

   }


   add()
   {
    this.router.navigate(['/transaction/add-payment']);
   }

 

  delete_data(data)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(data.ID) ;

      }
  });
  }

 
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-payment']);
  }
  Delete(item) { 
 
      this.appservice.get("Api/Transaction/delete_Paid_Amount?ID=" + item + "&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
        this.appservice.get_Payment();
        
      });
    }
  


    onEdit(data)
    {
      this.appservice.isadd = "1";
      this.appservice.Selected_Customer=false;
      this.appservice.Edit_Row = data;
      return this.router.navigate(['transaction/add-payment']);
    }


    export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
 
    this.appservice.Excel_Data.Header=this.appservice.Payment_Export ;
    this.appservice.Excel_Data.items=this.appservice.Payment_Details_Row
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.Payment_Export;
   this.appservice.Excel_Data.items=this.appservice.Payment_Details_Row
   this.appservice.export_pdf();
   }
  ngOnInit(): void {
  }
}
