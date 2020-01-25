import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/navbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  constructor(public nav:NavbarService) { }

  ngOnInit() {
    this.nav.show();

  }

}
