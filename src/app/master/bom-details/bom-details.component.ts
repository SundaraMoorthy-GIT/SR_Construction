import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem, ConfirmationService,} from 'primeng/api';

@Component({
  selector: 'app-bom-details',
  templateUrl: './bom-details.component.html',
  styleUrls: ['./bom-details.component.scss']
})
export class BomDetailsComponent implements OnInit {

  toastr: any;
  ngOnInit() { 
  }


Rows = [];
cols: any[];
Type_rows=[];

selectedCar: string;
constructor(public confirmationService:ConfirmationService, public appservice: AppService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
 
this.get_Type();
}


addReset()
{

  this.appservice.Product_ID=this.selectedCar;
  this.appservice.isadd="0";
 return this.router.navigate(['/master/add-bom']);
}


onEdit(item) { 
  this.appservice.isadd="1";
  this.appservice.Edit_Row=item; 
  return this.router.navigate(['/master/add-bom']);
  
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

  this.appservice.get("Api/Master/delete_bom_master?ID=" + item + "&UserName=" + this.appservice.CREATED_BY + "&Status=D").subscribe((res: any) => {
    //this.appservice.get_Reference();
  this.display();
  });
  
  }  
  
  
get_Type(){
  this.Type_rows=[];
    this.appservice.get("Api/master/get_product?Status=A&vType=Product").subscribe((res:any )=>{
    this.Type_rows=JSON.parse(res).record;
    this.selectedCar=this.appservice.Default_Prod_ID;
    this.display();
 });
}



onChange(data)
{
  debugger
  this.appservice.Default_Prod_ID=data; 
  this.selectedCar=data;
 this.display();
}

display() {
  this.appservice.get("Api/Master/get_BOM_Master?Status=A&ID=" + this.selectedCar + "").subscribe((res: any) => {
 this.Rows = JSON.parse(res).record;
  });
 this.cols = [
   { field: 'RawMaterial', header: 'RawMaterial', width: '25%' },
   { field: 'Bom_Qty', header: 'Qty', width: '' },
   { field: 'Bom_Date', header: 'Created Date', width: '' },
   { field: 'Bom_CreatedBy', header: 'Created By', width: '' }
 ];
}

public Excel_Data: any = {  'ID': '',
"item":'',
"Header":'',
};
headers;

export_excel()
{
 
  this.Excel_Data.items=this.Rows;
  this.Excel_Data.Header=this.cols;
  this.Excel_Data.Company=this.appservice.Company;
  this.Excel_Data.User="vino";
  this.Excel_Data.Report_Name="";
  
  this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
 
  this.http.post(this.appservice.Server_URL + 'api/master/JsontToExcel', this.Excel_Data, { headers: this.headers })
  .subscribe(
    (val:string) => {
     
      if(val=="True")
      {
        var parm="User=vino&Company="+this.appservice.Company;
        window.open(this.appservice.Server_URL+"Report/JsontToExcel?"+parm, "_blank");
        this.toastr.success("Data Exported  Successfully",'Msg');
       
      }
    else
    {
      
      console.log(val);
      this.toastr.error( val,"Error", { timeOut: 3000 });
    }
    },
    response => {
      console.log(response);
    this.toastr.error('Error ', response, {
      timeOut: 3000
    });

    });

}
}
