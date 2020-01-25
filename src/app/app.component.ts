import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  constructor(private authService: AuthService, private location: LocationStrategy){
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }
  title = 'eClerk';
  
}
