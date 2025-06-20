import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit {

  constructor(public confirmationService: ConfirmationService,private toastr: ToastrService, public http: HttpClient,public appservice: AppService, public router:Router) {
    this.appservice.isEdit==false;
    try {
      if (appservice.Menu_Master_Rows.length == 0) {
        appservice.get_Menu_Master();
      }
    } catch{
      appservice.get_Menu_Master();
    }

  }

  addReset()
  {
    this.appservice.isEdit=false;
    this.router.navigate(['/settings/add-menu']);
  }

onEdit(data)
{this.appservice.isEdit=true;
  this.appservice.Edit_Row=data;
  this.router.navigate(['/settings/add-menu']);
}
onDelete(data) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete press Yes?',
    accept: () => {
      this.Delete(data)
    }
  });
}



Delete(item) {
  
  this.appservice.get("Api/Master/delete_Menu_Master?ID=" + item).subscribe((res: any) => {
    this.appservice.get_Menu_Master();
  });
}
  ngOnInit(): void {
  }

}
