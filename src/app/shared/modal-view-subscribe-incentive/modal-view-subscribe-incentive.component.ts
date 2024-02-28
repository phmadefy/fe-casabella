import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NgxMaskPipe } from 'ngx-mask';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-view-subscribe-incentive',
  standalone: true,
  imports: [CommonModule, ModalComponent, DropdownCbComponent, NgxMaskPipe],
  providers: [ApiService],
  templateUrl: './modal-view-subscribe-incentive.component.html',
  styleUrls: ['./modal-view-subscribe-incentive.component.scss'],
})
export class ModalViewSubscribeIncentiveComponent {
  loading = false;

  dataSource: any[] = [];

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.service.path = 'v1/incentives';
  }

  ngOnInit(): void {
    this.getDados(this.data?.id);
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .getCustom(`${this.service.path}/${id}/register-list`)
      .then((res) => {
        // this.files = [];
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }
}
