import { Component, Input, OnInit } from '@angular/core';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../Services/musicien.service';
import { MusicienCommunicationService } from '../Services/musicien-communication.service';

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

  constructor(private musicienService: MusicienService,
    private musicienCommunicationService: MusicienCommunicationService) { }

  /*
    On souscrit à l'observable de musicien.service.ts
    Pour faire passer la data du back dans les attributs 'musicien'
  */
  ngOnInit() {
    this.updateMusicien();
    this.musicienCommunicationService.getNextMusicien$.subscribe(() => {
      this.updateMusicien();
    });
  }

  updateMusicien() {
    this.musicienService.getRandomMusicien().subscribe(
      (data) => {
        this.musicien = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
