import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message';
import { MessageEstruct } from 'src/app/models/message.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit,OnDestroy {
  messageInput: string = '';
  userId: string = '';
  messageList: MessageEstruct[] = [];

  private wsSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.wsSubscription = this.chatService.connect()
      .subscribe((data: string) => {
        console.log(data);
        const [idUser, message] = data.split('|');
        const chatMessage: MessageEstruct = { idUser, message };
        this.messageList.push(chatMessage);
      });
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }

  sendMessage(): void {
    if (this.messageInput) {
      const chatMessage: MessageEstruct = { idUser: this.userId, message: this.messageInput };
      const messageString = `${chatMessage.idUser}|${chatMessage.message}`;
      this.chatService.connect().next(messageString);
      this.messageInput = '';
    }
  }

}
