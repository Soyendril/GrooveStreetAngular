import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isAuthenticated:boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  /**
   * teste la connexion de l'utilisateur
   * permet d'afficher ou non les boutons de connexion/inscription
   * ou le bouton de déconnexion
   */
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  
  /** appele la methode de deconnexion du service
   * modifie isauthenticated pour afficher le formulaire de connexion/inscription
   */
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}