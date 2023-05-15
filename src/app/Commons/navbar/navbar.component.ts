import { Component, OnInit } from '@angular/core';
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

  selectedButton: number = -1; // Initialiser à -1 pour aucun bouton sélectionné

  buttons = [
    { id: 1, image1: 'assets/img/ppwht.png', image2: 'assets/img/ppgrn.png', routerLink:'/home'},
    { id: 2, image1: 'assets/img/lgwht2.png', image2: 'assets/img/logo_vert.png', routerLink: '/Grooving' },
    { id: 3, image1: 'assets/img/chatwht.png', image2: 'assets/img/chatgreen.png', routerLink: '/Grooves' }
  ];

  toggleButton(buttonId: number): void {
    if (this.selectedButton === buttonId) {
      this.selectedButton = -1; // Si le bouton est déjà sélectionné, le désélectionner
    } else {
      this.selectedButton = buttonId; // Sinon, sélectionner le bouton
    }
  }
}
