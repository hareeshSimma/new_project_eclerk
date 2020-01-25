import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import * as firebase from 'firebase/app';
//import 'rxjs/add/operator';

//import { getMaxListeners } from 'cluster';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;
  token: any;
  accessToken: any;
  response :any;
  // public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  user: User;
  currentUsers : any;
  email:string;
  constructor(private http: HttpClient, public router: Router, public afAuth: AngularFireAuth, public ngZone: NgZone, private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    // this.recaptchaVerifier =  new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.afAuth.authState.subscribe(user => {
      (user) => {
        if (user) {
          this.user = user;
          console.log(this.user);
        }
        else {
          this.user = null;
        }
      }
    })
  }
  signup(email: string, password: string) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!',res);
        // console.log(JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken);
        this.token = JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken;
        localStorage.setItem('ACCESS_TOKEN',  this.token );
     return   this.accessToken= localStorage.getItem('ACCESS_TOKEN');
        // const newUser = {
        //   'signupMethod': 'email',
        //   'email': 'some@gmail.com',
        //   'name': '',
        // };
        // this.createUser(newUser, this.accessToken);

        // const headerDict = {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json',
        //   'Access-Control-Allow-Headers': 'Content-Type',
        //   'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        // }
        
        // const requestOptions = {                                                                                                                                                                                 
        //   headers: new HttpHeaders(headerDict), 
        // };
        
        // this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', requestOptions)
        //   .subscribe(
        //     (val) => {
        //       console.log(val,"@@@@@@@@@")
        //       this.response = val['currentUser'];
        //       this.email = this.currentUsers.email;
        //       console.log('POST call successful value returned in body', val);
        //     }  
        //   )
      })
      .catch(err => {
        alert(this.handleError(err['code']));
        //console.log('Something is wrong:', err.message);
        //this.errorHandler
      });

      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      //   })
      // };

      // const headerDict = {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      //   'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      // }
      
      // const requestOptions = {                                                                                                                                                                                 
      //   headers: new HttpHeaders(headerDict), 
      // };
      
      // //this.http.get('https://dev.api.eclerk.in/api/user/load', httpOptions)
      // this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', requestOptions)
      //   .subscribe(
      //     (val) => {
      //       console.log(val,"@@@@@@@@@")
      //       this.response = val['currentUser'];
      //       this.email = this.currentUsers.email;
      //       console.log('POST call successful value returned in body', val);
      //     },
          // response => {
          //   console.log('POST call in error', response);
          // },
          // () => {
          //   console.log('The POST observable is now completed.');
          // });
        // )
        //  this.router.navigate(['/mainpage']);
          // stop here if form is invalid
         
        
  }



 
// private errorHandler(error: Response){
//   console.error(error)
//   return Observable.throw(error)
      
//   }





login(email: string, password: string) {
  this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in');
      // console.log(JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken);
      this.token = JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken;
      localStorage.setItem('ACCESS_TOKEN',  JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken);
    const httpOptions = {
        headers: new HttpHeaders({
          //Authorization: 'Bearer ' + this.token
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        })
      };

      this.http.post('https://dev.api.eclerk.in/api/firebase/signin', null, httpOptions)
        .subscribe(
          (val) => {
            console.log('POST call successful value returned in body', val);
          },
          response => {
            console.log('POST call in error', response);
         },
          () => {
            console.log('The POST observable is now completed.');
          });

      
     })
    .catch(err => {
      alert(this.handleError(err['code']));

     });
   
 }



  OAuthProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
      })
      }).catch((error) => {
        window.alert(error)
      })
  
     }
  


  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        console.log('Successfully logged in!')
        this.token = JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken;
        localStorage.setItem('ACCESS_TOKEN',  JSON.parse(JSON.stringify(this.angularFireAuth.auth.currentUser)).stsTokenManager.accessToken);
      }).catch(error => {
        console.log(error)
      });
  }


  public onLogin(userInfo: User) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }


  // createUser(newUser,token) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       //Authorization: 'Bearer ' + token
  //       Authorization: 'Bearer ' + localStorage.getItem(this.accessToken)
  //     })
  //   };

  //   this.http.post('https://dev.api.eclerk.in/api/firebase/signup', newUser, httpOptions)
  //     .subscribe(
  //       (val) => {
  //         console.log('POST call successful value returned in body', val);
  //       },
  //       response => {
  //         console.log('POST call in error', response);
  //       },
  //       () => {
  //         console.log('The POST observable is now completed.');
  //       });
  // }

  
  
     handleError(code: string): string {
        switch (code) {
            case 'auth/user-disabled': {
                return 'Sorry your user is disabled.';
            }
            case 'auth/user-not-found': {
                return 'Sorry user not found.';
            }
            case 'auth/email-already-exists':{
                 return 'The email address is already in use by another account.'
            }
            case 'auth/invalid-email-verified':{
                 return 'Please enter valid email.'
            }

            default: {
                return 'Login error try again later.';
            }
        }
    }





//forgotpassword
  resetpassword(email: string) {
  return this.angularFireAuth.auth.sendPasswordResetEmail(email,{ url: 'https://eclerk.firebaseapp.com' })
      .then(() => {
        alert('A password reset link has been sent to your email address');
       })
      .catch((error) =>{ alert('An error occurred while attempting to reset your password');

      })
  }

  //changepassword
  // changePassword(data){
  //   var headers = new HttpHeaders()
  //     .set('Authorization', 'Token ' + localStorage.getItem('usertoken'));
  
  //   var options =  {
  //       headers: headers
  //   };
  //   return this.http
  //     .patch('/api/auth/change_password/',data, options)
  // }


  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.ngZone.run(() => {
      this.router.navigate(['home']);
    })
  })
  }
}