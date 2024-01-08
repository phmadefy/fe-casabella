import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-floral-rescue-approve-refuse',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonCbComponent],
  providers: [ApiService],
  templateUrl: './modal-floral-rescue-approve-refuse.component.html',
  styleUrls: ['./modal-floral-rescue-approve-refuse.component.scss'],
})
export class ModalFloralRescueApproveRefuseComponent {
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
      this.service.path = `v1/floral/${this.dados.id}/approve`;
    }
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.formData.approved = this.mode == 'approve' ? true : false;

    this.loading = true;
    this.service
      .updateCustom(this.service.path, this.formData)
      .then((res) => {
        this.dialogRef.close(true);
      })
      .finally(() => (this.loading = false));
  }

  getTypeRescue() {
    if (this.dados?.transaction?.rescue_type == 'products') {
      return 'Produtos';
    }

    return 'Dinheiro';
  }
}
