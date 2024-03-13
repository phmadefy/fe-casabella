import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
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
  currentChat: any = {};

  loading = false;

  userCurrent: any = {};

  chatObserver!: Subscription;
  haveToSyncObserver!: Subscription;
  notReadObserver!: Subscription;
  userUpdateObserver!: Subscription;

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

    //conecta o usuario
    const userConnected = this.allUsers.find(
      (u: any) => u.token == this.userCurrent.id
    );
    if (userConnected) {
      this.websocketService.connected({
        ...userConnected,
        status: 'online',
      });
    }

    this.getChats();
  }

  startObservers() {
    this.chatObserver = this.websocketService
      .chats()
      .subscribe((chats: any) => {
        console.log('chats', chats);
        this.chats = chats;
      });

    this.haveToSyncObserver = this.websocketService
      .haveToSync()
      .subscribe((haveToSync) => {
        console.log('haveToSync', haveToSync);
        this.websocketService.syncUsers(this.allUsers);
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
          totalUsersInApp: res.length,
          // type: 'support',
        });
      })
      .finally(() => (this.loading = false));
  }

  getChats() {
    this.websocketService.join();
  }
}
