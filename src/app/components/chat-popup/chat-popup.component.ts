import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss'],
})
export class ChatPopupComponent {
  showChat: boolean = false;
  userCurrent: any = {};
  userConnected: any = {};

  chats: any[] = [];
  currentChat: any = {};

  chatObserver!: Subscription;
  notReadObserver!: Subscription;
  userUpdateObserver!: Subscription;
  historyMessagesObserver!: Subscription;

  constructor(
    // public service: ApiService,
    public tools: ToolsService,
    private websocketService: WebsocketService // private dialog: Dialog, // private messageService: MessageService
  ) {
    // service.path = 'v1/tickets';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    this.userConnected = {
      name: this.userCurrent.name,
      token: this.userCurrent.id,
      type: 'user',
      avatar: this.userCurrent.avatar_url,
    };

    this.websocketService.init(this.userCurrent);
    this.startObservers();

    this.websocketService.connected({
      ...this.userConnected,
      status: 'online',
    });

    this.getChats();
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
        this.chats = chats;
        // this.chats = chats.filter((c: any) => c.status == 'online');
      });

    this.notReadObserver = this.websocketService
      .notRead()
      .subscribe((notRead) => {
        console.log('notRead', notRead);
      });

    this.userUpdateObserver = this.websocketService
      .userUpdate()
      .subscribe((userUpdate) => {
        console.log('userUpdate', userUpdate);
      });

    this.historyMessagesObserver = this.websocketService
      .historyMessages()
      .subscribe((historyMessages) => {
        console.log('historyMessages', historyMessages);
        this.currentChat.messages = historyMessages;
      });
  }

  setCurrentChat(chat: any) {
    this.currentChat = { ...chat, messages: [] };
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
    this.getHistoryChat();
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }
}
