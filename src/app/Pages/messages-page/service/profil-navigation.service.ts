import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MusicienService } from 'src/app/Pages/Services/musicien.service'


@Injectable({
  providedIn: 'root'
})
export class ProfilNavigationService {

  constructor(private router: Router, private musicienService: MusicienService) { }

  navigateToRandomMusicien(): void {
    this.musicienService.getRandomMusicien().subscribe(
      (data) => {
        // Obtenir l'ID du nouveau musicien
        const newMusicienId = data.id;

        // Naviguer vers le profil du nouveau musicien
        this.router.navigate(['/profil', newMusicienId]);
      },
      (error) => {
        console.log(error);
      }
    );
  }}
