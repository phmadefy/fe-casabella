import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { OptionsCall } from 'src/app/shared/properties';
import { MessageService } from 'src/app/services/message.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMediaUploadComponent } from 'src/app/shared/modal-media-upload/modal-media-upload.component';

@Component({
  selector: 'app-contact-us-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardComponent,
    InputFloatingComponent,
    ComboboxComponent,
    ButtonCbComponent,
  ],
  providers: [ApiService],
  templateUrl: './contact-us-view.component.html',
  styleUrls: ['./contact-us-view.component.scss'],
})
export class ContactUsViewComponent {
  dados: any = { user: {}, attendant: {}, interactions: [], attachments: [] };
  loading = false;

  optionsCall = OptionsCall;
  userCurrent: any = {};
  constructor(
    public service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog,
    private messageService: MessageService
  ) {
    service.path = 'v1/tickets';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    if (history.state?.contact_us_id) {
      this.getDados(history.state?.contact_us_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;
        if (!this.dados?.attendant?.id) {
          this.dados.attendant = {};
        }
      })
      .finally(() => (this.loading = false));
  }

  setInProgress() {
    this.messageService
      .presentAlertConfirm('Desejar dar andamento ?', 'Atenção!')
      .closed.subscribe((res) => {
        if (res) {
          this.update({
            status: 'in_progress',
            attendant_id: this.userCurrent.id,
          });
        }
      });
  }

  setPaused() {
    this.messageService
      .presentAlertConfirm('Desejar pausar o atendimento ?', 'Atenção!')
      .closed.subscribe((res) => {
        if (res) {
          this.update({
            status: 'paused',
          });
        }
      });
  }

  setFinished() {
    this.messageService
      .presentAlertConfirm('Desejar finalizar o atendimento ?', 'Atenção!')
      .closed.subscribe((res) => {
        if (res) {
          this.update({
            status: 'finished',
          });
        }
      });
  }

  update(dados: any) {
    this.loading = true;
    this.service
      .update(dados, this.dados.id)
      .then(async (res) => {
        await this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  sendReplay(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.messageService
      .presentAlertConfirm('Enviar a mensagem ?', 'Atenção!')
      .closed.subscribe((res) => {
        if (res) {
          this.loading = true;
          this.service
            .updateCustom(`v1/tickets/${this.dados.id}/interaction`, form.value)
            .then(async (res) => {
              form.resetForm();
              await this.getDados(this.dados.id);
            })
            .finally(() => (this.loading = false));
        }
      });
  }

  openModalMedia() {
    const dialogRef = this.dialog.open<any>(ModalMediaUploadComponent, {
      width: '95%',
      maxWidth: '650px',
      maxHeight: '90%',
      data: {
        endpoint: `v1/tickets/${this.dados.id}/attachment`,
        inputFileName: 'attachment',
      },
    });

    dialogRef.closed.subscribe((res) => {
      this.getDados(this.dados.id);
    });
  }
}
