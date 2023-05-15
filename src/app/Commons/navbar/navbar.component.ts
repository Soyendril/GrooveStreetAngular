import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isOnSwipe: boolean;

  constructor(private router: Router) {
    this.isOnSwipe = this.router.url === 'Grooves/:id';
  }

}
