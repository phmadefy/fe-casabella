import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modal-view-comments',
  standalone: true,
  imports: [CommonModule, ModalComponent, DropdownCbComponent],
  providers: [ApiService],
  templateUrl: './modal-view-comments.component.html',
  styleUrls: ['./modal-view-comments.component.scss'],
})
export class ModalViewCommentsComponent {
  loading = false;
  comments: any[] = [];

  userCurrent: any = {};
  user_id: any;
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    private messageService: MessageService,
    @Inject(DIALOG_DATA) public data: any
  ) {
    service.path = 'v1/post';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.user_id = this.data?.user_id ?? null;
    // this.comments = this.data?.comments ?? [];
    this.getDados(this.data?.id);
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .getCustom(`v1/posts/${id}`)
      .then((res) => {
        // this.files = [];
        this.comments = res?.comments;
      })
      .finally(() => (this.loading = false));
  }

  openEdit(item: any) {
    const modalRef = this.messageService.presentAlertPrompt(
      '',
      'Editar Comentário',
      {
        value: item.description,
      }
    );
    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loading = true;
        this.service
          .updateCustom(`v1/posts/${item.id}/comment`, { description: result })
          .then(async () => {
            item.description = result;
            // this.delete.emit(true);
          })
          .finally(() => (this.loading = false));
      }
    });
  }
  openDelete(item: any) {
    const dialogRef = this.messageService.presentAlertConfirm(
      `Deseja excluir ?`,
      'Excluir Comentário'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loading = true;
        this.service
          .deleteCustom(`v1/posts/${item.id}/comment`)
          .then(async () => {
            // this.delete.emit(true);
            this.getDados(this.data?.id);
          })
          .finally(() => (this.loading = false));
      }
    });
  }
}
