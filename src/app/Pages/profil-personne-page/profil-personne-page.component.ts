import { Component, Input, OnInit } from '@angular/core';
import Musicien from '../model/musicien.model';
import { MusicienService } from '../Services/musicien.service';
import { ProfilNavigationService } from "src/app/Pages/messages-page/service/profil-navigation.service";
import { ActivatedRoute, Params } from '@angular/router';


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
    private profilNavigationService: ProfilNavigationService,
    private route: ActivatedRoute) { }

  /*
    On souscrit à l'observable de musicien.service.ts
    Pour faire passer la data du back dans les attributs 'musicien'
  */
  ngOnInit() {
    // Vérifiez si un ID de musicien est passé en paramètre d'URL
    this.route.params.subscribe((params: Params) => {
      const musicienId = params['id'];

      if (musicienId) {
        this.getMusicienById(musicienId);
      } else {
        this.getRandomMusicien();
      }
    });
  }

  getRandomMusicien(): void {
    this.musicienService.getRandomMusicien().subscribe(
      (data) => {
        this.musicien = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMusicienById(id: number): void {
    this.musicienService.getMusicienById(id).subscribe(
      (data) => {
        this.musicien = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
