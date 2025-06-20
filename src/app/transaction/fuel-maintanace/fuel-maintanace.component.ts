import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-maintanace',
  templateUrl: './fuel-maintanace.component.html',
  styleUrls: ['./fuel-maintanace.component.scss']
})
export class FuelMaintanaceComponent implements OnInit {

  public showSearch = false;
  Ledger_ID = 0;
  public btndisable: boolean = false;
  constructor(public confirmationService:ConfirmationService,public appservice:AppService,public router:Router) {
    if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    this.appservice.oc_type="Vehicle Maintanace";
    this.appservice.Cus_Type="Supplier";
    this.appservice.get_SLedger_Master();
    this.Ledger_ID = 0;
    this.appservice.get_OtherCollection_Details();
    this.get_Ledger_Category();
     try{
     if(appservice.Exp_Rows.length<=0)
     {
       appservice.get_OtherCollection_Details();
     }
       }catch{
        appservice.get_OtherCollection_Details();
        }
 
 
    }
    
   isload:boolean=false;
   public Exp_Category_=[];
   
   get_Ledger_Category() {
   try{
       this.Exp_Category_ = this.appservice.Ledger_Master_Rows.filter(e =>this.appservice.Grp_Expense_type.includes(e.Group_ID));
   }
   catch{}
 
   }
 
   addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    return this.router.navigate(['/transaction/fuel-maintanace-entry']);
  }
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/fuel-maintanace-entry']);
   }
     
   Total=0;
   Rows=[];
  
   
   delete_data(data)
   {
     this.confirmationService.confirm({
       message: 'Are you sure that you want to delete press Yes?',
       accept: () => {
         this.Delete(data) 
       }
   });
   }
 
   place_holder = "Type Category ";
 
   
   Delete(item) { 
       this.appservice.get("Api/Transaction/delete_Adjustments?Type=Vehicle Maintanace&ID=" + item+"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_OtherCollection_Details();
       });
     }
   
 
   edit_data(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/fuel-maintanace-entry']);
   }
   export_excel(data)
   {
    //this.appservice.Customer_Master_Export =  this.appservice.get_grid_fields_of('Ledger_Master');
 
    this.appservice.Excel_Data.Header=this.appservice.TransportMain_Export ;
    this.appservice.Excel_Data.items=this.appservice.OtherCollection_Details_Row
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
    //this.appservice.Customer_Master_Export =  this.appservice.get_grid_fields_of('Ledger_Master');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.TransportMain_Export;
   this.appservice.Excel_Data.items=this.appservice.OtherCollection_Details_Row
   this.appservice.export_pdf();
   }
 

  ngOnInit(): void {
  }

}
