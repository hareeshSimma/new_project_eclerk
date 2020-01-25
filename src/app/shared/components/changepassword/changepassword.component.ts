import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OldPwdValidators } from '../changepassword/old-pwd.validators';
import {Router} from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import { NavbarService } from '../../navbar.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router:Router,private http:HttpClient,private nav:NavbarService) {
    this.changepasswordForm = this.formBuilder.group({
      'oldPwd': ['',Validators.required],
      'newPwd': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', Validators.required]
      
    
   
    });
   }

  ngOnInit() {
    this.nav.hide();
  }
  get f(){
    return this.changepasswordForm.controls;
  }
  get oldPwd(){
    return this.changepasswordForm.get('oldPwd');
  }

   get newPwd(){
    return this.changepasswordForm.get('newPwd');
  }

   get confirmPwd(){
    return this.changepasswordForm.get('confirmPwd');
  }
  changepassword(){
    this.submitted = true;
  
      // this.authService.changePassword(this.changepasswordForm.value)
      // .subscribe(res => console.log(res));
      if (this.changepasswordForm.invalid) {
        return;
  }
    
   this.router.navigate(['/login']);
     
  }

}
