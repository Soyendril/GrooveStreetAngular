import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import Musicien from '../model/musicien.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

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
  currentMusicienId: string | null = null;


  /**
   * attributs pour la creation des cookies
   */
  private port = window.location.port;
  private cookieMusicien = `musicien_${this.port}`;
  private cookieId = `id_${this.port}`;
  private cookieEmail = `email_${this.port}`;

  // permet aux composants de s'abonner à la valeur de islogged
  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  /**
    * creation du musicien
    * @param musicien 
    * @returns 
    */
  addMusicien(musicien: Musicien): Observable<Musicien> {
    return this.http.post<Musicien>(this.apiUrl, musicien);
  }

  /**
   * Action a effectuer lorsque l'authentification est ok
   * permet de créer l'écoute du musicien pour les valeurs de connexion/déconnexion
   * @param musicien 
   */
  public createAuth(id: string | null, musicien: Musicien): Observable<Musicien | null> {
    // recupere l'id
    musicien.id = id;
    this.putCookie(this.cookieMusicien, JSON.stringify(musicien));
    this.setLoggedInStatus(true);
    return this.musicien.asObservable(); // Renvoie un Observable de Musicien | null
  }

  /**
   * verfie que le musicien est dans la bdd
   * fait un appel en bd pour recuperer si l'utilisateur et le password sont corrects
   * sinon renvoi false
   */
  isMusicien(formUser: FormGroup) {
    const url = `${this.apiUrl}/verifAuth`;
    return this.http.post(url, formUser);
  }

  /**
  * methode de deconnection
  */
  public logout(): void {
    // Suppression des cookies
    this.deleteCookie();
    this.setLoggedInStatus(false);
    console.log("logout");
    // redirection en page d'acceuil
    // this.router.navigate(['home']);
  }

  public getMusicienValue() {
    console.log(this.musicien.getValue());
  }

  /**
   * methode pour tester si utiliateur connecté
   * teste juste si le cookie est renseigné
   * @returns 
   */
  public isLoggedIn(): boolean {
    // teste si deux cookies sont présents
    if(this.getCookie(this.cookieMusicien) != "0"){
      return true;  
    }
    return false;
  }

  /**
   * retourne la valeur de isLogin pour tester la connexion
   * @returns 
   */
  public getLoggedInSubject(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  public setLoggedInStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
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
  }

  /**
   * Supprime tous les cookies
   */

  deleteCookie(): void {
    this.cookieService.removeAll();
  }

  ///////////



  /**
   * methode de deconnection
   */
  public logout22222(): void {
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
 * recupere un musicien avec ses infos : nom, email, pseudo, password depuis son id
 * @returns 
 */
  getMusicienInfos(id: string): Observable<Musicien> {
    const url = `${this.apiUrl}/auth/${id}`;
    console.log("url : " + url)
    return this.http.get<Musicien>(url);
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
   * connecte automatiquement un utilisateur inscrit
   * utile pour revenir sur l'appli
   * @returns 
   */
  public autoLogin222222() {
    console.log("auto")
    const musicienData: {
      id: string;
      nom: string;
      password: string;
      email: string;
      pseudo: string;
    } = JSON.parse(this.getCookie(this.cookieMusicien));
    if (!musicienData) {
      return
    }
    const loadedMusicien = new Musicien(
      musicienData.id, musicienData.nom, musicienData.password, musicienData.email, musicienData.pseudo
    );
    console.log("id : " + loadedMusicien.id);
    console.log("nom : " + loadedMusicien.nom);
    console.log("password : " + loadedMusicien.password);
    console.log("email : " + loadedMusicien.email);
    console.log("pseudo : " + loadedMusicien.pseudo);
    this.musicien.next(loadedMusicien);
    console.log("object : " + this.musicien);
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
}