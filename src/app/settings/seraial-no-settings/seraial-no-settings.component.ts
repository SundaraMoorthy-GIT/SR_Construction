import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-seraial-no-settings',
  templateUrl: './seraial-no-settings.component.html',
  styleUrls: ['./seraial-no-settings.component.scss']
})
export class SeraialNoSettingsComponent implements OnInit {

  constructor(public confirmationService: ConfirmationService,public appservice:AppService, private router: Router, private route: ActivatedRoute) { 
    this.appservice.get_Seraial_No_Settings();


  }
  addReset() {
    this.appservice.isadd = "0";
    return this.router.navigate(['/settings/add-serial-no']);
  }
  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.Edit_Row = item;
    return this.router.navigate(['/settings/add-serial-no']);
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
    this.appservice.get("Api/Setting/delete_Seraial_No_Settings?ID=" + item).subscribe((res: any) => {
      var index = this.appservice.Seraial_No_Settings_Rows.findIndex(function (items, i) {
        return items.ID === item
      });
      if (index > -1) {
        this.appservice.Seraial_No_Settings_Rows.splice(index, 1);
      }
      this.appservice.Seraial_No_Settings_Rows = this.appservice.Seraial_No_Settings_Rows;
      this.appservice.get_Seraial_No_Settings();
    });
  }
 
  ngOnInit(): void {
  }

}
