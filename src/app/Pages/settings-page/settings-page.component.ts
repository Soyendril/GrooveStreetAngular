import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentification/services/auth.service';

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
    private formBuilder: FormBuilder
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
}
