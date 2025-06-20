import { Component, OnInit, OnDestroy, Inject, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, RouterOutlet } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AppService } from './app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { slideInAnimation } from './app.animations';
declare let $: any;

@Component({
    selector: 'app-root',
  
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation
        // animation triggers go here
      ],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit, OnDestroy {
    location: any;
    routerSubscription: any;

    data:any={};

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
      }
      
    constructor(el: ElementRef,public confirmationService :ConfirmationService,@Inject(DOCUMENT) public document: Document,private router: Router,public appservice:AppService) {
        
     this.appservice.Server_URL = el.nativeElement.getAttribute('API_Location');
    
     var NT_P=el.nativeElement.getAttribute('NT_Printer');
     var NT_A=el.nativeElement.getAttribute('NT_Address');

     this.appservice.NT_Printer=NT_P;
     this.appservice.NT_Address=NT_A;
     
    }


    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        // if (event.keyCode ==115) 
        // {
        //     this.router.navigate([this.appservice.Sales_Entry_Page]);

        // }

        // if (event.keyCode ==116) 
        // {
        //     this.router.navigate([this.appservice.Purchase_entry_page]);
        // }
  
      if (event.keyCode ==27) {
  
       /* this.confirmationService.confirm({
          message: 'Are you sure that you want to go back ?',
          accept: () => {
            
        this.appservice.back();
          }
      });*/
      }
    }
  
   
    

    cssUrl;
 

    ngOnInit(){
        //this.recallJsFuntions();

        window.addEventListener("keyup", disableF5);
        window.addEventListener("keydown", disableF5);
      
       function disableF5(e) {
          if ((e.which || e.keyCode) == 116) e.preventDefault(); 
          if ((e.which || e.keyCode) == 117) e.preventDefault(); 
       };
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                $.getScript('../assets/js/custom.js');
                this.location = this.router.url;


               
      
                if(this.appservice.Company=="")
                 this.router.navigate(['/'], { replaceUrl: true });


                this.appservice.URL_Location=this.location;
                if (this.location.toString().substr(0, 5) == "/?id=") {
                    localStorage.setItem('FID', this.location.toString().replace("/?id=", ""));
                }
                
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0)
            });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();

        
    }
}
