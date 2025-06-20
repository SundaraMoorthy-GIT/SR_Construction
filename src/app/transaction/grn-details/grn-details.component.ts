import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grn-details',
  templateUrl: './grn-details.component.html',
  styleUrls: ['./grn-details.component.scss']
})
export class GrnDetailsComponent implements OnInit {
  public showSearch = false;
   public btndisable: boolean = false;
  constructor(public confirmationService: ConfirmationService,
    public appservice:AppService, 
    private router: Router, 
    private route: ActivatedRoute) {
      if(this.appservice.Branch_ID!=0)
      {
       this.btndisable=true;
      }
      else{
        this.btndisable=false;
      }

      this.appservice.Pur_Type="Stock IN";
      this.appservice.get_Pur_Details();
      this.appservice.get_Party_details();
      this.appservice.get_To_Area();

     }
     addReset() {
      this.appservice.isadd = "0";
      this.appservice.Edit_Row ={};
      this.appservice.isEdit=false;
      this.appservice.from_customer_page =false;
      return this.router.navigate(['/transaction/add-stockin']);
    }
  
    onEdit(item) {
      this.appservice.Edit_Row = item;
      this.appservice.from_customer_page=false;
      this.appservice.Selected_Customer=this.appservice.Patry_Row.filter(e => e.cus_id == item.pur_ledger_id)[0];
      
      this.appservice.get("Api/transaction/get_Purchase_Entry_details?Purchase_No=" + item.pur_purchase_no +"&Type="+this.appservice.Pur_Type).subscribe((res: any) => {
        this.appservice.Details_Row = JSON.parse(res).record;
        console.log(this.appservice.Details_Row)
        this.appservice.isEdit=true;
        this.router.navigate(['/transaction/add-stockin']);
        
      });
  
    }
    onDelete(item) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete press Yes?',
        accept: () => {
          this.Delete(item.pur_purchase_no)
        }
      });
  }
  Delete(item) {
    this.appservice.get("Api/transaction/delete_Purchase?Purchase_No=" + item + "&User_Name=" + this.appservice.CREATED_BY).subscribe((res: any) => {
      this.appservice.get_Pur_Details();
    });
  }
    export_excel(data)
    {
    //  this.appservice.Action_Details_Export =  this.appservice.get_fields_of('Action_Details');
  
    //  this.appservice.Excel_Data.Header=this.appservice.Action_Details_Export ;
    //  this.appservice.Excel_Data.items=this.appservice.Action_Details_Row
    //  this.appservice.export_excel();
   
    }
  
  
    
    export_pdf(data)
   {
  
    // this.appservice.Action_Details_Export =  this.appservice.get_grid_fields_of('Action_Details');
    // this.appservice.Excel_Data.Total_Row= "Total Rows : "+this.appservice.length_of(data);
  
    // this.appservice.Excel_Data.Header=this.appservice.Action_Details_Export;
    // this.appservice.Excel_Data.items=this.appservice.Action_Details_Row
    // this.appservice.export_pdf();
    }
  
    

  ngOnInit(): void {
  }

}
