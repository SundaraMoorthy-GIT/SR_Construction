import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
  public showSearch = false;
   public btndisable: boolean = false;
  Ledger_ID = 0;
  constructor(public confirmationService:ConfirmationService,public appservice:AppService,public router:Router) {
     if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }
    this.appservice.oc_type="Expense";
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
 
 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/add-expense']);
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
       this.appservice.get("Api/Transaction/delete_Adjustments?Type=Expenses&ID=" + item+"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_OtherCollection_Details();
       });
     }
   
     addReset() {
      this.appservice.isadd = "0";
      this.appservice.Edit_Row ={};
      this.appservice.isEdit=false;
      this.appservice.from_customer_page =false;
      return this.router.navigate(['/transaction/add-expense']);
    }
   edit_data(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     this.appservice.from_customer_page=false;
     return this.router.navigate(['transaction/add-expense']);
   }
 
   export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
 
    this.appservice.Excel_Data.Header=this.appservice.Expense_Export ;
    this.appservice.Excel_Data.items=this.appservice.OtherCollection_Details_Row
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.Expense_Export;
   this.appservice.Excel_Data.items=this.appservice.OtherCollection_Details_Row
   this.appservice.export_pdf();
   }
 
   ngOnInit(): void {
   }
 
 }
 