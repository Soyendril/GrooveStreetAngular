import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private baseUrl = 'http://localhost:8080/musiciens'; // Remplacez l'URL par celle de votre backend

  constructor(private http: HttpClient) { }

  getAllMusiciens() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
