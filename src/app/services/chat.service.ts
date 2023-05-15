import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: string[] = [];

  constructor() { }

  addMessage(message: string) {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }

  getMessage(index: number): string {
    return this.messages[index];
  }

}
