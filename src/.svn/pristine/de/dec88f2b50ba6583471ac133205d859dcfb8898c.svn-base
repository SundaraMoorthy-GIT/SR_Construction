import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public appservice:AppService,private router: Router,) {}
  Load_User_Roll()
  {
   this.router.navigate(['/user-details']);
  }
  Load_Backup()
  {
   this.router.navigate(['/settings/backup']);
  }
  Load_Serial_No()
  {
   this.router.navigate(['/settings/seraial-no-settings']);
  }
  Load_Page_Settup()
  {
   this.router.navigate(['/settings/page-settup']);
  }
  Load_Company_Setting()
  {
   this.router.navigate(['/update-company']);
  }
  Load_Variable_Setting()
  {
   this.router.navigate(['/settings/variable-setting']);
  }
  Load_Field_Setting()
  {
   this.router.navigate(['/settings/field-setting']);
  }
  Load_Tempate_Setting()
  {
   this.router.navigate(['/settings/template-setting']);
  }
  Load_Upload_Item()
  {
   this.router.navigate(['/utilities/upload-item']);
  }
  Load_Upload_Employee()
  {
   this.router.navigate(['/utilities/upload-emplyees']);
  }
  Load_Upload_Supplier()
  {
   this.router.navigate(['/utilities/upload-supplier']);
  }
  ngOnInit(): void {
  }

}
