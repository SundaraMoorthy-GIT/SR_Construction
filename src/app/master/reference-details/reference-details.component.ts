import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem, ConfirmationService,} from 'primeng/api';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.scss']
})


export class ReferenceDetailsComponent implements OnInit {
  toastr: any;
  ngOnInit() { 
  }


Rows = [];
cols: any[];
Type_rows=[];

public representatives=[];
selectedCar: string;
constructor(public confirmationService:ConfirmationService, public appservice: AppService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
 
this.get_Type();
this.display();
}


addReset()
{

  this.appservice.Ref_ID=this.selectedCar;
  this.appservice.isadd="0";
  var path="/add-reference";
  if(this.appservice.Ref_ID=="Bunk Item")
  {
    path="/add-price";
  }

 return this.router.navigate([path]);
}


onEdit(item) { 
  this.appservice.isadd="1";
  this.appservice.Edit_Row=item; 
  return this.router.navigate(['/add-reference']);
  
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

  
  this.appservice.get("Api/master/delete_Reference_Values?ID="+item).subscribe(( res:any )=>{
 

  this.appservice.get_Reference();
  this.display();
    });
  
  }  
  
  
get_Type(){
  
    this.appservice.getc("Api/master/get_reference_Group").subscribe((res:any )=>{
    this.Type_rows=JSON.parse(res).record;
    this.selectedCar=this.appservice.Default_ref_ID;
    this.display();
 });
}



onChange(data)
{
  
  this.appservice.Default_ref_ID=data; 
  this.selectedCar=data;
 this.display();
}

display() {
 this.Rows = this.appservice.get_ref(this.selectedCar);
 this.representatives=[];
 var Ledger_Name=[...new Set(this.Rows.map(item => item.RGV_vDesciption))];
 for (let data2 of Ledger_Name) {
  this.representatives.push({'value':data2});
 }
 this.cols = [
   { field: 'RGV_vCode', header: 'Code', width: '25%' },
   { field: 'RGV_vDesciption', header: 'Descrption', width: '' }
 ];
 console.log(this.representatives);
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
  this.Excel_Data.User="Mari";
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
