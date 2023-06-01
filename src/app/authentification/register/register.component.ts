import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
// declaration des champs du formulaire
  // pas besoin de générer les FormControls
  // On précise aussi les validations
  formUser: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.verifPassword('password', 'confirmPassword')
  }
  )


  // Declaration du detail user vide
  // cree une variable pour envoyer le contenu du formulaire
  user: User = {
    id: null,
    userName: '',
    email: '',
    password: ''
  };

  // declaration boolean
  submitted: boolean = false;

  // Declaration du formulaire dans le constructeur
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  onSubmit(): boolean {
    this.submitted = true;
    // Appel du validateur 'invalid' pour vérifier le formulaire
    if (this.formUser.invalid) {
      console.log("Formulaire non valide");
      return false;
    } else {
      // recupere le contenu du formulaire
      this.user = {
        id: null,
        userName: this.formUser.value.userName,
        email: this.formUser.value.email,
        password: this.formUser.value.password
      };

      console.log("Utilisateur : " + this.user);

      // ajoute un nouvel utilisateur
      this.newUser();
      // efface le contenu du formulaire

      // redirige page d'accueil
      return true;
    }
  }

  private newUser() {
    this.userService.addUser(this.user)
      .subscribe(
        response => {
          console.log('Utilisateur créé avec succès', response);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la création de l\'utilisateur', error);
        }
      );
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