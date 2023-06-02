import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, count } from 'rxjs';
import Musicien from '../model/musicien.model';


@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens'; // Remplacez l'URL par celle de votre backend

  constructor(private http: HttpClient) { }

  getOneMusicien(): Observable<Musicien>{
    return this.http.get<Musicien>(`${this.baseUrl}/2`);
  }
}
