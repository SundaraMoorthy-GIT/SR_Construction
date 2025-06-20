import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
  import { HttpClient } from '@angular/common/http';
  import { utc } from 'moment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-gst2b',
  templateUrl: './upload-gst2b.component.html',
  styleUrls: ['./upload-gst2b.component.scss']
})
export class UploadGst2bComponent implements OnInit {

  public server="";
  constructor(private location: Location, public appservice: AppService,private toastr: ToastrService, public http: HttpClient) 
   {  this.server=this.appservice.Server_URL+"Api/Transaction/Upload2b_Master?ID=0&Company="+this.appservice.Company+"&Name=Item_master&Description=Data";
      
  }


 uploadedFiles: any[] = [];
 onUpload(event) {
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
  this.toastr.success("Details Uploaded Success", 'Msg');
}
   public add:any ={};
   public btndisable:boolean=false;
 
  

   public GST2B_Details_Export = [
    { Field: 'GSTIN', Name: 'GSTIN', Align: '' },
    { Field: 'Name', Name: 'Name', Align: '' },
    { Field: 'Invoice Number', Name: 'Invoice Number', Align: '' },
    { Field: 'Invoice Date', Name: 'Invoice Date', Align: '' },
    { Field: 'Invoice Value', Name: 'Invoice Value', Align: '' },
    { Field: 'GST', Name: 'GST', Align: '' },
    { Field: 'Taxable Value', Name: 'Taxable Value', Align: '' },
    { Field: 'IGST', Name: 'IGST', Align: '' },
    { Field: 'CGST', Name: 'CGST', Align: '' },
    { Field: 'SGST', Name: 'SGST', Align: '' },
    { Field: 'Remarks', Name: 'Remarks ', Align: '' },
  ];
  public GST2B_Details_Rows=[
    {'GSTIN':'33ACXPV7119C1Z8','Name':'VEDIAPPAN CONTRACTOR','Invoice Number':'INV001','Invoice Date':'01/01/2024','Invoice Value':100,'GST':18,'Taxable Value':82,'IGST':0,'CGST':9,'SGST':9,'Remarks':''}
  ];

   
   export_excel()
   {
     //this.appservice.Employee_Details_Export =  this.appservice.get_fields_of('Employee_Details');

    //  this.appservice.Excel_Data.Header=this.GST2B_Details_Export;
    //  this.appservice.Excel_Data.items=this.GST2B_Details_Rows;
    // this.appservice.upload_excel();
    window.open(this.appservice.Server_URL + "Images/GST2B_Temp.xlsx", "_blank");
   }
  
   ngOnInit(): void {
   }

}
