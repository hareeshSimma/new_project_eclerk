import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AccountsComponent } from './components/accounts/accounts.component';
// import { ContactsComponent } from './components/contacts/contacts.component';
// import { ActivityComponent } from './components/activity/activity.component';
import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
    {
      path: 'dashboard',
      component:DashboardComponent,
   
}

   
]
    @NgModule({
        imports: [RouterModule.forRoot(routes, { useHash: true })],
        exports: [RouterModule]
      })
      export class DashboardRoutingModule { }
      