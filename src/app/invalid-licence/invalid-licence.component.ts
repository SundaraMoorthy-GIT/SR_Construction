import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-invalid-licence',
  templateUrl: './invalid-licence.component.html',
  styleUrls: ['./invalid-licence.component.scss']
})
export class InvalidLicenceComponent implements OnInit {

  constructor(public appservice: AppService) { }
  isload:boolean=false;
  data :any={}
  btndisable:boolean=false;
  add:any={}
  ngOnInit(): void {
  }

}
