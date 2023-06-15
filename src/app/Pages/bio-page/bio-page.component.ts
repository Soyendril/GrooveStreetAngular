import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { MusicienService } from '../Services/musicien.service';

import Musicien from 'src/app/authentification/model/musicien.model';
@Component({
  selector: 'app-bio-page',
  templateUrl: './bio-page.component.html',
  styleUrls: ['./bio-page.component.css']
})
export class BioPageComponent {

  musicien: Musicien ={
    id: null,
    nom: '',
    pseudo: '',
    password: '',
    email:'',
    style : '',
    description: '',
    photo: '',
    codePostal: '',
    age: undefined
  };
  photoMusicien?: string;
  pseudoMusicien?: string;

  constructor(
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.authService.autoLogin();
    const userID = this.authService.getId();
  

  if (userID) {
    const userObject = JSON.parse(userID);
    this.pseudoMusicien = userObject.pseudo;
    this.photoMusicien = userObject.photo;
    console.log(userObject.photo);
  }
}

  settingspath = 'src\assets\img\settings.png'
  appareilphotopath = 'src\assets\img\logocamera.png'
  crayonpath = 'src\assets\img\edit.png'

}
