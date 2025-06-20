import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bule-details',
  templateUrl: './bule-details.component.html',
  styleUrls: ['./bule-details.component.scss']
})
export class BuleDetailsComponent {
 public showSearch = false;
  public btndisable1: boolean = false;
    
  constructor(public confirmationService:ConfirmationService,public appservice:AppService,public router:Router) {
   if (this.appservice.Branch_ID != 0) {
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }

    this.appservice.get_Bunk_Detail();
    
    }
 
   isload:boolean=false;
   veiw_data(data)
   {
   }
 
 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/add-bule']);
   }
     
   Total=0;
   Rows=[];
  
 
   delete_data(item)
   {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete press Yes?',
      accept: () => {
        this.Delete(item)
        console.log(item);
       }
   });
   }
 
  
 
  
   Delete(item) { 
       this.appservice.get("Api/Transaction/delete_bunk?ID=" + item +"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
         this.appservice.get_Bunk_Detail();
       });
     }
     addReset() {
      this.appservice.isadd = "0";
      this.appservice.Edit_Row ={};
      this.appservice.isEdit=false;
      this.appservice.from_customer_page =false;
      return this.router.navigate(['/transaction/add-bule']);
    }
 
   edit_data(item)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = item;
     return this.router.navigate(['transaction/add-bule']);
   }
   onEdit(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/add-bule']);
   }

   export_excel(data)
   {
   //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
   this.appservice.Excel_Data.Header=this.appservice.bunk_export;
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Report_Name="BUNK REPORTS";
   this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
   this.appservice.Excel_Data.items=this.appservice.filteredValue(data);
   this.appservice.Excel_Data.Header=this.appservice.bunk_export;
   this.appservice.Excel_Data.items=this.appservice.bunk_Rows
   this.appservice.export_pdf();
   }
 
  ngOnInit(): void {
  }
}
