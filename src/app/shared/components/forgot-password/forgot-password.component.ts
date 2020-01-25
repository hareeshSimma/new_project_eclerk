import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OldPwdValidators } from '../changepassword/old-pwd.validators';
import {Router} from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {AuthService} from 'src/app/shared/auth.service';
import { auth } from 'firebase/app';
@Component({

  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup; 
  submitted = false;
  passReset: boolean = false;
  constructor(private authService:AuthService,fb: FormBuilder,private router:Router,private http:HttpClient) {
    this.forgotpasswordForm = fb.group({
     'email': ['',Validators.required]
    })
   }

  ngOnInit() {
  }
  get f(){
    return this.forgotpasswordForm.controls;
  }
  
  // onSubmit() {
  //   this.submitted=true;
  //   if (this.forgotpasswordForm.invalid) {
  //     return;
  // }
  // }
  resetpassword(email: string){
    this.submitted=true;
    if (this.forgotpasswordForm.invalid) {
      return;
  }
      this.authService.resetpassword(this.forgotpasswordForm.value['email'])
      .then(() => this.passReset = true)
     this.router.navigate(['login']);
    }
  }

//   passReset: boolean = false;
// resetPassword() {
//   this.auth.resetPassword(this.userForm.value['email'])
//   .then(() => this.passReset = true)
// }



