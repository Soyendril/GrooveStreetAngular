import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import Musicien from 'src/app/authentification/model/musicien.model';

import { Observable, Subject, Subscription, map} from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  }
  )

  public loginError: boolean = false;
  musicien!: Musicien;
  errorsAuth: boolean = false;
  currentMusicienId: string | null = null;

  // id subscription
  isLoggedIn: boolean = false;
  private loggedInSubscription!: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  onSubmit() {
    if (this.formLogin.invalid) {
      return;
    }

    /**
     * verifie si le musicien est dans la bdd
     */
    this.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        // Authentification ok
        console.log("authtentification ok")
        this.errorsAuth = false;
        // redirection page d'accueil
        this.router.navigate(['home']);
      } else {
        // Authentification false
        // doit afficher un message à l'utilisateur
        console.log("mauvais email ou password");
        this.errorsAuth = true;
      }
    });


  }

  /**
   * verfie avec le back si l'email et password sont corrects
   * connecte l'utilisateur si ok
   * sinon renvoie l'erreur
   * @returns
   */

  private isAuthenticated(): Subject<boolean> {
    const formData = this.formLogin.value;
    const isAuthenticatedSubject = new Subject<boolean>();

    this.authService.isMusicien(formData).subscribe((response: any) => {
      console.log('Utilisateur authentifié avec succès', response);
      this.currentMusicienId = response.id;
      this.authService.createAuth(response.id, response);
      isAuthenticatedSubject.next(true);
    }, (error) => {
      console.error('Problème utilisateur ou mot de passe', error);
      isAuthenticatedSubject.next(false);
    });

    return isAuthenticatedSubject;
  }



  /**
   * recupere un musicien depuis le back grace à son id
   */
  getMusicienInfos(): Observable<void> {
    if(!this.currentMusicienId){
      this.currentMusicienId="";
    }
    return this.authService.getMusicienInfos(this.currentMusicienId).pipe(
      map((response) => {
        this.musicien = response;
        console.log("test est stst ststst");
      })
    );
  }

// ancienne version
  // private isAuthenticated(): Subject<boolean> {
  //   const formData = this.formLogin.value;
  //   const isAuthenticatedSubject = new Subject<boolean>();

  //   this.authService.isMusicien(formData).subscribe((response: any) => {
  //     console.log('Utilisateur authentifié avec succès', response);
  //     this.currentMusicienId = response.musicienId;

  //     if (this.currentMusicienId) {
  //       this.getMusicienInfos().subscribe(() => {
  //         isAuthenticatedSubject.next(true);
  //       });
  //       this.authService.createAuth(this.musicien).subscribe(() => {
  //         console.log("Subject créé avec succès !");
  //       });
  //     } else {
  //       isAuthenticatedSubject.next(true);
  //     }
  //   }, (error) => {
  //     console.error('Problème utilisateur ou mot de passe', error);
  //     isAuthenticatedSubject.next(false);
  //   });

  //   return isAuthenticatedSubject;
  // }
}
