import { Component, Input, OnInit } from '@angular/core';
import { MusicienService } from '../Services/musicien.service';

@Component({
  selector: 'app-profil-personne-page',
  templateUrl: './profil-personne-page.component.html',
  styleUrls: ['./profil-personne-page.component.css']
})
export class ProfilPersonnePageComponent /*implements OnInit*/ {


  //  musiciens: any [] = []; // Remplacez "any[]" par le type approprié pour vos profils de musiciens

  //  constructor(private musicienService: MusicienService) { }

  //  ngOnInit() {
  //    this.musicienService.getAllMusiciens().subscribe(
  //      (data) => {
  //        this.musiciens = data;
  //      },
  //      (error) => {
  //        console.log(error);
  //      }
  //    );
  //  }

  user: any = {
    "id": 4,
    "name": "Kendrick Lamar",
    "distance": "3 km",
    "slogan": "Rap, trap, be humble",
    "intro": "Table de mixage, chant et scratch",
    "message": "J'ai un flow de ouf malade, je pose des impors sur des intrus ghetto, certaines que je produis moi-même. Jkendfe cherche des beat-makers chevronnés pour faire des collabs. Musicalement,\nKendrick",
    "photoUrl": "./assets/img/kendrick.png"
    }
}
