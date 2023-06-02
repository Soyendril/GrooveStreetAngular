import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, count, switchMap } from 'rxjs';
import Musicien from '../model/musicien.model';


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens'; // Remplacez l'URL par celle de votre backend

  constructor(private http: HttpClient) { }

  // getOneMusicien(): Observable<Musicien>{
  //   return this.http.get<Musicien>(`${this.baseUrl}/52`);
  // }

  getRandomMusicien(): Observable<Musicien> {
    return this.getMusicienIds().pipe(
      switchMap(id => {
        const randomIndex = Math.floor(Math.random() * id.length);
        const randomId = id[randomIndex];
        return this.getMusicienById(randomId);
      })
    );
  }

  getMusicienIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/ids`);
  }

  getMusicienById(id: number): Observable<Musicien> {
    return this.http.get<Musicien>(`${this.baseUrl}/${id}`);
  }
}
