import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gst2b-details',
  templateUrl: './gst2b-details.component.html',
  styleUrls: ['./gst2b-details.component.scss']
})
export class Gst2bDetailsComponent implements OnInit {
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
    this.appservice.GST2b_Details_GF = [...new Set(this.appservice.get_fields_of('GSTR2A_Data').map(item => item.Field))];
this.appservice.get_GST2b();
    }
    
   isload:boolean=false;
   public Exp_Category_=[];
   

 
 
   add()
   {
     this.appservice.isadd="0";
     this.router.navigate(['transaction/upload-2b']);
   }
     
   Total=0;
   Rows=[];
  
   addReset() {
    this.appservice.isadd = "0";
    this.appservice.Edit_Row ={};
    this.appservice.isEdit=false;
    this.appservice.from_customer_page =false;
    return this.router.navigate(['/transport/upload-2b']);
  }
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
       this.appservice.get("Api/Transaction/delete_Adjustments?Type=Income&ID=" + item+"&UserName"+this.appservice.CREATED_BY).subscribe((res: any) => {
         
         this.appservice.get_OtherCollection_Details();
       });
     }
   
 
   edit_data(data)
   {
     this.appservice.isadd = "1";
     this.appservice.Edit_Row = data;
     return this.router.navigate(['transaction/add-income']);
   }
   export_excel(data)
   {
 
    this.appservice.Excel_Data.Header=this.appservice.get_fields_of('GSTR2A_Data');
    //  this.appservice.Excel_Data.items=this.appservice.Day_Reports_GF
     this.appservice.Excel_Data.Report_Name=" Gst 2B REPORTS"
     this.appservice.Excel_Data.items=this.appservice.GST2b_Rows;
     this.appservice.export_excel();
  
   }
 
 
   
   export_pdf(data)
  {
 
   // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
   this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
 
   this.appservice.Excel_Data.Header=this.appservice.get_fields_of('GSTR2A_Data');
   this.appservice.Excel_Data.items=this.appservice.GST2b_Rows;
   this.appservice.export_pdf();
   }

  ngOnInit(): void {
  }

}
