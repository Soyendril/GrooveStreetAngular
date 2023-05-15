import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profil-personne-page',
  templateUrl: './profil-personne-page.component.html',
  styleUrls: ['./profil-personne-page.component.css']
})
export class ProfilPersonnePageComponent {
  user: any = {
    "id": 1,
    "name": "Kendrick Lamar",
    "distance": "3 km",
    "slogan": "Rap, trap, be humble",
    "intro": "Table de mixage, chant et scratch",
    "message": "J'ai un flow de ouf malade, je pose des impors sur des intrus ghetto, certaines que je produis moi-même. je cherche des beat-makers chevronnés pour faire des collabs. Musicalement,\nKendrick",
    "photoUrl": "./assets/img/kendrick.png"
    }
}
