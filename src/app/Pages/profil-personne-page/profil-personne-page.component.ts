import { Component, Input, OnInit } from '@angular/core';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../Services/musicien.service';

@Component({
  selector: 'app-profil-personne-page',
  templateUrl: './profil-personne-page.component.html',
  styleUrls: ['./profil-personne-page.component.css']
})
export class ProfilPersonnePageComponent implements OnInit {

  musicien: Musicien = {
    id: null,
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    description: '',
    style: '',
    photo: '',
    codePostal: undefined,
    age: undefined
  };

  constructor(private musicienService: MusicienService) { }

  ngOnInit() {
    this.musicienService.getOneMusicien().subscribe(
      (data) => {
        this.musicien = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // user: any = {
  //   "id": 4,
  //   "name": "Kendrick Lamar",
  //   "distance": "3 km",
  //   "slogan": "Rap, trap, be humble",
  //   "intro": "Table de mixage, chant et scratch",
  //   "message": "J'ai un flow de ouf malade, je pose des impors sur des intrus ghetto, certaines que je produis moi-même. Jkendfe cherche des beat-makers chevronnés pour faire des collabs. Musicalement,\nKendrick",
  //   "photoUrl": "./assets/img/kendrick.png"
  //   }
}
