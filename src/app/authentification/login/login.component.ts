import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../services/musicien.service';

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
    private musicienService: MusicienService) {}
 
  onSubmit(){
    if (this.formLogin.invalid) {
      return;
    }

    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    // Appeler le service d'authentification pour effectuer la vérification des informations de connexion
    const isAuthenticated = this.musicienService.authenticate(email, password);
    console.log(isAuthenticated);
 
    if (isAuthenticated) {
      // Rediriger vers la page de succès de connexion
      // ...
      console.log("authentification réussie");
    } else {
      this.loginError = true;
      console.log("authentification false");
    }
  }

}
