import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: Socket;

  constructor() {}

  init(user: any) {
    this.socket = io(environment.url_websocket, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      query: {
        token: user.id,
        type: user?.type == 'support' ? user.type : 'user',
      },
    });

    this.socket.open();
  }

  checkUsers(usersCount?: any) {
    // {
    //   totalUsersInApp: 2,
    //   type: 'support',
    // }
    return this.socket.emit('check-users', usersCount);
  }

  haveToSync() {
    return new Observable((observer) => {
      this.socket.on('have-to-sync', (data: string) => {
        observer.next(data);
      });
    });
  }

  syncUsers(users: any[]) {
    return this.socket.emit('sync-users', {
      users,
    });
  }

  connected(user: any) {
    return this.socket.emit('connected', user);
  }

  userUpdate() {
    return new Observable((observer) => {
      this.socket.on('user-update', (data: string) => {
        observer.next(data);
      });
    });
  }

  disconnected(user: any) {
    return this.socket.emit('disconnected', {
      name: user?.name,
      token: 1,
      avatar: user?.avatar,
      status: 'offline',
      type: 'support',
    });
  }

  join(data: any) {
    return this.socket.emit('join', data);
  }

  chats() {
    return new Observable((observer) => {
      this.socket.on('joined', (data: string) => {
        observer.next(data);
      });
    });
  }

  notRead() {
    return new Observable((observer) => {
      this.socket.on('not-read', (data: string) => {
        observer.next(data);
      });
    });
  }

  getHistoryMessages(sender: any, receiver: any) {
    return this.socket.emit('history-messages', {
      sender,
      receiver,
    });
  }

  historyMessages() {
    return new Observable((observer) => {
      this.socket.on('send-message', (data: string) => {
        observer.next(data);
      });
    });
  }

  sendMessage(sender: any, receiver: any, message: string) {
    return this.socket.emit('chat-message', {
      sender,
      receiver,
      message,
    });
  }

  readMessage(sender: any, receiver: any) {
    return this.socket.emit('read-message', {
      sender,
      receiver,
    });
  }
}
