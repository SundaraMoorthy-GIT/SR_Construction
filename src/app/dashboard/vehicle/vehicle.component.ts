import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

public btndisable:boolean=false;
public btndisable1:boolean=false;

  constructor(public appservice:AppService,private router: Router,) {   
   
    //this.get_Branch_Profile();
    // this.appservice.get_Recipts();
    // this.appservice.get_Emi_Loan_Issue_Details();
  }

  Demand_Amt=0
  OD_Amt=0
  Profile_Row=[];
  get_Branch_Profile() {
    this.appservice.isload = true;
    this.Profile_Row = [];
   
    this.appservice.get("Api/Collection_/get_Branch_Profile?Branch_ID=" + this.appservice.Branch_ID).subscribe((res: any) => {
      this.Profile_Row = JSON.parse(res).record;
      this.appservice.isload = false;
      try {
        this.Demand_Amt= this.Profile_Row[12]["Details"];
        this.OD_Amt= this.Profile_Row[10]["Details"];
      } catch { }
    });

  }
 
  
  load_Amt_Hand()
  {
    this.router.navigate(['report/day-book']);
  }

  load_To_collect()
  {
    // this.appservice.Due_Type="Demand";
    //this.router.navigate(['/report/billwise-out']);
    this.router.navigate(['/collection/open-loan-details']);
  }

  Today_od()
  {
    // this.appservice.Due_Type="OD";
    //this.router.navigate(['/report/od-report']);
    this.router.navigate(['/collection/open-loan-details']);
  }

  
  load_Today_Issue()
  {
    this.router.navigate(['collection/emi-loan-issue-details']);
  }
  load_Today_Collect()
  {
    this.router.navigate(['collection/receipt-details']);
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
