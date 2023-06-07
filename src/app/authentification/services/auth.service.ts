import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import Musicien from '../model/musicien.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/musiciens';


  /**
   *  permet d'inscrire dans un behaviorSubject le musicien
   *  afin de mettre a jour la connexion/déconnexion
   * et l'affichage des pages persos
   */
  musicien = new BehaviorSubject<Musicien | null>(null);


  /**
   * attributs pour la creation des cookies
   */
  private port = window.location.port;
  private cookieMusicien = `musicien_${this.port}`;
  private cookieId = `id_${this.port}`;
  private cookieEmail = `email_${this.port}`;

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  /**
   * methode de deconnection
   */
  public logout(): void {
    // Suppression des cookies
    this.deleteCookie();
//    this.musicien = new Subject<Musicien>();
    this.musicien.next(null);
    console.log("logout");
    // Après une déconnexion réussie :
    // this.isLoggedInSubject.next(false);
    // redirection en page d'acceuil
    this.router.navigate(['home']);
  }

  getUsers(): Observable<Musicien[]> {
    return this.http.get<Musicien[]>(this.apiUrl);
  }

  /**
   * creation du musicien
   * cree le "subject" musicien
   * afin de suivre sa connexion
   * @param musicien 
   * @returns 
   */
  addUser(musicien: Musicien): Observable<Musicien> {
    console.log("Envoi creation musicien au back");
    this.musicien.next(musicien);
    return this.http.post<Musicien>(this.apiUrl, musicien);
  }

  /**
   * Mise à jour d'un musicien
   * @param musicien 
   * @returns 
   */
  updateUser(musicien: Musicien): Observable<Musicien> {
    const url = `${this.apiUrl}/${musicien.id}`;
    return this.http.put<Musicien>(url, musicien);
  }

  /**
   * 
   * @param musicenId Supperssion d'un musicien
   * @returns 
   */
  deleteUser(musicenId: number | null): Observable<unknown> {
    const url = `${this.apiUrl}/${musicenId}`;
    return this.http.delete(url);
  }

  /**
   * recupere le pseudo de l'utilisateur par rapport à l'id
   * @returns 
   */
  getUser(id: string): Observable<Musicien> {
    const url = `${this.apiUrl}/pseudo/${id}`;
    return this.http.get<Musicien>(url);
  }


  /**
   * methode pour tester si utiliateur connecté
   * @returns 
   */
  public isLoggedIn(): boolean {
    // teste si deux cookies sont présents
    const cookieId = this.cookieId;
    const cookieEmail = this.cookieEmail;
    if ((this.getCookie(cookieId) != null && this.getCookie(cookieId) != "0") || (this.getCookie(cookieEmail) != null && this.getCookie(cookieEmail) != "0")) {
      return true;
    } else {
      return false;
    }

  }

  /**
   * authentifie l'utilisateur
   * fait un appel en bd pour recuperer si l'utilisateur et le password sont corrects
   * si le back ne renvoi pas "not" on stocke le cookie et renvoi true
   * sinon renvoi false
   */
  authenticate(formUser: FormGroup) {
    const url = `${this.apiUrl}/verifAuth`;
    return this.http.post(url, formUser);
  }

  /**
   * permet de récuperer un cookie
   * @param key 
   * @returns 
   */
  getCookie(key: string) {
    return this.cookieService.get(key) || "0";
  }

  /**
   * permet de créer un cookie
 * @param {string} key Id for the `value`.
 * @param {string} value Raw value to be stored.
 * @param {CookieOptions} options (Optional) Options object.
 */
  putCookie(key: string, value: string): void {
    this.cookieService.put(key, value);
    console.log("Le cookie : " + key + " : " + value);
  }

  /**
   * Supprime tous les cookies
   */

  deleteCookie(): void {
    this.cookieService.removeAll();
  }

  /**
   * Action a effectuer lorsque l'authentification est ok
   * mise en place des cookies
   * redirection vers page d'accueil
   * @param id 
   * @param email 
   */
  public authenticateOk(id: string, email: string) {
    this.putCookie(this.cookieId, (id));
    this.putCookie(this.cookieEmail, email);
    // redirection page d'accueil
    // this.router.navigate(['home']);
  }

  /**
   * permet de créer l'écoute du musicien pour les valeurs de connexion/déconnexion
   * @param musicien 
   */
  public createSubject(musicien: Musicien){
    console.log("crée le subject");
    this.putCookie(this.cookieMusicien, JSON.stringify(musicien));
    this.musicien.next(musicien);
  }

  /**
   * connecte automatiquement un utilisateur inscrit
   * utile pour revenir sur l'appli
   * @returns 
   */
  public autoLogin(){
    const musicienData:{
      id:string;
      nom: string;
      password: string;
      email: string;
      pseudo: string;
    } = JSON.parse(this.getCookie(this.cookieMusicien));
    if(!musicienData){
      return
    }
    const loadedMusicien = new Musicien(
      musicienData.id, musicienData.nom, musicienData.password, musicienData.email, musicienData.pseudo
      );
    this.musicien.next(loadedMusicien);
    console.log("object : "  + this.musicien);
  }
}