import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ApiService } from 'src/app/services/api.service';
import { NotContextMenuDirective } from 'src/app/directives/not-context-menu.directive';

@Component({
  selector: 'app-modal-view-docs',
  standalone: true,
  imports: [CommonModule, ModalComponent, NotContextMenuDirective],
  providers: [ApiService],
  templateUrl: './modal-view-docs.component.html',
  styleUrls: ['./modal-view-docs.component.scss'],
})
export class ModalViewDocsComponent {
  loading = false;
  dataSource: any[] = [];
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    if (data?.endpoint) {
      service.path = 'v1/users';
    }
  }

  ngOnInit(): void {
    this.getDados(this.data?.id);
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
}
