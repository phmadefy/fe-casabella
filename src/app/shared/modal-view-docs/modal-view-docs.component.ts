import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ApiService } from 'src/app/services/api.service';
import { NotContextMenuDirective } from 'src/app/directives/not-context-menu.directive';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalViewDocComponent } from '../modal-view-doc/modal-view-doc.component';

@Component({
  selector: 'app-modal-view-docs',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    NotContextMenuDirective,
    PdfViewerModule,
  ],
  providers: [ApiService],
  templateUrl: './modal-view-docs.component.html',
  styleUrls: ['./modal-view-docs.component.scss'],
})
export class ModalViewDocsComponent {
  loading = false;
  dataSource: any[] = [];

  fileView: any = null;
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    if (data?.endpoint) {
      service.path = 'v1/users';
    }
  }

  ngOnInit(): void {
    this.getDados(this.data?.user_id);
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .getCustom(`v1/users/${id}/attachments`)
      .then((res) => {
        // this.files = [];
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }

  openModalViewDocs(item: any) {
    const dialogRef = this.dialog.open<any>(ModalViewDocComponent, {
      width: '95%',
      maxWidth: '700px',
      height: '600px',
      maxHeight: '90%',
      data: item,
    });
  }
}
