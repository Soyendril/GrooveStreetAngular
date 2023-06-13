import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import Musicien from '../model/musicien.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  // declaration des champs du formulaire
  // pas besoin de générer les FormControls
  // On précise aussi les validations
  formMusicien: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    pseudo: [''],
  }, {
    validators: this.verifPassword('password', 'confirmPassword')
  }
  )


  // Declaration du detail user vide
  // cree une variable pour envoyer le contenu du formulaire
  musicien: Musicien = {
    id: null,
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    description: '',
    style: '',
    photo: '',
    codePostal: '',
    age: undefined
  };

  currentMusicienId: string | null = null;

  // declaration boolean
  submitted: boolean = false;

  // Declaration du formulaire dans le constructeur
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  onSubmit(): boolean {
    this.submitted = true;
    // Appel du validateur 'invalid' pour vérifier le formulaire
    if (this.formMusicien.invalid) {
      console.log("Formulaire non valide");
      return false;
    } else {
      // recupere le contenu du formulaire
      this.musicien = {
        id: null,
        nom: this.formMusicien.value.nom,
        email: this.formMusicien.value.email,
        password: this.formMusicien.value.password,
        pseudo: this.formMusicien.value.nom,
        style: this.formMusicien.value.style,
        photo: this.formMusicien.value.photo,
        codePostal: this.formMusicien.value.codePostal,
        age: this.formMusicien.value.age,
        description: this.formMusicien.value.description
      };

      // ajoute un nouvel utilisateur
      this.newMusicien();
      // efface le contenu du formulaire

      // redirige page d'accueil
      return true;
    }
  }

  /**
   * cree le musicien
   * cree le cookie de connexion
   * redirige vers la page d'accueil
   */
  private newMusicien() {
    // version recommandée de subscribe
    this.authService.addMusicien(this.musicien).
      subscribe({
        next: (response) => {
          console.log('Utilisateur créé avec succès', response);
          // this.authService.authenticateOk(id, this.musicien.email)
          this.currentMusicienId = response.id

          this.authService.createAuth(this.currentMusicienId, this.musicien);
        },
        error: (error) =>
          console.error("Une erreur s'est produite lors de la création de l'utilisateur", error),
        complete: () =>
          console.info('')
      })
  }

  verifPassword(field1: string, field2: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fieldValue1 = control.get(field1)?.value;
      const fieldValue2 = control.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        control.get('confirmPassword')?.setErrors({ verifPassword: true });
        return { verifPassword: true };
      }
      return null;
    };
  }
}
