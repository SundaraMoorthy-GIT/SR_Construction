import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  add:any={};
  constructor(private toastr: ToastrService,public appservice:AppService) { }

  addData(f)
  {
    if(this.add.New_Password!=this.add.Confirm_Password)
    {
      return;
    }

    this.appservice.isload = true;
    this.appservice.get("Api/Common/Change_Password?User_ID=" + this.appservice.Current_User.UM_ID + "&Old_Password=" +this.add.Password+"&New_Password="+this.add.New_Password).subscribe((res: any) => {
      this.appservice.isload = false;
      if(res=="True")
      {
      this.toastr.success("Password Chnaged Successfully");
      this.appservice.back();
      }
      else
      {
        this.toastr.error(res, "Error", { timeOut: 3000 });
      }
    });
  }

  ngOnInit(): void {
  }

}
