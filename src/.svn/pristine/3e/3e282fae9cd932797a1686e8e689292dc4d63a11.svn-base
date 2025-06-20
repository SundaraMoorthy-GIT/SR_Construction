import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-setting-dashboard',
  templateUrl: './setting-dashboard.component.html',
  styleUrls: ['./setting-dashboard.component.scss']
})
export class SettingDashboardComponent implements OnInit {
  [x: string]: any;

  constructor(public appservice: AppService,private router: Router, private route: ActivatedRoute) { }
  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/settings/page-settup']);
  
  }
  field() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/settings/field-setting']);
  
  }
  user() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/user-details']);
  
  }
  areamapping() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/settings/area-mapping']);
  
  }
 company() { 
    this.appservice.isadd = "0";
    return this.router.navigate(['settings/company-menus']);
  
  }
  menu() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/update-company']);
  
  }

  ngOnInit(): void {
  }

}
