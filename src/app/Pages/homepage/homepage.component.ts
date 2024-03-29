import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { MusicienService } from '../Services/musicien.service';
import Musicien from 'src/app/authentification/model/musicien.model';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomepageComponent implements OnInit {

  musicien: Musicien ={
    id: null,
    nom: '',
    pseudo: '',
    password: '',
    email:'',
    style : '',
    description: '',
    photo: '',
    codePostal: '',
    age: undefined,
    instrument:'',
  };

  pseudoMusicien?: string;
  photoMusicien?: string;

  isAuthenticated:boolean = false;
  // isLoggedIn: boolean = false;

  currentState = 'premiere-div'; // État initial, la première div visible
  currentIndex = 0;
  divs = ['premiere-div', 'deuxieme-div']; // Liste des classes CSS pour les divs

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
    this.authService.autoLogin();
    const userID = this.authService.getId();
    this.isAuthenticated = this.authService.isLoggedIn();

    if (userID) {
      const userObject = JSON.parse(userID);
      this.pseudoMusicien = userObject.pseudo;
      this.photoMusicien = userObject.photo;
    }

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.divs.length; // Alterner l'index entre 0 et 1
    }, 3000);
  
  }

  toggleState() {
    this.currentState = this.currentState === 'premiere-div' ? 'deuxieme-div' : 'premiere-div';
  }

  /** appelle la methode de deconnexion du service
   * modifie isauthenticated pour afficher le formulaire de connexion/inscription
   */
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  get musicienService(): MusicienService {
    return this._musicienService;
  }
}
