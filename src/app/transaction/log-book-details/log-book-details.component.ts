import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-book-details',
  templateUrl: './log-book-details.component.html',
  styleUrls: ['./log-book-details.component.scss']
})
export class LogBookDetailsComponent implements OnInit {
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

    //this.appservice.log_Details_GF = [...new Set(this.appservice.get_grid_fields_of('log_Details_GF').map(item => item.Field))];
    this.appservice.get_Log_Book_Details();
   
    }
    
   isload:boolean=false;

 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/log-book-entry']);
   }
     
   Total=0;
   Rows=[];
  
   
   onDelete(data)
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
    return this.router.navigate(['/transaction/log-book-entry']);
  }
   Delete(item) { 
       this.appservice.get("Api/Transaction/delete_Log_Book_Entry?ID=" + item+"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_Log_Book_Details();
       });
     }
   
 
     onEdit(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/log-book-entry']);
   }
   export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
 
    this.appservice.Excel_Data.Header=this.appservice.get_fields_of('Log_Book_Entry');
    this.appservice.Excel_Data.items=this.appservice.Log_Book_Details_Row;
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.get_fields_of('Log_Book_Entry');
   this.appservice.Excel_Data.items=this.appservice.Log_Book_Details_Row;
   this.appservice.export_pdf();
   }
 

  ngOnInit(): void {
  }

}
