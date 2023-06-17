import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  settingsForm: FormGroup;

  communeMusicien?: string;
  codePostalMusicien?: string;
  ageMusicien?: string;
  emailMusicien?: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.settingsForm = this.formBuilder.group({
      commune: [''],
      codePostal: [''],
      email: [''],
      age: [''],
      password: [''],
      confirmPassword: [''],
      tel: ['']
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();

    const userID = this.authService.getId();
    if (userID) {
      const userObject = JSON.parse(userID);
      this.communeMusicien = userObject.codePostal?.commune;
      this.codePostalMusicien = userObject.codePostal?.zipcode;
      this.ageMusicien = userObject.age;
      this.emailMusicien = userObject.email;

      this.settingsForm.patchValue({
        commune: this.communeMusicien,
        codePostal: this.codePostalMusicien,
        age: this.ageMusicien,
        email: this.emailMusicien
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  deleteAccount() {
    const userID = this.authService.getId();
    if (userID) {
      const userObject = JSON.parse(userID);
      const userId = userObject.id;
      this.authService.deleteUser(userId).subscribe(
        () => {
          // Compte supprimé avec succès
          console.log('Compte supprimé avec succès');
          this.authService.logout();
          this.router.navigate(['/home']);
        },
        (error) => {
          // Une erreur s'est produite lors de la suppression du compte
          console.error('Erreur lors de la suppression du compte :', error);
        }
      );
    }
  }
}
