import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConversationService } from '../service/conversation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/authentification/services/auth.service';
import { ChatService } from '../service/chat.service';
import { DatePipe } from '@angular/common';
import Musicien from 'src/app/authentification/model/musicien.model';


@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent implements OnDestroy, OnInit {
  currentDate = new Date();
  formattedDateTime = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');

  form = new FormGroup({
    'musicien1_id': new FormControl(""),
    'musicien2_id': new FormControl(""),
    'message': new FormControl(),
    'date': new FormControl()
  })

  messages: any[] = [];
  lastUserMessage: any = '';
  musicien!: Musicien;

  // creation du nom de cookie par rapport au port du localhost de l'application utilisée
  cookieId: string;

  @Input()
  musicien2_id: string = '';
  private disconnect$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public conversationService: ConversationService,
    private authService: AuthService,
    private chatservice: ChatService,
    private datePipe: DatePipe) {
    this.connect();
    const port = window.location.port;  // recupere le port du localhost
    this.cookieId = `id_${port}`;       // nomme la variable cookieId en id_42xx
  }

  ngOnInit() {
    // verifie si l'utilisateur est connecté
    // sinon redirige en page d'accoueil
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      // met a jour les infos de musicien
      this.authService.autoLogin();
      // recupere le contenu de musicien
      this.authService.getMusicien().subscribe((musicien) => {
        if (musicien) {
          this.musicien = musicien;
        }
      });
      // On récupère la partie 'type' de l'URL
      // renvoi 0 si pas de valeur
      const musicien2_id = this.route.snapshot.paramMap.get('musicien2_id') || '0';

      /**
       * se connecte au service,
       * envoi les messages et les recupere
       * 
       * A faire => gestion de l'id
       */
      if(this.musicien.id){
        this.chatservice.subscribeToTopic(this.musicien.id).subscribe((message) => {
          const parsedMessage = JSON.parse(message.body); // Conversion de la chaîne JSON en objet JavaScript
          this.messages.push(parsedMessage.message); // Ajout de l'objet dans le tableau messages - recupere uniquement le message
        });
      }
      

      // met a jour le formulaire avec les bonnes id
      this.ajoutFormId(musicien2_id);

      // Recupere les messages de la Bdd relatifs à la conversation : user1 et user2
      this.getMessageConversation(musicien2_id);
    }
  }


  connect() {
    this.chatservice.notify
      .pipe(takeUntil(this.disconnect$))
      .subscribe((msg: any) => {
        this.messages.push(msg);
      })

    this.chatservice.newMessage
      .pipe(takeUntil(this.disconnect$))
      .subscribe((msg: any) => {
        this.lastUserMessage = msg;
      })
    console.log("Connexion");
  }

  disconnect() {
    this.disconnect$.next(true);
    console.log("Deconnexion");
  }

  /**
   * Recupere la date du jour formatée pour le sql
   * Envoi le message en Bdd
   * Envoi la notification de maj du front
   */
  sendMessage() {
    this.majDateForm();

    this.chatservice.sendMessage(this.form.value);
    this.form.patchValue({
      message: ''
    });
  }

  /**
   * deconnecte le chat à sortie du composant
   */
  ngOnDestroy() {
    this.disconnect();
  }


  /**
   * Maj la date du formulaire
   */

  majDateForm() {
    this.form.patchValue({
      date: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss')
    });
  }

  /**
   * recupere en get les conversations depuis la bdd;
   */

  private getMessageConversation(musicien2_id: string): void {
    if(this.musicien.id){
      this.conversationService.getConversationsByIdUnique(this.musicien.id, musicien2_id)
      .pipe(
        map(conversations => conversations.map(conversation => conversation.message))
      )
      .subscribe(messages => this.messages = messages);
    }
  }

  /**
   * ajoute les id utilisateur et receveur au formulaire
   */
  
  ajoutFormId(musicien2_id: string): void {
    this.form.patchValue({
      'musicien1_id': this.authService.getCookie(this.cookieId),
      'musicien2_id': musicien2_id
    });
  }
}