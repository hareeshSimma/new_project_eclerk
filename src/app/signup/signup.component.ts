import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

// import { User } from '../shared/user';
import { Router } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService, AlertService } from '../shared';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Directive, ElementRef} from '@angular/core';
import { User } from '../shared';
/*server call API Consuming*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData: Observable<firebase.User>;
  signupForm: FormGroup;
    submitted = false;
    response: firebase.User;
  //signupForm: FormGroup;
  email:string;
  password:string;
  name:string;
 
  invalidsignup = false;
  loading = false;
  //submitted = false;
  token: Observable<string>

  show_eye: Boolean = true;
 
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private afAuth:AngularFireAuth,
    
    public authService: AuthService,
    private alertService: AlertService,
   
    private http: HttpClient,private angularFireAuth: AngularFireAuth,private el: ElementRef) {
      
    }
  

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname:['', Validators.required],
    

    })
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    //   })
    // };
    
    // //this.http.get('https://dev.api.eclerk.in/api/user/load', httpOptions)
    // this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', httpOptions)
    //   .subscribe(
    //     (val) => {
    //       this.response = val['data'];
    //       this.email = this.response.email;
    //       console.log('POST call successful value returned in body', val);
    //     },
    //     response => {
    //       console.log('POST call in error', response);
    //     },
    //     () => {
    //       console.log('The POST observable is now completed.');
    //     });
  
  }
  get f() { return this.signupForm.controls; }
  showPassword(){
  
    this.show_eye = !this.show_eye;
  }

onReset() {
    this.submitted = false;
    this.signupForm.reset();
}

onSubmit(): void {
    this.submitted = true;
    this.authService.signup(this.email, this.password)

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      })
    };
    
    this.http.get('https://dev.api.eclerk.in/api/user/load', httpOptions)
    //this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', httpOptions)
      .subscribe(
        (val) => {
          this.response = val['data'];
          this.email = this.response.email;
          console.log('POST call successful value returned in body', val);
        }
      )
    if (this.signupForm.invalid) {
      return;
  }
        
}



SigninWithGoogle() {
  this.authService.SigninWithGoogle();
}
signOut() {
  this.authService.SignOut();
} 

}
