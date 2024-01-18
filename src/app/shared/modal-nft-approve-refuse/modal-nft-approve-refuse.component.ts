import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-nft-approve-refuse',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonCbComponent],
  providers: [ApiService],
  templateUrl: './modal-nft-approve-refuse.component.html',
  styleUrls: ['./modal-nft-approve-refuse.component.scss'],
})
export class ModalNftApproveRefuseComponent {
  loading = false;
  filters: any = {};

  dados: any = {};
  formData: any = {};
  mode!: string;

  userCurrent: any = {};
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}
  async ngOnInit() {
    if (this.data?.item) {
      this.mode = this.data?.mode;
      this.dados = this.data?.item;
      this.service.path =
        this.data?.endpoint ?? `v1/admin/nfts/${this.dados?.nft?.id}/authorize`;
    }
    this.userCurrent = await this.tools.getCurrentUser();
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (!this.data?.user && this.mode == 'approve') {
      this.formData.authorized = true;
    }

    if (this.data?.user) {
      this.formData.status =
        this.mode == 'approve'
          ? 'approved'
          : this.mode == 'cancel'
          ? 'canceled'
          : 'rejected';
      this.formData.to_user_id = this.userCurrent.id;
    }

    this.loading = true;
    this.service
      .updateCustom(this.service.path, this.formData)
      .then((res) => {
        this.dialogRef.close(true);
      })
      .finally(() => (this.loading = false));
  }

  parseArray(items: any[]) {
    if (items) {
      return items.join(',');
    }

    return '';
  }

  getLabel() {
    if (this.data?.user) {
      return this.mode == 'approve'
        ? 'De acordo'
        : this.mode == 'cancel'
        ? 'De acordo'
        : 'Voltar';
    }

    return this.mode == 'approve' ? 'Autorizar' : 'Recusar';
  }
}
