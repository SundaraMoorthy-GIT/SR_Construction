import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.scss']
})
export class ThemeSettingComponent implements OnInit {

  constructor(public appservice:AppService) { }


  load_theme(data)
  {

    localStorage.setItem('Theme',data);
    this.appservice.load_themes(data);
  }

  ngOnInit(): void {
  }

}
