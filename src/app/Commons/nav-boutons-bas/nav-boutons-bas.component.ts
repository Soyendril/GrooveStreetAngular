import { Component, Output, EventEmitter } from '@angular/core';
import { MusicienService } from 'src/app/Pages/Services/musicien.service';
import Musicien from 'src/app/authentification/model/musicien.model';
import { MusicienCommunicationService } from 'src/app/Pages/Services/musicien-communication.service';
import { AuthService } from 'src/app/authentification/services/auth.service';


@Component({
  selector: 'app-nav-boutons-bas',
  templateUrl: './nav-boutons-bas.component.html',
  styleUrls: ['./nav-boutons-bas.component.css']
})
export class NavBoutonsBasComponent {

  // @Output() musicienUpdated = new EventEmitter();


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

  // Array des images dispos pour les boutons
  imageUrl: any[] = [
    {
      "switch": "./assets/img/switch.png",
      "superlike": "./assets/img/superlike.png",
      "like": "./assets/img/like.png"
    }
  ]

  musicienActuel: Musicien | null = null;
  isAuthenticated: boolean = false;


  constructor(
    private _musicienService: MusicienService,
    private musicienCommunicationService: MusicienCommunicationService,
    private authService: AuthService,
  ) {   }


  getNextMusicien() {
    this._musicienService.switchRandomMusicien().subscribe(
      (data) => {
        this.musicien = data;
        this.musicienCommunicationService.getNextMusicien(this.musicien); // Émet l'événement
        this.musicienService.profilConsulted$.next(false);
        this.musicienService.musiciensEpuises$.next(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  likeMusicien() {
    this.musicienService.likeMusicien().subscribe(
      (data) => {
        this.musicienService.getMusicienActuel().subscribe(
          (musicien) => {
            this.musicienActuel = musicien;
            const isUserLiked = this.musicienService.isUserLiked();
            if (isUserLiked) {
              console.log("C'est un match avec "+ this.musicienActuel.nom);
            } else {
              console.log(this.musicienActuel.nom + " ne t'a pas liké");
              this.getNextMusicien();
            }
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get musicienService(): MusicienService {
    return this._musicienService;
  }
}
