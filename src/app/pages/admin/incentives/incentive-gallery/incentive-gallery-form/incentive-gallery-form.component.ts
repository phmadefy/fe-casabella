import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalMediaUploadComponent } from 'src/app/shared/modal-media-upload/modal-media-upload.component';
import { Router, RouterLink } from '@angular/router';
import { ImagePreviewComponent } from 'src/app/components/image-preview/image-preview.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-incentive-gallery-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    ButtonCbComponent,
    CardChooseComponent,
    ImageSelectComponent,
    RouterLink,
    ImagePreviewComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-gallery-form.component.html',
  styleUrls: ['./incentive-gallery-form.component.scss'],
})
export class IncentiveGalleryFormComponent extends AbstractForms {
  dados: any = { attachments: [] };

  constructor(
    service: ApiService,
    private dialog: Dialog,
    private router: Router,
    private messageService: MessageService
  ) {
    super(service);
    service.path = 'v1/incentives-gallery';
  }

  async ngOnInit() {
    if (history.state?.gallery_id) {
      console.log('history', history);
      this.getDados(history.state?.gallery_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  override async submit() {
    console.log('dados', this.dados);
    const formData = new FormData();
    for (let key of Object.keys(this.dados)) {
      if (Array.isArray(this.dados[key])) {
        for (let value of this.dados[key]) {
          formData.append(`${key}[]`, value);
        }
      } else {
        formData.append(key, this.dados[key]);
      }
    }

    if (!this.dados.id) {
      this.create(formData);
    } else {
      // this.update(formData, this.dados.id);
      this.loading = true;
      await this.service
        .postCustom(`v1/incentives-gallery/${this.dados.id}`, formData)
        .then((res) => {
          this.finish(res);
        })
        .finally(() => (this.loading = false));
    }
  }
  override finish(result: any): void {
    // this.getDados(result?.id);
    this.router.navigate(['/admin/incentives'], {
      queryParams: { tab: 'gallery' },
    });
  }

  openModalMedia() {
    const dialogRef = this.dialog.open<any>(ModalMediaUploadComponent, {
      width: '95%',
      maxWidth: '650px',
      maxHeight: '90%',
      data: {
        endpoint: `v1/incentives-gallery/${this.dados.id}/add-attachment`,
      },
    });

    dialogRef.closed.subscribe((res) => {
      this.getDados(this.dados.id);
    });
  }

  setImage(event: File[]) {
    if (event.length > 0) {
      this.dados.image = event[0];
    }
  }

  removeImage(item: any) {
    this.messageService
      .presentAlertConfirm('Remover a image?')
      .closed.subscribe((res) => {
        if (res) {
          this.deleteImage(item.id);
        }
      });
  }

  async deleteImage(id: any) {
    this.loading = true;
    await this.service
      .deleteCustom(`v1/incentives-gallery/remove-attachment/` + id)
      .then((res) => {
        this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  async deleteItem() {
    this.messageService
      .presentAlertConfirm('Excluir a Galeria ?')
      .closed.subscribe((res) => {
        if (res) {
          this.delete(this.dados.id);
        }
      });
  }
}
