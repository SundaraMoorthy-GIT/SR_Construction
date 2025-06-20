import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isload:boolean=false;
  data :any={}
  constructor(public http: HttpClient,public appservice: AppService,private toastr: ToastrService, public router: Router) {

    if (this.getData()) {

      this.isload=true;
      this.data=JSON.parse(localStorage.getItem('User_Data'));
      appservice.Current_User=this.data;
      appservice.Company="_"+this.data.UM_Company;
      this.appservice.GST_Code=this.data.CM_State_Code;
      this.appservice.GST_No=this.data.CM_Gstin;
      this.appservice.GST_State=this.data.CM_State;
      this.appservice.CM_Address1=this.data.CM_Address1;
      this.appservice.CM_Address2=this.data.CM_Address2;
      this.appservice.CM_Address3=this.data.CM_Address3;
      this.appservice.CM_Address5=this.data.CM_Address5;
      this.get_Token();
      this.get_Reference();
    }

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

  
  Prow=[];
  page="";



  get_Field_Setting() {
    this.appservice.getc("Api/Setting/get_Field_Setting").subscribe((res: any) => {

      if(res=="No_Licence")
      {
        this.router.navigate(['/invalid-licence']);
      }
      else
      {
          this.appservice.Field_Setting = JSON.parse(res).record;
          this.get_Setting_Setting();    
      }
    });


  }


  get_variable_Value(data)
  {
    
    
    if (data == "Bill_Format") {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Bill_Format = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }
    }
    
    else if (data == "STamilName") {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
         
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.STamilName=true;
          }
        }

      } catch { }
    }
    else if (data == "Type_Based_Bill_No") {
      
      
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
         
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Type_Based_Bill_No=true;
          }
        }

      } catch { }
      
    }
    
    else if (data == "Bill_Format1") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Bill_Format1 = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    else if (data == "Quotation_Format") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Quotation_Format = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    
    else if (data == "NT_Bill_Format") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.NT_Bill_Format = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    

    else if (data == "Area_Map") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
         if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Area_Map=true;
          }
        }

      } catch { }

    }
    
    else if (data == "Group_Enable") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
         if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Group_Enable=true;
          }
        }

      } catch { }

    }
    
    else if (data == "DB_Vadi_display") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.DB_Vadi_display=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Ledger_Update") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Ledger_Update=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Print_Button") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Print_Button=true;
          }
          
        }

      } catch { }

    }

    else if (data == "Print_Bill") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Print_Bill=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Save_Print_Mobile") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Save_Print_Mobile=true;
          }
          
        }

      } catch { }

    }
    
    else if (data == "Sales_Disp_Text2_Visblle") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Sales_Disp_Text2_Visblle=true;
          }
          
        }

      } catch { }

    }
    else if (data == "img_visible") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.img_visible=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Sales_Disp_Text3_Visblle") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Sales_Disp_Text3_Visblle=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Stockbase_Sales") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Stockbase_Sales=true;
          }
          
        }

      } catch { }

    }
    else if (data == "Check_Stock") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          if((this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value)=="true")
          {
            this.appservice.Check_Stock=true;
          }
          
        }

      } catch { }

    }
    
    else if (data == "Logo_Name") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Logo_Name = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    else if (data == "Vadi_Format") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Vadi_Format = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    else if (data == "Logo_Sub_Name") 
    {
      try {
        if (this.appservice.SM_Row.filter(e => e.S_Variable == data).length > 0) {
          this.appservice.Logo_Sub_Name = this.appservice.SM_Row.filter(e => e.S_Variable == data)[0].S_Value;
        }

      } catch { }

    }
    
   

  }
  
  get_Setting_Setting() {
    this.appservice.getc("Api/Common/Get_Setting_Master").subscribe((res: any) => {
      this.appservice.SM_Row = JSON.parse(res).record;

      try{
    for(var i=0;i<this.appservice.SM_Row.length;i++)
    {
      this.get_variable_Value(this.appservice.SM_Row[i]["S_Variable"]);
    }

if(this.appservice.Intrest_Format=="Flat"){
   this.appservice.Loan_Issue_Page="/collection/loan-issue";
    this.appservice.Add_Receipt_Page="/transaction/add-receipt-entry-two";
}else{
  this.appservice.Loan_Issue_Page="/collection/emi-loan-issue";
  this.appservice.Add_Receipt_Page="/transaction/add-receipt-details";
}
  }catch{}

  this.get_Reference(); 

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

    if(this.appservice.Area_Map)
    {
     
     this.get_Area(this.appservice.Rights_Name,this.data.UM_ID);
    }
     else
     {
    this.appservice.S_Area="All";
     }
     }catch{}
     

    
     
try
{

   this.page=this.Prow.filter(e => e.RGV_iID.toLowerCase()==this.data.UM_Rights)[0].RGV_vCode;

     this.router.navigate([this.page]);
}catch{
  this.router.navigate([this.page]);
}
    });
  }
  public Group_Member_Code = [];
  get_Group_Member_Code() {
    this.isload = true;
    this.Group_Member_Code = [];
    this.appservice.get("Api/Collection_/get_Group_Member_Code?").subscribe((res: any) => {
    this.Group_Member_Code = JSON.parse(res).record;
    this.isload = false;

    });

  }
  get_Area(Rights,user) {

    // this.appservice.get("Api/Setting/Get_User_Area?Rights="+Rights+"&User="+user).subscribe((res: any) => {
    // this.appservice.Area_Row = JSON.parse(res).record;
    // this.appservice.S_Area="All";
    // });


    if(this.appservice.Rights_Name.toLowerCase()=="admin")
     {
      this.appservice.Search_User="All";

     
     }
     else
     {
      this.appservice.Search_User="All";
      //this.appservice.Search_User=this.data.UM_User_Name;
     }
  }

  getData() {
    return JSON.parse(localStorage.getItem('User_Data'));
  }
  public btndisable:boolean=false;
  public addD: any = {};
  rows = [];

  login(f) {

    this.btndisable=true;
    this.appservice.get("Api/Common/get_Lodge_Login?Username=" + f.form.value.Username + "&Password=" + f.form.value.Password).subscribe((res: any) => {

      
      this.btndisable=false;

      if (res!="") {

        this.rows = JSON.parse(res).record;
        this.appservice.Company="_"+this.rows[0]["UM_Company"];
        localStorage.setItem('User_Data', JSON.stringify(this.rows[0]));
        localStorage.setItem('Area','All');
        this.appservice.Customer_Area="All"
        this.appservice.GST_Code=this.rows[0]["CM_State_Code"];
        window.location.href ="\\";
        
        
      }
      else
      {
        this.toastr.error("Invalid User Name and Password", "Error", { timeOut: 3000 });
        
      }

    });
  }

  ngOnInit() {
  }

}
