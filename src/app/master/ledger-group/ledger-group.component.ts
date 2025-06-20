import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SelectItem, ConfirmationService,} from 'primeng/api';

@Component({
  selector: 'app-ledger-group',
  templateUrl: './ledger-group.component.html',
  styleUrls: ['./ledger-group.component.scss']
})
export class LedgerGroupComponent implements OnInit {

  
  toastr: any;
Rows = [];
cols: any[];
headers;
hq_rows=[];

constructor(public confirmationService:ConfirmationService, public appservice: AppService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
  this.appservice.Status="A";
  this.appservice.Cus_Type="GoDown";
  this.appservice.get_SLedger_Master();
}


addReset()
{
  this.appservice.isadd="0";
 return this.router.navigate(['/master/add-ledger-group']);
}


onEdit(item) { 
  this.appservice.isadd="1";
  this.appservice.Edit_Row=item; 
  return this.router.navigate(['/master/add-ledger-group']);
  
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

  
  this.appservice.get("Api/Master/delete_Customer_Master?ID=" + item.cus_id + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe(( res:any )=>{
  this.appservice.get_SLedger_Master();
    });
  
  }  
  



  ngOnInit(): void {
  }

}
