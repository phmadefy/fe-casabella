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

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data?.item) {
      this.mode = this.data?.mode;
      this.dados = this.data?.item;
      this.service.path = `v1/admin/nfts/${this.dados.id}/approve`;
    }
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.formData.approve = this.mode == 'approve' ? true : false;

    this.loading = true;
    this.service
      .updateCustom(this.service.path, this.formData)
      .then((res) => {
        this.dialogRef.close(true);
      })
      .finally(() => (this.loading = false));
  }
}
