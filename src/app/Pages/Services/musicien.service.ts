import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, count, switchMap } from 'rxjs';
import Musicien from '../model/musicien.model';


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens';

  constructor(private http: HttpClient) { }

  /*
    On reprend Musicien en observable
    On génère un index au hasard qu'on passe sur la liste des IDs
    On obtient un ID qu'on passe à la fonction getMusicienById
  */
  getRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(id => {
        const randomIndex = Math.floor(Math.random() * id.length);
        const randomId = id[randomIndex];
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
