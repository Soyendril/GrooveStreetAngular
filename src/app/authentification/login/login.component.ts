import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import Musicien from '../model/musicien.model';

import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // pas besoin de générer les FormControls
  // On précise aussi les validations
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  }
  )
  public loginError: boolean = false;
  musicien!: Musicien;
  errorsAuth: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  onSubmit() {
    if (this.formLogin.invalid) {
      return;
    }

    // Appeler le service d'authentification pour effectuer la vérification des informations de connexion
    // const isAuthenticated = this.musicienService.authenticate();
    // console.log(isAuthenticated);

    // envoi le formulaire en post au back

    this.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        // Authentification ok
        console.log("ok")
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

  private isAuthenticated(): Observable<boolean> {
    const formData = this.formLogin.value;
    // variables necessaires aux cookies
    const port = window.location.port;
    const cookieId = `id_${port}`;
    const cookieEmail = `email_${port}`;

    return this.authService.authenticate(formData).pipe(
      map((response:any) => {
        console.log(response);
        // Traitement de la réponse réussie
        console.log('Utilisateur authentifié avec succès', response);
        // creation des cookies
        this.authService.putCookie(cookieId, ("" + response.musicienId));
        this.authService.putCookie(cookieEmail, this.formLogin.value.email);
        // creation du subject musicien
        this.authService.createSubject(formData);


        return true; 
      }),
      catchError((error) => {
        console.error(error);
        // Traitement de l'erreur
        console.error('Problème utilisateur ou mot de passe', error);
        return of(false) // Renvoie false lorsque l'authentification échoue
      })
    );
  }

}
