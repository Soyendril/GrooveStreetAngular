import { Component, Output, EventEmitter } from '@angular/core';
import { MusicienService } from 'src/app/Pages/Services/musicien.service';
import Musicien from 'src/app/authentification/model/musicien.model';
import { MusicienCommunicationService } from 'src/app/Pages/Services/musicien-communication.service';

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

  constructor(private _musicienService: MusicienService,
    private musicienCommunicationService: MusicienCommunicationService) {  }


  getNextMusicien() {
    this._musicienService.switchRandomMusicien().subscribe(
      (data) => {
        this.musicien = data;
        console.log(this.musicien);
        this.musicienCommunicationService.getNextMusicien(this.musicien); // Émet l'événement
        this.musicienService.profilConsulted$.next(false);
        this.musicienService.musiciensEpuises$.next(false);
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
