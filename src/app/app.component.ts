import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  messageText: string;
  messages: Array<any>;
  socket: SocketIOClient.Socket;

  messagePsalguero : any;

  constructor() {
    this.socket = io.connect("http://localhost:8000");
  }

  ngOnInit() {
    this.messages = new Array();

    this.socket.on('message-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    });

    this.socket.emit('event1', {
      msg: 'Evento1: Enviando mensaje desde el cliente'
    });

    this.socket.on('event2', (data: any) => {
      console.log(data.msg);
      this.socket.emit('event3', {
        msg: 'Evento3: Yes, its working for me!!'
      });
    });

    this.socket.on('event4', (data: any) => {
      console.log(data.msg);
    });

    this.socket.on('psalguero', (data) => {
      this.messagePsalguero = data;
    })
  }

  sendMessage() {
    const message = {
      text: this.messageText
    };
    this.socket.emit('send-message', message);
    // console.log(message.text);
    this.messageText = '';
  }

  public emmitMessage( message:string ) {
    console.log( message )
    this.socket.emit('psalguero', {
      message : message,
      date: new Date()
    })
  }

}
