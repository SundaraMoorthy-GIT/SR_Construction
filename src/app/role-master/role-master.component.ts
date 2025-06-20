import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit {

  constructor(public confirmationService:ConfirmationService, public appservice: AppService, private http: HttpClient,  private router: Router, private route: ActivatedRoute) 
   {
   this.display();
  }

  toastr: any;
  ngOnInit() { 
  }


Rows = [];
cols: any[];
Type_rows=[];

selectedCar: string;

addReset()
{

  this.appservice.Ref_ID="User_Role";
  this.appservice.isadd="0";
 return this.router.navigate(['/add-role']);
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
    
    var index = this.appservice.Reference_Rows.findIndex(function(items, i){
      return items.ID === item
    });

    //console.log(index);
    if (index > -1) {
        this.appservice.Reference_Rows.splice(index, 1);
    }        
    //console.log(this.rows);
    this.appservice.Reference_Rows = this.appservice.Reference_Rows;

    
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
 this.Rows =this.appservice.Reference_Rows;
 this.Rows=this.Rows.filter(e => e.Ref_ID.toLowerCase()=='user_role');

 this.cols = [
   { field: 'RGV_vCode', header: 'Code', width: '25%' },
   { field: 'RGV_vDesciption', header: 'Descrption', width: '' }
 ];
}

}
