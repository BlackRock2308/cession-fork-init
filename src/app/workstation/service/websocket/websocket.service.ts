import { EventEmitter, Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { webSocket } from 'rxjs/webSocket';
import { AppComponent } from 'src/app/app.component';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';



const headers = new HttpHeaders().set('username', 'john.smith').set('password', 'abc123');

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

    notificationMessage = new EventEmitter();

    private socket$: WebSocketSubject<string>;

    webSocketEndPoint: string = 'http://localhost:8092/messaging';
    topic: string = "/topic/notif";
    stompClient: any;



    _connect(username : any , password: any) {
       
        console.log("Initialize WebSocket Connection");


        this.socket$ = new WebSocketSubject('ws://localhost:8092/ws?username=' + username + "=" + 'password=' + password);

        this.socket$.next(JSON.stringify({ type: 'user-info', data: {username, password} }));

        console.log("My websocet data : {}", username)


        this.socket$.subscribe(
            

        (message) => console.log('Next:', message),
        
        (error) => console.log('Error:', error),
        () => console.log('Completed')
        );




    };

    _disconnect(username : any ) {

        console.log("logging out ...... ");

        this.socket$ = new WebSocketSubject('ws://localhost:8092/ws?username=' + username );

        this.socket$.next(JSON.stringify({ type: 'user-info', data: {username} }));

        console.log("My websocet user for logging out : {}", username)


        this.socket$.subscribe(
            
        (message) => console.log('Next:', message),
        
        (error) => console.log('Error:', error),
        () => console.log('Completed')
        );

    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect(error, error);
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket");
        this.socket$.next(JSON.stringify({ type: 'user-info', data: message }));
        this.stompClient.send("username", {}, JSON.stringify(message));
    }

    // onMessageReceived(message) {
    //     console.log("Message Recieved from Server :: " + message);
    //     this.appComponent.handleMessage(JSON.stringify(message.body));
    // }
}
