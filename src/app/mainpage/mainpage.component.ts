import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared';
import { Router } from '@angular/router';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import{NavbarService}from '../shared/navbar.service';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router,private http:HttpClient ,private nav:NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }
  skip(){
    console.log("k")
    this.router.navigate(['/dashboard']);
  }
  logout(){
    
  }

}
