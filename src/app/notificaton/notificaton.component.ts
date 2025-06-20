import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-notificaton',
  templateUrl: './notificaton.component.html',
  styleUrls: ['./notificaton.component.scss']
})
export class NotificatonComponent implements OnInit {

  constructor(public appservice:AppService) { }

 Display_Member="";
 Value_Member="";
  Item_ID="55";

 get(data)
 {
   console.log(data);
this.Value_Member=data;
 }
  ngOnInit(): void {
  }

}
