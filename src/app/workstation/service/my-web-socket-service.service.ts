import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebsocketService } from './websocket/websocket.service';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';

import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from '../constants/base-url-constants';


// const config: SocketIoConfig = {
// 	url: 'localhost:8083/ws-notification', // socket server url;
// 	options: {
// 		transports: ['websocket']
// 	}
// }


@Injectable({
  providedIn: 'root'
})
export class MyWebSocketServiceService {


  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  stompClient: any;

  private websocketSubject = new Subject<any>();

  constructor(private notificationService : WebsocketService,
    ) { }

subject = webSocket('ws://localhost:8083/ws-notification');


  private socket$: WebSocketSubject<string>;

    connect(): void {

      console.log("MyWebSocketServiceService:connect Initialize WebSocket Connection with notificatiom service");
      this.socket$ = new WebSocketSubject(WEBSOCKET_ENDPOINT);
      console.log('webSocket Connection url .....');
      this.socket$.next(JSON.stringify({ type: 'user-notification', data: {"Mbaye": "SENE" } }));

      this.stompClient = Stomp.over(this.socket$);
      const _this = this;
      _this.stompClient.connect({}, function(frame) {
        console.log('Inside stompClient connect :');
          _this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, function(sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
      }, this.errorCallBack);

  }

  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }


  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
   // Emits the event.
    this.notificationService.notificationMessage.emit(JSON.parse(message.body));
  }

     // on error, schedule a reconnection attempt
     errorCallBack(error) {
      console.log('INSIDE CALLBACK METHOD FOR STOMP');

      console.log('errorCallBack -> ' + error);

      setTimeout(() => {
          this.connect();
      }, 5000);
  }
  }

  
