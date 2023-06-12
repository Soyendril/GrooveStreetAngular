import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { MusicienService } from '../Services/musicien.service';
import Musicien from '../model/musicien.model';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
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
    age: undefined
    
  };
  pseudoMusicien?: string;
  isAuthenticated:boolean = false;

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
    this.isAuthenticated = this.authService.isLoggedIn();
  this._musicienService.getMusicienByPseudo().subscribe((pseudo)=> {
    this.pseudoMusicien=pseudo;}, (error) => {console.log(error);}); 
  }

  
  /** appele la methode de deconnexion du service
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
