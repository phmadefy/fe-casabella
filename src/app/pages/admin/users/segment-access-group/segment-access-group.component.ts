import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AlertConfirmComponent } from 'src/app/shared/alert-confirm/alert-confirm.component';

@Component({
  selector: 'app-segment-access-group',
  standalone: true,
  templateUrl: './segment-access-group.component.html',
  styleUrls: ['./segment-access-group.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
    CardComponent,
    DropdownCbComponent,
    DialogModule,
  ],
  providers: [ApiService],
})
export class SegmentAccessGroupComponent {
  segment: any = { data: [] };
  loadingSegment = false;
  accessGroup: any = { data: [] };
  loadingAccessGroup = false;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDados();
  }

  async getSegment() {
    this.loadingSegment = true;
    await this.service
      .getSegments()
      .then((res: any) => {
        console.log('getSegment', res);
        this.segment = res;
      })
      .finally(() => (this.loadingSegment = false));
  }

  async getAccessGroup() {
    this.loadingAccessGroup = true;
    await this.service
      .getAccessGroups()
      .then((res: any) => {
        console.log('getAccessGroup', res);
        this.accessGroup = res;
      })
      .finally(() => (this.loadingAccessGroup = false));
  }

  async getDados() {
    this.getSegment();
    this.getAccessGroup();
  }

  submit(form: NgForm, formName: string) {
    if (!form.valid) {
      return;
    }

    if (formName == 'segment') {
      this.saveSegment(form.value).then(() => form.reset());
    } else {
      this.saveAccessGroup(form.value).then(() => form.reset());
    }
  }

  async saveSegment(data: any) {
    this.loadingSegment = true;
    await this.service
      .postCustom('v1/segments', data)
      .then(async () => {
        await this.getSegment();
      })
      .finally(() => (this.loadingSegment = false));
  }

  async saveAccessGroup(data: any) {
    this.loadingAccessGroup = true;
    await this.service
      .postCustom('v1/groups', data)
      .then(async () => {
        await this.getAccessGroup();
      })
      .finally(() => (this.loadingAccessGroup = false));
  }

  openEditSegment(item: any) {
    const modalRef = this.messageService.presentAlertPrompt(
      '',
      'Editar Segmento',
      {
        value: item.name,
      }
    );
    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loadingSegment = true;
        this.service
          .postCustom(`v1/segments/${item.id}`, { name: result })
          .then(async () => {
            this.messageService.presentAlert(
              'Segmento atualizado com sucesso.'
            );
            await this.getSegment();
          })
          .finally(() => (this.loadingSegment = false));
      }
    });
  }
  openDeleteSegment(item: any) {
    const dialogRef = this.messageService.presentAlertConfirm(
      `Excluir <b>${item.name}</b> ?`,
      'Excluir Segmento'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loadingSegment = true;
        this.service
          .deleteCustom(`v1/segments/${item.id}`)
          .then(async () => {
            this.messageService.presentAlert('Segmento excluído com sucesso.');
            await this.getSegment();
          })
          .finally(() => (this.loadingSegment = false));
      }
    });
  }

  openEditAccessGroup(item: any) {
    const modalRef = this.messageService.presentAlertPrompt(
      '',
      'Editar Grupo de Acesso',
      {
        value: item.name,
      }
    );
    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loadingAccessGroup = true;
        this.service
          .postCustom(`v1/groups/${item.id}`, { name: result })
          .then(async () => {
            this.messageService.presentAlert(
              'Grupo de Acesso atualizado com sucesso.'
            );
            await this.getAccessGroup();
          })
          .finally(() => (this.loadingAccessGroup = false));
      }
    });
  }
  openDeleteAccessGroup(item: any) {
    const dialogRef = this.messageService.presentAlertConfirm(
      `Excluir <b>${item.name}</b> ?`,
      'Excluir Grupo de Acesso'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loadingAccessGroup = true;
        this.service
          .deleteCustom(`v1/groups/${item.id}`)
          .then(async () => {
            this.messageService.presentAlert(
              'Grupo de Acesso excluído com sucesso.'
            );
            await this.getAccessGroup();
          })
          .finally(() => (this.loadingAccessGroup = false));
      }
    });
  }
}
