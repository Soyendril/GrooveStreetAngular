import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, EMPTY, map } from 'rxjs';
import Musicien from 'src/app/authentification/model/musicien.model';


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens';

  private dislikedMusiciens: any[] = [];
  profilConsulted$ = new BehaviorSubject<boolean>(false);

  private selectedMusicienIds: number[] = [];
  musiciensEpuises$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }
  /**
    On reprend Musicien en observable
    On génère un index au hasard qu'on passe sur la liste des IDs
    On obtient un ID qu'on passe à la fonction getMusicienById
  */
  getRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        let availableIds = ids.filter(id => !this.selectedMusicienIds.includes(id) && !this.dislikedMusiciens.includes(id));
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

  /*
    Méthode quasi identique à getRandomMusicien() appliquée pour l'option "dislike"
    Ne prend pas en compte la liste de musiciens déjà vus de la méthode ci-dessus
  */
  switchRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        let availableIds = ids.filter(id => !this.dislikedMusiciens.includes(id));
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
}
