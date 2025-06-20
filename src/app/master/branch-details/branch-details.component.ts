import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SelectItem,ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent {

  constructor(public appservice:AppService,public confirmationService: ConfirmationService,private router: Router) { 
    this.get_Branch_Details();
  }

  Branch_Details_Row=[];
  get_Branch_Details(){
    this.appservice.isload=true;
    this.appservice.getc("Api/master/get_Branch_Details").subscribe((res:any )=>{
    this.Branch_Details_Row=JSON.parse(res).record; 
    this.appservice.isload=false; 
  });
  }
  public Branch_Details_GF=['Branch_Name','Branch_Address','City','State','Pincode','Email','Mobile_No','Manager','Phone_No'];
  addReset() {
    this.appservice.isadd = "0";
    this.appservice.isEdit=false;
    return this.router.navigate(['master/add-branch']);
  }
  onEdit(item) {
    this.appservice.isEdit =true;
    this.appservice.Edit_Row = item;
    return this.router.navigate(['master/add-branch']);
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
  this.appservice.get("Api/master/Delete_Branch_Details?ID=" + item).subscribe((res: any) => {  
    this.get_Branch_Details();
  });
}

export_excel() {
  window.open(this.appservice.Server_URL + "report/Branch_Details_Excel?Company=" + this.appservice.Company, "_blank");

}
  ngOnInit(): void {
  }

}

