import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, count, switchMap, take, tap, EMPTY } from 'rxjs';
import Musicien from '../model/musicien.model';


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens';

  dislikedMusiciens: any[] = [];
  profilConsulted: boolean = false;
  private selectedMusicienIds: number[] = [];


  constructor(private http: HttpClient) { }

  /*
    On reprend Musicien en observable
    On génère un index au hasard qu'on passe sur la liste des IDs
    On obtient un ID qu'on passe à la fonction getMusicienById
  */
  getRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        const availableIds = ids.filter(id => !this.selectedMusicienIds.includes(id));
        if (availableIds.length === 0) {
          // Tous les musiciens ont déjà été sélectionnés
          console.log("Plus de musiciens");
          return EMPTY;
        }
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        const randomId = availableIds[randomIndex];
        this.selectedMusicienIds.push(randomId);
        return this.getMusicienById(randomId);
      })
    );
  }

  switchRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(ids => {
        if (this.dislikedMusiciens.length === ids.length) {
          this.profilConsulted = true;
          console.log("Plus de musiciens");
          return EMPTY; // Retourne un observable vide si tous les profils ont été consultés
        } else {
          const filteredIds = ids.filter(id => !this.dislikedMusiciens.includes(id));
          const randomIndex = Math.floor(Math.random() * filteredIds.length);
          const randomId = filteredIds[randomIndex];
          return this.getMusicienById(randomId).pipe(
            take(1),
            tap(musicien => this.dislikedMusiciens.push(musicien.id))
          );
        }
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
