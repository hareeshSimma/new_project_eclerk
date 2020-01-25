import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import{FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


// import { DashboardComponent } from './components/dashboard/dashboard.component';

/*Firebase services*/

// import { AngularFireModule } from "@angular/fire";
// import { AngularFireAuthModule } from "@angular/fire/auth";

import { AngularFirestore } from '@angular/fire/firestore/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';

/*API Consume using HttpClientModule
import {HttpClient, HttpClientModule}  from '@angular/common/http';*/
import { HttpClientModule } from '@angular/common/http';

/* Auth service */
import { AuthService } from './shared/auth.service';
//import {} from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
;
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';

import { ContactusComponent } from './contactus/contactus.component';

import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { CarouselModule  } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AlertComponent } from './alert/alert.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainpageComponent } from './mainpage/mainpage.component';
//import { UserService } from './shared';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsofuseComponent } from './shared/components/termsofuse/termsofuse.component';


import { AccountsComponent } from './dashboard/components/accounts/accounts.component';
import { ContactsComponent } from './dashboard/components/contacts/contacts.component';
import { ActivityComponent } from './dashboard/components/activity/activity.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ChangepasswordComponent } from './shared/components/changepassword/changepassword.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
   
    HomeComponent,
    AboutusComponent,
  
    ContactusComponent,
    FooterComponent,
    MenuComponent,
   
    LoginComponent,
    SignupComponent,
    AlertComponent,
    ForgotPasswordComponent,
    MainpageComponent,
    DashboardComponent,
    TermsofuseComponent,
    
   
   AccountsComponent,
   ContactsComponent,
   ActivityComponent,
   NavbarComponent,
   ChangepasswordComponent,
   ProfileComponent,
   
    
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule ,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
   AngularFireDatabaseModule,
   
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [AuthService,AngularFirestore,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
