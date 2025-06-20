import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-bom',
  templateUrl: './add-bom.component.html',
  styleUrls: ['./add-bom.component.scss']
})
export class AddBomComponent implements OnInit {

  ngOnInit() { }
  public rows = [];
  public add: any = {};
  headers;
  data;
  Prod_ID="0";
  isadd="0";
  Type_rows=[];
  
  selectedCar: string;
  constructor(private _location: Location,public appservice: AppService, private toastr: ToastrService,private http: HttpClient,  private router: Router, private route: ActivatedRoute) {
  
    
    this.isadd=appservice.isadd;
    this.get_Type();
    if(this.isadd=="0")
    {

    this.add.Bom_ProdId=appservice.Product_ID;
    this.add.Bom_ID="0";
    }
    else
    { 
      
      console.log(this.appservice.Edit_Row);
      this.add=appservice.Edit_Row;

      this.add.Bom_ID=appservice.Edit_Row.Bom_ID;
      this.add.Bom_ProdId=appservice.Edit_Row.Bom_ProdId;
      this.add.Bom_RMId=appservice.Edit_Row.Bom_RMId;
      this.add.Bom_Qty=appservice.Edit_Row.Bom_Qty;
     
    }
  }

  get_Type(){
    this.Type_rows=[];
    this.appservice.get("Api/master/get_product?Status=A&vType=Raw-Material").subscribe((res:any )=>{
    this.Type_rows=JSON.parse(res).record;
    //this.selectedCar=this.appservice.Default_Prod_ID;
 });
}



onChange(data)
{
  
  this.Prod_ID=data; 
  this.selectedCar=data;
}
  public btndisable:boolean=false;

  addData(f) {

    //this.add.CreatedBy = this.appservice.CREATED_BY;
    f.form.value.CreatedBy = this.appservice.CREATED_BY;
    f.form.value.Company = this.appservice.Company;
    console.log(f.form.value);
    this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    this.btndisable=true;

    this.http.post(this.appservice.Server_URL + 'api/master/insert_bom_master', f.form.value, { headers: this.headers })
    .subscribe(
      (val:string) => {
        this.btndisable=false;

        if(val=="True")
        {
          
          this.toastr.success("Details Salved Success",'Msg');
         
          this.Clear();
       this.add.Bom_ProdId=this.appservice.Product_ID;
          // f.form.value.Bom_ProdId=this.appservice.Product_ID;
          this.selectedCar="0";

        }
      else
      {
        this.toastr.error( val,"Error", { timeOut: 3000 });
      }
      },
      response => {
        
      this.toastr.error('Error ', response, {
        timeOut: 3000
      });

      });


    }



    Back()
    {
      this._location.back();
    }
    
  Clear() {
    this.add =
      {
        'Bom_ID': '0',
        'Bom_ProdId': '',
        'Bom_RMId': '',
        'Bom_Qty': '0'

      };
  }

}
