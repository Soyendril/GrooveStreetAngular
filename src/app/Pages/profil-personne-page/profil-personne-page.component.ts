import { Component, OnInit } from '@angular/core';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../Services/musicien.service';
import { MusicienCommunicationService } from 'src/app/Pages/Services/musicien-communication.service';


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
    codePostal: '',
    age: undefined
  };

  constructor(private _musicienService: MusicienService,
    private musicienCommunicationService: MusicienCommunicationService) { }

  /*
    On souscrit à l'observable de musicien.service.ts
    Pour faire passer la data du back dans les attributs 'musicien'
  */
  ngOnInit() {
    this.updateMusicien();
    this.musicienCommunicationService.getNextMusicien$.subscribe((musicien) => {
      this.musicien = musicien;
    });
  }

  updateMusicien() {
    this.musicienService.getRandomMusicien().subscribe(
      (data) => {
        this.musicien = data;
        // Réinitialiser les indicateurs musiciensEpuises$ et profilConsulted$
        this.musicienService.musiciensEpuises$.next(false);
        this.musicienService.profilConsulted$.next(false);
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
