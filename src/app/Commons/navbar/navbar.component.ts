import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isOnSwipe: boolean;
  selectedButton: number=1;

  constructor(private router: Router) {
    this.isOnSwipe = this.router.url === 'Grooves/:id';
    // Vérifier le routerLink actif
    for (const button of this.buttons) {
      if (button.routerLink === this.router.url) {
        this.selectedButton = button.id;
        break;
      }
    }
  }

  // Initialiser à 2 pour la page de liste de profils

  buttons = [
    { id: 1, image1: 'assets/img/ppwht.png', image2: 'assets/img/ppgrn.png', routerLink:'/home'},
    { id: 2, image1: 'assets/img/lgwht2.png', image2: 'assets/img/logo_vert.png', routerLink: '/Grooving' },
    { id: 3, image1: 'assets/img/chatwht.png', image2: 'assets/img/chatgreen.png', routerLink: '/Grooves' }
  ];



  toggleButton(buttonId: number): void {
    this.selectedButton = buttonId;
  }
}
