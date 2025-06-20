  import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
  import { AppService } from 'src/app/app.service';
  @Component({
    selector: 'app-vingrid',
    templateUrl: './vingrid.component.html',
    styleUrls: ['./vingrid.component.scss']
  })
  export class VingridComponent implements OnInit {
  
  
    constructor(public appservice: AppService) { 
  
   
    }
  
    @Input() inputModel: string;
    @Input() maxLength: number;
    @Input() isNumeric: boolean;
    @Input() label_: string;
    @Input() values_: string;
    @Input() Placeholder: string;
    
    @Input() Row = [];
  
    @Output() inputModelChange = new EventEmitter<string>();
    @Output() valueModelChange = new EventEmitter<string>();
  
  
  
    totalCharLengthText: string
  
    textCount: number;
   
    Row1 = [];
    ngOnInit() {
  
      
      this.load_data();
  
     }
  
    public load_data()
    {
      
  
      if (this.Row1) {
        if (this.Row1.length > 0) {
  
          try{
          this.Row1.filter(e => e.value == this.inputModel)[0].label;
          this.values_ = this.Row1.filter(e => e.value == this.inputModel)[0].value;
          }catch{}
        }
      }

     
      this.filter(this.label_);
      this.display_grid = false;
    }
  
    display_grid: boolean = false;
  
  
    get_view() {
  
   
    /*
      try
      {
        if(this.Row1.length<=0)
        {
          this.load_data();
        }
        else
        {
          this.filter(this.inputModel);
        }
      }
      catch{
        this.load_data();
      }*/
      this.display_grid = true;
    }
  
    row_No = -1;
  
    up() {
      if (this.row_No >= 0) {
        this.row_No = this.row_No - 1;
      }
    }
  
    down() {
      this.row_No = this.row_No + 1;
    }
  
    Table = [];
    selected_row(row_No) {
    
      if(this.appservice.lable_!="+")
      {
     try{
            this.values_ = this.Row1[row_No].value;
            this.label_ = this.Row1[row_No].label;
            this.inputModel = this.Row1[row_No].label;
            this.textChange();
            this.filter(this.inputModel);
            this.display_grid = false;
            this.row_No = 0;
      }catch{}
    }
    }
  
  
    filter(filterdata) {

      
      if (filterdata == "") {
       
        if(this.appservice.Filter_Type=="contain")
        {
          this.Row1 = this.Row.filter(e=>e.Item_Group==this.appservice.Item_Group_);
          this.row_No = 0;
          
        }
        else{
          this.display_grid=false;
          this.row_No = 0;
        }
      }
      else {
        //this.Row1 = this.Row.filter(e => String(e.label).toLowerCase().includes(filterdata.toLowerCase()));
  
        this.display_grid = true;
        if(this.appservice.Filter_Type=="contain")
        {
        
          
        this.Row1 = this.Row.filter(e=>e.Item_Group==this.appservice.Item_Group_).filter(
          it=>{   
            const label = it.label.toString().toLowerCase().includes(String(filterdata).toLowerCase()) 
            const value = it.Item_Code.toString().toLowerCase().includes(String(filterdata).toLowerCase())
           
            return (label + value  );      
        });
      } 
      
      else
      {
          
        this.Row1 = this.Row.filter(e=>e.Item_Group==this.appservice.Item_Group_).filter(
          it=>{   
            const label = it.label.toString().toLowerCase().startsWith(String(filterdata).toLowerCase()) 
           
            return (label);      
        });
      }
  
      }
  

      
  
  
    }
  
    get_view1() {
      
      this.filter("");
      
      this.display_grid = false;
    }
  
    
  
    textChange() {
this.appservice.item=this.label_;
     

      if(this.label_!="")
    {
      this.appservice.lable_="";
    }

      if(this.label_=="/" )
      {
       this.appservice.key_value="/";
       this.label_="";
       this.values_="";
      }
      else
      {
        this.appservice.key_value="";
      }
  
      if(this.label_=="" )
      {
      this.display_grid=false;
      this.label_="";
        this.values_="";
        this.inputModel="";
        this.values_="";
      }

      if(this.appservice.lable_=="+" )
      {
        this.label_="";
        this.values_="";
        this.inputModel="";
        this.values_="";
     
      
      }
      else
      {
      this.inputModelChange.emit(this.inputModel);
      this.valueModelChange.emit(this.values_);
      this.appservice.lable_="";
      }
    }
  
  
  }  