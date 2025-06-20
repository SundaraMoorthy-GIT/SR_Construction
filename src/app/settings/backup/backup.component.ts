import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  public repost:any ={};
  public add:any ={};

  public btndisable:boolean=false;


  constructor(private _location: Location, public appservice: AppService,private toastr: ToastrService, public http: HttpClient) 
   {
   }
 
   get_backup()
    {
      this.btndisable=true;

      this.appservice.getc("api/Setting/backup").subscribe(( res: any) => {
        this.btndisable=false;

     
      if (res) {
        this.toastr.success("Backup Data Success", 'Msg')
        this.appservice.isEdit=false;
      this.appservice.get_Field_Setting();
      }
      else {
        this.toastr.error(res, "Error", { timeOut: 3000 });
      }
    },
    response => {
      this.toastr.error('Error ', response, {
        timeOut: 3000
      });
    });

}

  ngOnInit(): void {
  }

}
