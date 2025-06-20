  import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
  import { AppService } from 'src/app/app.service';

  @Component({
    selector: 'app-vinledger1',
    templateUrl: './vinledger1.component.html',
    styleUrls: ['./vinledger1.component.scss']
  })
  export class Vinledger1Component implements OnInit {
  
  
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
          this.label_ = this.Row1.filter(e => e.value == this.inputModel)[0].label;
          this.values_ = this.Row1.filter(e => e.value == this.inputModel)[0].label;
          }catch{}
        }
      }
      this.filter(this.label_);
      this.display_grid = false;
    }
  
    display_grid: boolean = false;
  
  
    get_view() {
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
    
     try{
            this.values_ = this.Row1[row_No].label;
            this.label_ = this.Row1[row_No].label;
            this.inputModel = this.Row1[row_No].label;
            this.textChange();
            this.filter(this.inputModel);
            this.display_grid = false;
            this.row_No = -1;
      }catch{


        this.values_ = this.appservice.filter_data;
            this.label_ = this.appservice.filter_data;
            this.inputModel =this.appservice.filter_data;
            this.textChange();
      }
    }
  
  
    filter(filterdata) {
     
      this.appservice.filter_data=filterdata;
     
      if (filterdata == "") {
        this.Row1 = this.Row.filter(e=>e.Group_ID == this.appservice.Ledger_Type || e.Group_ID == "3");
        this.row_No = -1;
      }
      else {
        //this.Row1 = this.Row.filter(e => String(e.label).toLowerCase().includes(filterdata.toLowerCase()));
  
        
        this.Row1 = this.Row.filter(e=>e.Group_ID == this.appservice.Ledger_Type || e.Group_ID == "3").filter(
          it=>{   
            const label = it.label.toString().toLowerCase().includes(String(filterdata).toLowerCase()) 
            const value = it.Phone_Number.toString().toLowerCase().includes(String(filterdata).toLowerCase())
           
            return (label + value  );      
        }); 
  
      }
  
  
  
      this.display_grid = true;
    }
  
    get_view1() {
      
      this.filter("");
      
      this.display_grid = false;
    }
  
    
  
    textChange() {
    
      if(this.label_=="")
      {
        this.inputModelChange.emit("");
        this.valueModelChange.emit("");
      }
      else
      {
      this.inputModelChange.emit(this.inputModel);
      this.valueModelChange.emit(this.values_);
      }
    }
  
  
  }  