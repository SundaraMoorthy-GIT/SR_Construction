import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bunk-entry-details',
  templateUrl: './bunk-entry-details.component.html',
  styleUrls: ['./bunk-entry-details.component.scss']
})
export class BunkEntryDetailsComponent implements OnInit {
  public showSearch = false;
  dbe_id = 0;
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
    this.appservice.get_Daily_Bunk_Entry_Details();
   
    }
    
   isload:boolean=false;

 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/add-bunk-entry']);
   }
     
   Total=0;
   Rows=[];
  
   addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transport/add-bunk-entry']);
  }
   onDelete(data)
   {
     this.confirmationService.confirm({
       message: 'Are you sure that you want to delete press Yes?',
       accept: () => {
         this.Delete(data) 
       }
   });
   }
 
   
   Delete(item) { 
       this.appservice.get("Api/Transaction/delete_Daily_Bunk_Entry?ID=" + item+"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_Daily_Bunk_Entry_Details();
       });
     }
   
 
     onEdit(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/add-bunk-entry']);
   }
   export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
 
    this.appservice.Excel_Data.Header=this.appservice.Daily_Bunk_Export;
    this.appservice.Excel_Data.items=this.appservice.Daily_Bunk_Details_Row;
    this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.Daily_Bunk_Export;
   this.appservice.Excel_Data.items=this.appservice.Daily_Bunk_Details_Row;
   this.appservice.export_pdf();
   }
 

  ngOnInit(): void {
  }

}
