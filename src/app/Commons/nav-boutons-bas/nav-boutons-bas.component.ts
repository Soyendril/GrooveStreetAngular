import { Component } from '@angular/core';
import { ProfilNavigationService } from "src/app/Pages/messages-page/service/profil-navigation.service";

@Component({
  selector: 'app-nav-boutons-bas',
  templateUrl: './nav-boutons-bas.component.html',
  styleUrls: ['./nav-boutons-bas.component.css']
})
export class NavBoutonsBasComponent {

  // Array des images dispos pour les boutons
  imageUrl: any[] = [
    {
      "switch": "./assets/img/switch.png",
      "superlike": "./assets/img/superlike.png",
      "like": "./assets/img/like.png"
    }
  ]
  constructor(public profilNavigationService: ProfilNavigationService) { }

  navigateToRandomMusicien(): void {
    this.profilNavigationService.navigateToRandomMusicien();
  }
}
