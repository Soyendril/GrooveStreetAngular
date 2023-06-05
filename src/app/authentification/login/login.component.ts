import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../services/musicien.service';
import { Observable, catchError, map, of, retry } from 'rxjs';

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

  constructor(
    private formBuilder: FormBuilder,
    private musicienService: MusicienService) { }

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
      } else {
        // Authentification false
        // doit afficher un message à l'utilisateur
        console.log("mauvais")
      }
    });

  }

  private isAuthenticated(): Observable<boolean> {
    const formData = this.formLogin.value;
    // variables necessaires aux cookiers
    const port = window.location.port;
    const cookieId = `id_${port}`;
    const cookieEmail = `email_${port}`;

    return this.musicienService.authenticate(formData).pipe(
      map((response:any) => {
        console.log(response);
        // Traitement de la réponse réussie
        console.log('Utilisateur authentifié avec succès', response);
        // creation des cookies
        this.musicienService.putCookie(cookieId, ("" + response.musicienId));
        this.musicienService.putCookie(cookieEmail, this.formLogin.value.email);
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
