import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { ConversationService } from './service/conversation.service';
import { Router } from '@angular/router';
import Musicien from 'src/app/authentification/model/musicien.model';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit {
  messages: any[] = []; // liste des messages récupérés du back : id + nom
  musicien!: Musicien;
  // cheminPhotos: string = "./assets/img/avatars/";

  // creation du nom de cookie par rapport au port du localhost de l'application utilisé
  cookieId: string;

  constructor(
    private authService: AuthService,
    private conversationService: ConversationService,
    private router: Router
  ) {
    const port = window.location.port;  // recupere le port du localhost
    this.cookieId = `id_${port}`;       // nomme la variable cookieId en id_42xx
  }


  ngOnInit() {
    // verifie si l'utilisateur est connecté
    // sinon redirige en page d'accoueil
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    } else {
      // met a jour les infos de musicien
      this.authService.autoLogin();
      // recupere le contenu de musicien
      this.authService.getMusicien().subscribe((musicien) => {
        if (musicien) {
          this.musicien = musicien;
        }
      });
      // met a jour la liste des discussions
      this.getListConversationById();
    }
  }

  /**
   * recupere la liste de toutes les conversations avec tous les autres utilisateurs
   * compactée par le back en userName avec l'id
   * calcule le tempsRestant pour remplir le champs dans les messages
   */
  getListConversationById() {
    if (this.musicien.id) {
      this.conversationService.getListConversationById(this.musicien.id).subscribe({
        next: (conversationDto) => {
          this.messages = conversationDto;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // met à jour le temps depuis le dernier message
          this.messages.forEach(message => {
            const targetDate = new Date(message.date); // Convertir la chaîne de caractères en objet Date pour effectuer le calcul qui suit
            message.tempsDepuis = this.calculateTimeDifference(targetDate);
          });
        }
      });
    }
  }

  /**
   * methode qui permet de renvoyer la difference entre deux dates
   */
  calculateTimeDifference(targetDate: Date): string {
    const currentDate = new Date(); // Obtenir la date et l'heure actuelles

    const timeDifference = targetDate.getTime() - currentDate.getTime(); // Calculer la différence en millisecondes

    const years = -(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365))); // Calculer le nombre d'années 
    const mounths = -(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 31))); // Calculer le nombre de mois 
    const weeks = -(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7))); // Calculer le nombre de semaine
    const days = -(Math.floor(timeDifference / (1000 * 60 * 60 * 24))); // Calculer le nombre de jours
    const hours = -(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))); // Calculer le nombre d'heures
    const minutes = -(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))); // Calculer le nombre de minutes
    const seconds = -(Math.floor((timeDifference % (1000 * 60)) / 1000)); // Calculer le nombre de secondes

    // preparation de l'affichage
    // si > 1 jour => on affiche le nombre de jours ... pour les suivants
    if (years > 1){
      return years === 1 ? years + " an" : years + " ans";
    } else if (mounths > 1) {
      return mounths + " mois";
    } else if (weeks > 1) {
      return weeks === 1 ? weeks + " semaine" : weeks + " semaines";
    } else if (days > 1){
      return days === 1 ? days + " jour" : days + " jours";
    } else if (hours > 1) {
      return hours === 1 ? hours + " heure" : hours + " heures";
    } else if (minutes > 1) {
      return minutes === 1 ? minutes + " minute" : minutes + " minutes";
    } else {
      return seconds === 1 ? seconds + " seconde" : seconds + " secondes";
    }
  }

}