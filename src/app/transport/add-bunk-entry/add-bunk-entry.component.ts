import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { IMyDpOptions, IMyDateModel, IMyDate, IMyOptions } from 'mydatepicker';
import { Location, DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-bunk-entry',
  templateUrl: './add-bunk-entry.component.html',
  styleUrls: ['./add-bunk-entry.component.scss']
})
export class AddBunkEntryComponent implements OnInit {
   
  
  ngOnInit() { }
  public rows = [];
  public add: any = {};
  public addValidation: boolean = false;
  headers;
  data;
  isadd = "0";
public btndisable1: boolean = false;
  public btndisable:boolean=false;
  public Ledger = [];
  Category_rows=[];
  public Bill_No_=[];

  constructor(public datePipe :DatePipe,private _location: Location,public confirmationService:ConfirmationService, public appservice: AppService, private toastr: ToastrService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
 if (this.appservice.Branch_ID != 0) {
      this.add.be_branch = this.appservice.Branch_ID;
      this.btndisable1 = true;
    }
    else {
      this.btndisable1 = false;
    }
    // this.add._pay_mode=appservice.DF_Paymode;
    this.isadd = appservice.isadd;
    this.Category_rows=appservice.get_ref('bunk_Category');
    this.add.be_date = appservice.T_Date;
    // this.add.oc_cheque_date = appservice.T_Date;
    this.add.be_type = "bunk";
    this.Ledger=this.appservice.Ledger_Master_Rows;
    this.get_Bunk_No();

    if (this.isadd == "0") {
      this.Clear();
      this.get_Bunk_No() ;
      this.add.ID = "0";  
      this.add.be_branch = this.appservice.Branch_ID;
    }
    else {
      console.log()
      this.add = appservice.Edit_Row;
     // this.add.Adj_Date = 1;
     try{
      this.add.be_date = appservice.datefromat(appservice.Edit_Row.be_date);
      this.onChange(appservice.Edit_Row.be_category_id);
      this.add.be_ledger_id = appservice.Edit_Row.be_ledger_id;
      // this.add.oc_cheque_date=appservice.datefromat(appservice.Edit_Row.oc_cheque_date);
      }catch{}
   
      this.add.be_projectid=""+appservice.Edit_Row.be_projectid;
      this.add.be_category_id=""+appservice.Edit_Row.be_category_id;
      this.add.be_ledger_id=""+appservice.Edit_Row.be_ledger_id;
     
    }
    if (this.appservice.from_customer_page == true) {
      this.add.be_projectno = this.appservice.Selected_Customer.est_unino;
      // this.add.be_projectdate = this.appservice.Selected_Customer.est_tenderdate;
      this.add.be_projectname = this.appservice.Selected_Customer.est_projectname;
      this.add.be_projectid = this.appservice.Selected_Customer.est_id; 
    }
    this.add_Category();
   
  }

  get_customers() {
    this.appservice.vType='S';
    return this.router.navigate(['/project-search']);

  }
  calc_tempdata()
{
 this.add.be_amount=Number(this.add.be_qty)*Number(this.add.be_rate);
}
  // onChange2(data) 
  // {
  //   this.appservice.DF_Paymode=data;
  //   this.appservice.Default_Payment_ID=this.appservice.get_ref('Pay_Mode').filter(e => e.value == data)[0].label; 
  // }
  public refRow:any ={};
  // onChange(data)
  // {
  //   this.refRow=this.appservice.get_ref('bunk_Category').filter(e => e.value == data)[0];
  //   this.add.be_category=this.refRow.label;
  //   // if(this.add.be_category=="Project")
  //   // {
  //   //   this.Ledger=this.appservice.SProject_Rows;
  //   // }
  //   // else if(this.add.oc_category=="Out Sources Incomes")
  //   // {
  //   //   this.Ledger=this.appservice.Ledger_Master_Rows;
  //   // }
  //   // else
  //   // {
  //   //   this.Ledger=this.appservice.Ledger_Master_Rows;
  //  // }
  // }
  onChange_Item(data)
  {
    this.add.be_rate=this.appservice.get_ref('Bunk Item').filter(e => e.label == data)[0].RGV_vCode;
  }


  onChange(data)
  {
    
    this.refRow=this.appservice.get_ref('bunk_Category').filter(e => e.value == data)[0];
    this.add.be_category=this.refRow.label;
  
    // if(this.add.be_category=="Expenses")
    // {
    //   this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");
    // }
     if(this.add.be_category=="Advance")
    {
      this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");

    }
    else if(this.add.be_category=="Site Expense")
      {
        this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");
  
        
      }
      else if(this.add.be_category=="Supervisor Petrol")
        {
          this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");
    
          
        }
        else if(this.add.be_category=="Suspence")
          {
            this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Exp_Category");
      
            
          }
        else if(this.add.be_category=="MV Vechile")
          {
            this.Ledger=this.appservice.Transport_Rows;
            
          }
          else if(this.add.be_category=="Rental")
            {
              this.Ledger=this.appservice.Transport_Rows;
              
            }

      else if(this.add.be_category=="School")
        {
          this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "School");
    
        }
        else if(this.add.be_category=="Bunk Expense")
          {
            this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Bunk Expense");
          }
          else if(this.add.be_category=="Vehicle Expense")
            {
              this.Ledger=this.appservice.Transport_Rows;
            }


          else
    {
      this.Ledger=this.appservice.Reference_Rows.filter(e => e.Ref_ID == "bunk_Category");

    }
    

  }
  public refRow1:any ={};
  onChange1(data)
  {
    this.refRow=this.appservice.SProject_Rows.filter(e => e.value == data)[0];
    this.add.be_projectname=this.refRow.label;
  }
  onChange2(data)
  {
    this.refRow=this.Ledger.filter(e => e.value == data)[0];
    this.add.be_ledger_name=this.refRow.label;
  }


  get_Bunk_No() {
    this.appservice.getc("Api/Transaction/get_Bunk_No").subscribe(( res: any) => {
      this.add.be_voucherno=res;
    });
  }
  add_Category()
  {
    let val=null;
    try{
      val=new Date(this.add.be_date);
    }
    catch{}
    if(val!=null)
    {
    this.appservice.get("Api/Transaction/get_Bunk_Detail?From=" + this.add.be_date + "&To=" + this.add.be_date ).subscribe((res: any) => {
      this.Bill_No_ = JSON.parse(res).record;
      console.log(this.Bill_No_);
    })
  }    
  }

  
  public Pay_Mode_=[]
  get_Pay_Mode() {
    var data="Pay_Mode";
    this.Pay_Mode_=this.appservice.Reference_Rows.filter(e => e.Ref_ID.toLowerCase().includes(data.toLocaleLowerCase()));

  }
  public Exp_Category_=[]
  public Ledger_Category = [];
  get_Ledger_Category() {
   this.Exp_Category_ = this.appservice.Reference_Rows.filter(e => e.Ref_ID == "Bunk_Entry");
  }

  addData(f) {
    this.add.Company = this.appservice.Company;
    this.add.be_type = "bunk";
    this.add.ID=this.add.be_id;
    this.add.ColumnPerfix = "be_";
    this.add.Table_Name = "Bunk_Entry";

    // if(parseFloat(this.add.be_Amount)<=0)
    // {

    //   this.toastr.error("Amount Should not be Zero", "Error", { timeOut: 3000 });
    //   return;
    // }


 
      
    //   try{
    //   if(this.add.oc_received_bank=="0"|| this.add.oc_received_bank==null ||  this.add.oc_received_bank== undefined || Number(this.add.oc_received_bank)==0)
    //   {
    //     this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //     return;
    //   }
    // }catch{
      
    //   this.toastr.error("Please Select Bank ", "Error", { timeOut: 5000 });
    //   return;
    // }+
   


    this.add.Created_by = this.appservice.CREATED_BY;
   
    //  if (f.invalid === false)
    //  {
    // //   this.addValidation = true;
    // // this.btndisable=false;
    //  }
    // else 
    {

      this.btndisable=true;
      this.addValidation = false;
      this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

      this.btndisable=true;
      this.http.post(this.appservice.Server_URL + 'api/Transaction/Post_Bunk_Entry', this.add, { headers: this.headers })
        .subscribe(
          (val: string) => {
            
      this.btndisable=false;
            if (val == "True") {
              this.appservice.Pay_Date=this.add.be_date;
              this.toastr.success("Details Salved Success", 'Msg');
              this.Clear();
              f.submitted=false;
              this.get_Bunk_No();
              this.isadd = "0";
                this.add.ID = "0";
                this.add.be_date=this.appservice.Pay_Date;
                this.add_Category();
                //this.appservice.get_Bunk_Detail();
            }
            else {
              this.toastr.error(val, "Error", { timeOut: 3000 });
            }
          },
          response => {
            this.toastr.error('Error ', response, {
              timeOut: 3000
            });
          });
    }
 
  }

  get_Image_details()
  {
     this.server=this.appservice.Server_URL+"Api/Master/Upload_Income_Document?Ref_Type=Contractor&Ref_ID=1&Name="+this.add.oc_no+"&Description=Machiner Income&Company="+this.appservice.Company;
  }


  get_image()
  { 
     var timeStamp = (new Date()).getTime();
     return this.appservice.Server_URL+"Image/C"+this.appservice.Company+"/Income/"+this.add.oc_no+".png?data="+timeStamp;
  }

  uploadedFiles: any[] = [];

  server;
 onUpload(event) {
     for(let file of event.files) {
         this.uploadedFiles.push(file);
     }

     this.toastr.success("File Uploaded  Success", 'Msg');
     
 }
 delete_data(item)
 {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete press Yes?',
    accept: () => {
      this.Delete(item)
     }
 });
 }




 Delete(item) { 
     this.appservice.get("Api/Transaction/delete_bunk?ID=" + item +"&UserName="+this.appservice.CREATED_BY).subscribe((res: any) => {
      this.add_Category();
     });
   }
 

 edit_data(item)
 {
   this.add = item; try{
    this.add.be_date = this.appservice.datefromat(item.be_date);
    this.onChange(item.be_category_id);
    this.add.be_ledger_id = item.be_ledger_id;
    // this.add.oc_cheque_date=appservice.datefromat(item.oc_cheque_date);
    }catch{}
 
    this.add.be_projectid=""+item.be_projectid;
    this.add.be_category_id=""+item.be_category_id;
    this.add.be_ledger_id=""+item.be_ledger_id;
 }


 
  Back() {
    this._location.back();
  }
  Clear() {
    this.add =
      {
        'be_id': '0',
        'be_voucherno': 'BA',
        'be_date': this.appservice.T_Date,
        'be_Category': '',
        'be_type': '',
        'be_product': '',
        'be_ledger_id': '',
        'be_ledger_name': '',
        'be_projectid': '',
        'be_Narration1': '',
        'be_Narration2': '',
        'be_projectno': '',
        'be_projectname': '',
        'be_qty': '',
        'be_rate': '',
        'be_Amount': '',
        'be_created_by': '',
        'be_created_date': '',
        'be_status': '',
      };
  }
}
