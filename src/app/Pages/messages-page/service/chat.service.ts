import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable, Subject, map, share } from 'rxjs';
import Conversation from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly apiUrl = 'http://localhost:8080/conversationChat';

  notify: Observable<any> = new Subject();
  newMessage: Observable<any> = new Subject();

  constructor(private stomp: RxStomp, private http: HttpClient) {
    // ecoute les messages  
    // correspond à @SendTo("/topic/messages") du back
      this.newMessage = stomp.watch('/topic/messages')
      .pipe(
        map(message => JSON.parse(message.body)),
        share({ resetOnRefCountZero: true })
      )
  }

  /**
  * envoie un message privé
  * avec en parametre l'id du receveur
  * afin de mettre à jour le socket sur les clients front
   * @param message 
   */
  public sendMessage(message: any) {
    console.log("musicien2 : " + message.musicien2_id);
    this.stomp.publish({
      // correspond à @MessageMapping("/send-message") du back
      destination: `/app/private-message`,
      //      destination: `/app/send-message`,
      body: JSON.stringify(message),
      headers: { 'content-type': 'application/json' }
    });
  }


  /**
   * ecoute les messages envoyés en privé
   * @param user1_id 
   * @returns 
   */

  
  public subscribeToTopic(musicien1_id: string) {
    return this.stomp.watch(`/topic/private/${musicien1_id}`);
  }

  
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }
}

