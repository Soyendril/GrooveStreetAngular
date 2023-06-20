import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, EMPTY, map } from 'rxjs';
import Musicien from 'src/app/authentification/model/musicien.model';
import { AuthService } from 'src/app/authentification/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens';

  private dislikedMusiciens: any[] = []; // tableau d'ID de musiciens dislikés
  profilConsulted$ = new BehaviorSubject<boolean>(false);

  private selectedMusicienIds: number[] = []; // tableau d'ID de musiciens passés
  musiciensEpuises$ = new BehaviorSubject<boolean>(false);

  private doneMusiciens: number[] = [];

  isAuthenticated:boolean = false;

  likedMusicians: Set<number>; // Ensemble des musiciens likés par l'utilisateur courant
  matches: Set<number>; // Ensemble des musiciens qui ont liké l'utilisateur courant

  constructor(private http: HttpClient, private authService: AuthService) {
    this.likedMusicians = new Set();
    this.matches = new Set();
  }

  // On recupère l'ID de la personne authentifiée pour l'ejecter des résultats
  authUser(){
    this.authService.autoLogin();
    const userID = this.authService.getId();
    this.isAuthenticated = this.authService.isLoggedIn();
    if (userID) {
      const userObject = JSON.parse(userID);
      this.selectedMusicienIds.push(userObject.id);
    }
  }

  /**
    On reprend Musicien en observable
    On génère un index au hasard qu'on passe sur la liste des IDs
    On obtient un ID qu'on passe à la fonction getMusicienById
  */
  getRandomMusicien(): Observable<Musicien> {
    this.authUser();
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        let availableIds = ids.filter(id =>
          !this.selectedMusicienIds.includes(id) &&
          !this.dislikedMusiciens.includes(id) &&
          !this.doneMusiciens.includes(id)
          );
        if (availableIds.length === 0) { // Tous les musiciens ont déjà été sélectionnés
          this.musiciensEpuises$.next(true);
          availableIds = [...this.selectedMusicienIds]; // Créer une copie de selectedMusicienIds
          this.selectedMusicienIds = [];
          return EMPTY; // Retourne un observable vide si tous les profils ont été consultés
        }
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        const randomId = availableIds[randomIndex];
        this.selectedMusicienIds.push(randomId);
        return this.getMusicienById(randomId);
      })
    );
  }

  // Ejection de l'ID de la personne authentifiée pour l'option dislike
  authUserdisliked(){
    this.authService.autoLogin();
    const userID = this.authService.getId();
    this.isAuthenticated = this.authService.isLoggedIn();
    if (userID) {
      const userObject = JSON.parse(userID);
      this.dislikedMusiciens.push(userObject.id);
    }
  }

  /*
    Méthode quasi identique à getRandomMusicien() appliquée pour l'option "dislike"
    Ne prend pas en compte la liste de musiciens déjà vus de la méthode ci-dessus
  */
  switchRandomMusicien(): Observable<Musicien> {
    this.authUserdisliked();
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        let availableIds = ids.filter(id =>
          !this.dislikedMusiciens.includes(id) &&
          !this.doneMusiciens.includes(id)
          );
        if (this.dislikedMusiciens.length === ids.length) {
          this.profilConsulted$.next(true);
          availableIds = [...this.dislikedMusiciens];
          this.dislikedMusiciens = [];
          return EMPTY;
        }
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        const randomId = availableIds[randomIndex];
        this.dislikedMusiciens.push(randomId);
        return this.getMusicienById(randomId);
      })
    );
  }

  // On passe la liste des IDs des musiciens en observable
  getMusicienIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/ids`);
  }

  // On rend Musicien observable pour le récupérer une fois l'ID définie
  getMusicienById(id: number): Observable<Musicien> {
    return this.http.get<Musicien>(`${this.baseUrl}/${id}`);
  }

  //On récupère le musicien actuellement affiché via l'ID dernièrement utilisée
  getMusicienActuel(): Observable<Musicien> {
    const musicienId = this.selectedMusicienIds[this.selectedMusicienIds.length - 1];
    return this.getMusicienById(musicienId);
  }

  // On ajoute l'ID du musicien liké à l'ensemble des profils likés
  likeMusicien(): Observable<Musicien> {
    const musicienId = this.selectedMusicienIds[this.selectedMusicienIds.length - 1];
    this.likedMusicians.add(musicienId);
    this.doneMusiciens.push(musicienId);
    return this.getMusicienById(musicienId);
    // return this.checkMatch(musicienId);
  }

  /*
    On vérifie si l'ID de la personne authentifiée est contenu
    dans l'ensemble liké du profil affiché
  */
  isUserLiked(): boolean {
    const userID = this.authService.getId();
    if (userID) {
      const userObject = JSON.parse(userID);
      const userId = userObject.id;
      return this.likedMusicians.has(userId);
    }
    return false;
  }
}
