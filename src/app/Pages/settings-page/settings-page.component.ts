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
    const userLogged:any = this.authService.getLoggedInUser();
    if (userID) {
      const userObject = JSON.parse(userID) as { 
        codePostal?: { 
          commune?: string; 
          zipcode?: string; 
        }; 
        age?: string; 
        email?: string; 
      };
      
      this.communeMusicien = userObject.codePostal?.commune;
      this.codePostalMusicien = userObject.codePostal?.zipcode;
      this.ageMusicien = userObject.age;
      this.emailMusicien = userObject.email;
      console.log("userobject "+ userObject);
      console.log("userID "+ userID);
      console.log("userLogged " + userLogged);
      console.log("commune "+ userObject.codePostal?.commune);
      console.log("codepostal "+ userObject.codePostal?.zipcode);
      console.log("age "+ userObject.age);
      console.log("mail "+ userObject.email);

      this.patchFormValues();
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
          console.log('Compte supprimé avec succès');
          this.authService.logout();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du compte :', error);
        }
      );
    }
  }
  private patchFormValues() {
    if (this.communeMusicien) {
      this.settingsForm.patchValue({
        commune: this.communeMusicien
      });
    }
    if (this.codePostalMusicien) {
      this.settingsForm.patchValue({
        codePostal: this.codePostalMusicien
      });
    }
    if (this.ageMusicien) {
      this.settingsForm.patchValue({
        age: this.ageMusicien
      });
    }
    if (this.emailMusicien) {
      this.settingsForm.patchValue({
        email: this.emailMusicien
      });
    }
  }
}
