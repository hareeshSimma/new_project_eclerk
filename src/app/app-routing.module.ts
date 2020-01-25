import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
// import {AuthguardService} from 'src/app/shared/authguard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { TermsofuseComponent } from './shared/components/termsofuse/termsofuse.component';

import { AccountsComponent } from './dashboard/components/accounts/accounts.component';
import { ContactsComponent } from './dashboard/components/contacts/contacts.component';
import { ActivityComponent } from './dashboard/components/activity/activity.component';
import { ChangepasswordComponent } from './shared/components/changepassword/changepassword.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'mainpage',
    component: MainpageComponent,
    
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
          path:'accounts',
          component:AccountsComponent
      },
      {
          path:'contacts',
          component:ContactsComponent
      },
      {
          path:'activity',
          component:ActivityComponent
      }]
  },
  {
    path:'forgotpassword',
    component:ForgotPasswordComponent
  },
  {
    path:'changepassword',
    component:ChangepasswordComponent
  },
  {
    path:'termsofuse',
    component:TermsofuseComponent
  },
  
  {
    path:'profile',
    component:ProfileComponent
    }
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
