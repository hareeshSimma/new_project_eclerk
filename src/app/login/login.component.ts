import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService, AlertService, User } from 'src/app/shared';
import { Observable } from 'rxjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {HttpHeaders,HttpClient, HttpResponse} from '@angular/common/http';
import { NavbarService } from '../shared/navbar.service';
 import {ChangeDetectorRef} from '@angular/core'
@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: Observable<firebase.User>;
  loginForm: FormGroup;
  submitted = false;
  email:string;
  password:string;
  response :User;
  token: Observable<string>
  show_eye: Boolean = false;
  constructor(private authService: AuthService, private alertService: AlertService,
    private formBuilder: FormBuilder,
    private reactiveforms:ReactiveFormsModule,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer:DomSanitizer,private nav:NavbarService,
    private ref: ChangeDetectorRef) {
      

  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
    })
   

  }
//   ngAfterContentChecked() {
//     this.ref.detectChanges();
// }
  
  get f(){
    return this.loginForm.controls;
  }
  showPassword(){
  
    this.show_eye = !this.show_eye;
  }
  onSubmit() {
    this.submitted = true;
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      })
    };
    
    //this.http.get('https://dev.api.eclerk.in/api/user/load', httpOptions)
    this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', httpOptions)
      .subscribe(
        (val) => {
          this.response = val['data'];
          this.email = this.response.email;
          console.log('POST call successful value returned in body', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
       this.router.navigate(['/dashboard']);  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
   
    
  }
  else this.router.navigateByUrl('/dashboard');
}
  // onLogin(){
  //   console.log(this.loginForm.value);
  //   this.isSubmitted = true;
  //   if(this.loginForm.invalid){
  //     return;
  //   }
  //   this.authService.onLogin(this.loginForm.value);
  //   this.router.navigateByUrl('/dashboard');
  // }
  
SigninWithGoogle() {
  this.authService.SigninWithGoogle();
}
signOut() {
  this.authService.SignOut();
} 

}
