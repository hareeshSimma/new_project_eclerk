import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  form:FormGroup;
  constructor(fb: FormBuilder) { 
    this.form= fb.group({
      'oldpassword': ['',Validators.required],
      'newpassword': ['',Validators.required],
      'confirepassword': ['',Validators.required]
    
      
    });
  }
  

  ngOnInit() {
    
  }
  
}
