import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contra-details',
  templateUrl: './contra-details.component.html',
  styleUrls: ['./contra-details.component.scss']
})
export class ContraDetailsComponent implements OnInit {
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
    this.appservice.get_Contra();
    
    }
 
   isload:boolean=false;
   veiw_data(data)
   {
   }
 
 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/add-contra']);
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
 
   addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transaction/add-contra']);
  }
 
   
   Delete(item) { 
       this.appservice.get("Api/Transaction/delete_Contra?ID=" + item+"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_Contra();
       });
     }
   
 
   edit_data(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/add-contra']);
   }
 

   export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
 
    this.appservice.Excel_Data.Header=this.appservice.Contra_Export ;
    this.appservice.Excel_Data.items=this.appservice.Contra_Rows
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.Contra_Export;
   this.appservice.Excel_Data.items=this.appservice.Contra_Rows
   this.appservice.export_pdf();
   }
 
  ngOnInit(): void {
  }

}
