import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{DashboardRoutingModule} from './dashboard-routing.module';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ActivityComponent } from './components/activity/activity.component';


@NgModule({
  declarations: [AccountsComponent, ContactsComponent, ActivityComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
