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
  cheminPhotos: String = "./assets/img/";

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
   */
  getListConversationById() {
    if(this.musicien.id){
      this.conversationService.getListConversationById(this.musicien.id).subscribe({
        next: (conversationDto) => {
          this.messages = conversationDto;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        }
      });
    }
  }
}