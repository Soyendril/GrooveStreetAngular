import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, count } from 'rxjs';
import { CookieOptions, CookieService } from 'ngx-cookie';
import Musicien from '../model/musicien.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MusicienService {

  private readonly apiUrl = 'http://localhost:8080/musiciens';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsers(): Observable<Musicien[]> {
    return this.http.get<Musicien[]>(this.apiUrl);
  }

  addUser(musicien: Musicien): Observable<Musicien> {
    console.log("Envoi creation musicien au back");
    return this.http.post<Musicien>(this.apiUrl, musicien);
  }

  updateUser(musicien: Musicien): Observable<Musicien> {
    const url = `${this.apiUrl}/${musicien.id}`;
    return this.http.put<Musicien>(url, musicien);
  }

  deleteUser(musicenId: number | null): Observable<unknown> {
    const url = `${this.apiUrl}/${musicenId}`;
    return this.http.delete(url);
  }

  /**
   * recupere un utilisateur
   * @returns 
   */
  getUser(email: string, password: string): Observable<Musicien> {
    const url = `${this.apiUrl}/${email}?${password}`;
    console.log('Service musicien : ' + this.http.get<Musicien[]>(url));
    return this.http.get<Musicien>(url);
  }

  /**
   * methode de connexion
   */
  public login(): void {
    // Effectuer ici la logique d'authentification, par exemple, envoyer une requête HTTP pour vérifier les informations de connexion.

    // Après une authentification réussie :
    this.isLoggedInSubject.next(true);
  }

  /**
   * methode de deconnection
   */
  public logout(): void {
    // Effectuer ici la logique de déconnexion, par exemple, supprimer les cookies ou les jetons d'authentification.
    console.log("logout");
    // Après une déconnexion réussie :
    this.isLoggedInSubject.next(false);
  }

  /**
   * methode pour tester la connection
   * @returns 
   */
  public isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  /**
   * authentifie l'utilisateur
   * fait un appel en bd pour recuperer si l'utilisateur et le password sont corrects
   * si le back ne renvoi pas "not" on stocke le cookie et renvoi true
   * sinon renvoi false
   */
  authenticate(formUser: FormGroup) {
    // creation du nom de cookie par rapport au port du localhost de l'application utilisée
    const port = window.location.port;
    const cookieId = `id_${port}`;
    const cookieEmail = `email_${port}`;

    const url = `${this.apiUrl}/verifAuth`;
    return this.http.post(url, formUser);
  }

  getCookie(key: string) {
    return this.cookieService.get(key) || "0";
  }

  /**
 * @param {string} key Id for the `value`.
 * @param {string} value Raw value to be stored.
 * @param {CookieOptions} options (Optional) Options object.
 */
  putCookie(key: string, value: string): void {
    this.cookieService.put(key, value);
    console.log("Le cookie : " + key + " : " + value);
  }
 
}