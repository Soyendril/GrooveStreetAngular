import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Conversation from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private readonly apiUrl = 'http://localhost:8080/conversations';
  
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns Liste de toutes les conversations
   */
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  /**
   * 
   * @param conversationId 
   * @returns conversations uniquement pour l'utilisateur en cours
   */
  getConversationsById(conversationId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${conversationId}`;
    return this.http.get<any[]>(url);
  }

  /**
   * 
   * @param conversationId 
   * @returns liste des conversations pour l'utilisateur en cours triées par users2
   */

  getListConversationById(conversationId: string): Observable<Conversation[]> {
    const url = `${this.apiUrl}/${conversationId}`;
    return this.http.get<Conversation[]>(url);
  }
  
  getConversationsByIdUnique(conversation1Id: string, conversation2Id: string): Observable<Conversation[]> {
    const url = `${this.apiUrl}/unique/${conversation1Id}?id2=${conversation2Id}`;
    return this.http.get<Conversation[]>(url);
  }
  


  addConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(this.apiUrl, conversation);
  }

  updateConversation(conversation: Conversation): Observable<Conversation> {
    const url = `${this.apiUrl}/${conversation.id}`;
    return this.http.put<Conversation>(url, conversation);
  }

  deleteConversation(conversationId: number | null): Observable<unknown> {
    const url = `${this.apiUrl}/${conversationId}`;
    return this.http.delete(url);
  }
  
}
