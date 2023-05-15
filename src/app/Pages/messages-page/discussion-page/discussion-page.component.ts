import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent {

  messages: string[] = [];
  newMessage!: string;

  constructor(public chatService: ChatService) {}

  sendMessage() {
    this.chatService.addMessage(this.newMessage);
    this.newMessage = '';
  }

}
