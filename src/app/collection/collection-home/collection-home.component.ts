import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-collection-home',
  templateUrl: './collection-home.component.html',
  styleUrls: ['./collection-home.component.scss']
})
export class CollectionHomeComponent implements OnInit {

  constructor(public appservice:AppService,private router: Router,) {

    this.appservice.get_product_Master1();
    this.appservice.get_Estimate_Details();
    this.appservice.get_Bank_Master();
    this.appservice.GoDown = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "GoDown");
    this.appservice.dashboard_data();
    this.appservice.get_DB_Bank_Details();
  }

  
    load_Group_details()
  {
    this.router.navigate(['collection/group_details']);
  }


 
  
  load_Amt_Hand()
  {
    this.router.navigate(['report/day-book']);
  }
  load_To_collect()
  {
    this.router.navigate(['report/Outstanding-customer']);
  }
  Today_Exp()
  {
    this.router.navigate(['/collection/voucher-details']);
  }
  load_Today_Issue()
  {
    this.router.navigate(['collection/emi-loan-issue-details']);
  }
  load_Today_Collect()
  {
    this.router.navigate(['transaction/receipt-details']);
  }
  load_Bank_Balance()
  {
    this.router.navigate(['report/bank-balance']);
  }
  ngOnInit(): void {
    this.appservice.mobile_menu=true;
  }

  
  ngOnDestroy() {
    this.appservice.mobile_menu=false;
  }

}
