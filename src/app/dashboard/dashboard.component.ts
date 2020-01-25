import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';
import { AuthService } from '../shared';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../shared'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fullname :string;
  email: string;
  response: User;


  constructor(private nav:NavbarService,private authService:AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.nav.hide();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      })
    
  }
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
  }
  logOut(){
    this.authService.SignOut();
    console.log("successfully logged out");
  }
delete(id:number){
  // return this.authService.delete(id).subscribe(
  //   data => console.log(data),
  //   error => console.log(error)
  // );
}
}
