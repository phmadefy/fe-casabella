import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    SpinnerComponent,
  ],
  providers: [ApiService],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  chats: any[] = [];
  allChats: any[] = [];
  chatsNotRead: any[] = [];

  currentChat: any = {};

  loading = false;

  userCurrent: any = {};
  userConnected: any = {};

  chatObserver!: Subscription;
  haveToSyncObserver!: Subscription;
  notReadObserver!: Subscription;
  userUpdateObserver!: Subscription;
  historyMessagesObserver!: Subscription;

  allUsers: any[] = [];

  constructor(
    public service: ApiService,
    public tools: ToolsService,
    private websocketService: WebsocketService // private dialog: Dialog, // private messageService: MessageService
  ) {
    // service.path = 'v1/tickets';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.websocketService.init(this.userCurrent);
    this.startObservers();
    // this.getChats();

    await this.getAllUsers();
  }

  async getAllUsers() {
    this.loading = true;
    await this.service
      .getCustom('v1/admin/users-for-chats')
      .then((res: any[]) => {
        console.log('getAllUsers', res);
        this.allUsers = res.map((u: any) => {
          return {
            name: u.name,
            token: u.id,
            type: u?.type == 'support' ? u.type : 'user',
            avatar: u.avatar_url,
          };
        });

        this.websocketService.checkUsers({
          totalUsersInApp: this.allUsers.filter(
            (u: any) => u?.type == 'support'
          ).length,
          type: 'support',
        });

        //conecta o usuario
        this.userConnected = this.allUsers.find(
          (u: any) => u.token == this.userCurrent.id
        );
        if (this.userConnected) {
          this.websocketService.connected({
            ...this.userConnected,
            status: 'online',
          });
          this.getChats();
        }
      })
      .finally(() => (this.loading = false));
  }

  getChats() {
    this.websocketService.join({
      token: this.userConnected.token,
      type: this.userConnected.type,
    });
  }

  startObservers() {
    this.chatObserver = this.websocketService
      .chats()
      .subscribe((chats: any) => {
        console.log('chats', chats);
        this.allChats = chats;
        this.chats = chats.filter((c: any) => c.last_message_text);
      });

    this.haveToSyncObserver = this.websocketService
      .haveToSync()
      .subscribe((haveToSync) => {
        console.log('haveToSync', haveToSync);
        this.websocketService.syncUsers(
          this.allUsers.filter((u: any) => u?.type == 'support')
        );
      });

    this.notReadObserver = this.websocketService
      .notRead()
      .subscribe((notRead: any) => {
        console.log('notRead', notRead);
        this.chatsNotRead = this.chatsNotRead.concat(notRead);
        if (this.currentChat?.token) {
          const msgByUser = this.chatsNotRead.filter(
            (c: any) =>
              c.receiver == this.currentChat.token ||
              c.sender == this.currentChat.token
          );
          if (msgByUser.length > 0) {
            this.currentChat.messages =
              this.currentChat.messages.concat(msgByUser);
            this.clearMsgNotRead();
            setTimeout(() => {
              this.toBottomContentChat();
            }, 200);
          }

          if (notRead.length > msgByUser.length) {
            this.tools.playNotification();
          }
        } else if (notRead.length > 0) {
          this.tools.playNotification();
        }
      });

    this.userUpdateObserver = this.websocketService
      .userUpdate()
      .subscribe((userUpdate: any) => {
        console.log('userUpdate', userUpdate);
        const findIndex = this.chats.findIndex(
          (c: any) => c.token == userUpdate.token
        );
        if (findIndex >= 0) {
          const chat = this.chats[findIndex];
          const updateData = {
            ...chat,
            status: userUpdate.status,
            avatar: userUpdate.avatar,
          };

          this.chats[findIndex] = updateData;
        }
      });

    this.historyMessagesObserver = this.websocketService
      .historyMessages()
      .subscribe((historyMessages) => {
        console.log('historyMessages', historyMessages);
        this.currentChat.messages = historyMessages;
        setTimeout(() => {
          this.toBottomContentChat();
        }, 300);
      });
  }

  setCurrentChat(chat: any) {
    this.currentChat = { ...chat, token: parseInt(chat.token), messages: [] };
    this.clearMsgNotRead();
    this.getHistoryChat();
  }

  getHistoryChat() {
    this.websocketService.getHistoryMessages(
      this.userConnected.token,
      this.currentChat.token
    );
  }

  sendMessage(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.websocketService.sendMessage(
      this.userConnected.token,
      this.currentChat.token,
      form.controls['message'].value
    );

    form.resetForm();
    setTimeout(() => {
      this.getHistoryChat();
    }, 400);
  }

  getLastMassage(item: any) {
    const msgs: any[] = this.chatsNotRead.filter(
      (c: any) => c.sender == item.token
    );

    if (msgs.length > 0) {
      return msgs[msgs.length - 1].message;
    }

    return item.last_message_text;
  }

  checkMsgNotRead(item: any) {
    const msgs: any[] = this.chatsNotRead.filter(
      (c: any) => c.sender == item.token
    );

    if (msgs.length > 0) {
      return true;
    }

    return false;
  }

  clearMsgNotRead() {
    this.websocketService.readMessage(
      this.currentChat.token,
      this.userConnected.token
    );

    this.chatsNotRead = this.chatsNotRead.filter(
      (c: any) =>
        c.sender != this.currentChat.token &&
        c.receiver != this.userConnected.token
    );
  }

  toBottomContentChat() {
    const contentChat = document.getElementById('content-chat');
    if (contentChat) {
      const scrollHeight = contentChat.scrollHeight;
      contentChat.scrollTo({
        top: scrollHeight,
        behavior: 'instant',
      });
    }
  }
}
