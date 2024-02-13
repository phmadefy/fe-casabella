import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modal-incentive-term-accept',
  standalone: true,
  imports: [CommonModule, ButtonCbComponent],
  providers: [ApiService],
  templateUrl: './modal-incentive-term-accept.component.html',
  styleUrls: ['./modal-incentive-term-accept.component.scss'],
})
export class ModalIncentiveTermAcceptComponent {
  loading = false;
  dados: any = {};

  constructor(
    public service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    private messageService: MessageService,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dados = this.data ?? {};
  }

  accept() {
    const dialogRef = this.messageService.presentAlertConfirm(
      `Ao clicar em "Confirmar", você estará INSCRITO na campanha de incentivo, concordando com os nossos termos.`,
      'Termos de uso do Incentivo',
      { confirmText: 'Confirmar', cancelText: 'Cancelar' }
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loading = true;
        this.service
          .postCustom(`v1/incentives/${this.data.id}/register`)
          .then((res) => {
            this.dialogRef.close(true);
          })
          .finally(() => (this.loading = false));
      }
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  download() {
    this.service
      .downloadBlob(
        this.service.baseUrl + '/v1/terms/' + this.dados.term.id + '/download'
      )
      .subscribe((data: any) => {
        const blob = new Blob([data]);

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = `${this.dados.name}.pdf`;
        link.click();
        link.remove();
      });
  }
}
