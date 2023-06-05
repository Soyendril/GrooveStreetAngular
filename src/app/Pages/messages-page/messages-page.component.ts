import { Component, OnInit } from '@angular/core';
import { MusicienService } from 'src/app/authentification/services/musicien.service';
import { ConversationService } from './service/conversation.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit {
  messages: any[] = []; // liste des messages récupérés du back : id + nom
  musicienId!: string;

  // creation du nom de cookie par rapport au port du localhost de l'application utilisé
  cookieId: string;

  constructor(
    private musicienService: MusicienService,
    private conversationService: ConversationService
  ) {
    const port = window.location.port;  // recupere le port du localhost
    this.cookieId = `id_${port}`;       // nomme la variable cookieId en id_42xx
  }


  ngOnInit() {
    // met a jour la liste des discussions
    this.getListConversationById();
    this.musicienId = this.musicienService.getCookie(this.cookieId);
  }

  /**
   * recupere la liste de toutes les conversations avec tous les autres utilisateurs
   * compactée par le back en userName avec l'id
   */
  getListConversationById() {
    this.conversationService.getListConversationById(this.musicienService.getCookie(this.cookieId)).subscribe({
      next: (conversationDto) => {
        this.messages = conversationDto;
      },
      error: (error) => {
        // Gére les erreurs
        console.log(error);
      },
      complete: () => {
        // actions supplémentaires après la récupération des messages
      }
    });
  }
}