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
    return this.socket.emit('connected', {
      name: user?.name,
      token: 1,
      avatar: user?.avatar,
      status: 'online',
      type: 'support',
    });
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

  join() {
    return this.socket.emit('join', {
      token: 1,
      type: 'support',
    });
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
}
