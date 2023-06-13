import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { MusicienService } from '../Services/musicien.service';
import Musicien from 'src/app/authentification/model/musicien.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isAuthenticated:boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private _musicienService: MusicienService
  ) { }

  /**
   * teste la connexion de l'utilisateur
   * permet d'afficher ou non les boutons de connexion/inscription
   * ou le bouton de déconnexion
   */
  ngOnInit(): void {
    const userID = this.authService.getId();
    this.isAuthenticated = this.authService.isLoggedIn();

  }

  /** appele la methode de deconnexion du service
   * modifie isauthenticated pour afficher le formulaire de connexion/inscription
   */
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  get musicienService(): MusicienService {
    return this._musicienService;
  }
}
