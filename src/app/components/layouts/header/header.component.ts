import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  data :any={
    'UM_Full_Name':''
  }
  isload:boolean=false;
  Prow=[];
    constructor(public router:Router,public appservice:AppService,public http: HttpClient,private toastr: ToastrService) {
     
      this.data=JSON.parse(localStorage.getItem('User_Data'));
      this.get_Token();
      this.get_Reference();
      this.appservice.get_product_Master1();
      this.appservice.get_Estimate_Details();
      this.appservice.get_Bank_Master();
      this.appservice.get_Item_Master();
      this.appservice.GoDown = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "GoDown");
      this.appservice.dashboard_data();

     }
     get_Token() {

      this.appservice.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
       this.isload=true;
       this.http.post(this.appservice.Server_URL + 'token', 'grant_type=password&UserName=admin&Password=admin', { headers: this.appservice.headers })
         .subscribe(
           (val) => {
             this.appservice.tocken=val['access_token'];
             this.get_Field_Setting();
           },
           response => {
             this.toastr.error('Error ', response, {
               timeOut: 3000
             });
             return "Error Contact Admin";
           });
     
           //return "Problem"
   }

   get_Field_Setting() {
    this.appservice.getc("Api/Setting/get_Field_Setting").subscribe((res: any) => {

      if(res=="No_Licence")
      {
        this.router.navigate(['/invalid-licence']);
      }
      else
      {
          this.appservice.Field_Setting = JSON.parse(res).record;
          //this.get_Setting_Setting();    
      }
    });


  }


     get_Reference() {
      this.appservice.get_Bank_Master();
  
      this.appservice.getc("Api/Master/get_reference").subscribe((res: any) => {
       this.appservice.Reference_Rows = JSON.parse(res).record;
       this.appservice.get_Role_Rights(this.data.UM_Rights);
       this.appservice.CREATED_BY=this.data.UM_Full_Name;
       //this.appservice.Rights_ID=this.data.UM_Rights;
  
       this.appservice.Emp_ID=this.data.Emp_ID;
       try{
       this.Prow = this.appservice.Reference_Rows.filter(e => e.Ref_ID=="User_Role");
       this.appservice.Rights_Name=this.Prow.filter(e => e.RGV_iID.toLowerCase()==this.data.UM_Rights)[0].RGV_vDesciption;
       this.appservice.U_Rights=this.appservice.Rights_Name.toLowerCase();
  
       this.appservice.Header_Disp = this.data.CM_Name;
  
      if(!(this.appservice.Rights_Name.toLowerCase()=="admin"))
      {
        this.appservice.Search_User=this.data.UM_User_Name;
      }
  
      
       }catch{}
       
  
      
       
  // try
  // {
  
  //    this.page=this.Prow.filter(e => e.RGV_iID.toLowerCase()==this.data.UM_Rights)[0].RGV_vCode;
  
  //      this.router.navigate([this.page]);
  // }catch{
  //   this.router.navigate([this.page]);
  // }
      });
    }
    
    

     addReset() {
      this.appservice.isadd = "0";
      return this.router.navigate(['/change-password']);
    }

     lenth:number=0;

     logout()
     {
      localStorage.clear();
   
      this.appservice.Company="";
      this.router.navigate(['/'], { replaceUrl: true });
     }

     reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }
    ngOnInit() {
      //this.reloadCurrentRoute();
    }


   
}
