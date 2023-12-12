import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';

@Component({
  selector: 'app-modal-media-upload',
  standalone: true,
  imports: [CommonModule, ModalComponent, DropzoneComponent, ButtonCbComponent],
  providers: [ApiService],
  templateUrl: './modal-media-upload.component.html',
  styleUrls: ['./modal-media-upload.component.scss'],
})
export class ModalMediaUploadComponent {
  loading = false;
  filters: any = {};

  files: File[] = [];

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    if (data?.endpoint) {
      service.path = data?.endpoint;
    }
  }

  processFile(files: any) {
    console.log('processFile', files);
    this.files = files;
  }

  sendFiles() {
    const formData = new FormData();
    for (let file of this.files) {
      formData.append('file[]', file);
    }

    this.loading = true;
    this.service
      .create(formData)
      .then((res) => {
        // this.files = [];
        this.dialogRef.close(true);
      })
      .finally(() => (this.loading = false));
  }
}
