import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private subject: Subject<string>;

  constructor() {}

  public connect(): Subject<string> {
    if (!this.subject) {
      this.subject = this.create('ws://localhost:8080/room');
    }
    return this.subject;
  }

  private create(url: string): Subject<string> {
    const ws = new WebSocket(url);

    const observable = new Observable<string>(observer => {
      ws.onmessage = (event) => observer.next(event.data);
      ws.onerror = (error) => observer.error(error);
      ws.onclose = () => observer.complete();
      return () => ws.close();
    });

    const observer = {
      next: (data: string) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
