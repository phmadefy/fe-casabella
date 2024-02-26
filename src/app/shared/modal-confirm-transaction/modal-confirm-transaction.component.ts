import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-confirm-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonCbComponent],
  templateUrl: './modal-confirm-transaction.component.html',
  styleUrls: ['./modal-confirm-transaction.component.scss'],
})
export class ModalConfirmTransactionComponent {
  loading = false;
  filters: any = {};

  dados: any = {};
  formData: any = {};
  type!: string;

  constructor(
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('ModalConfirmTransactionComponent', this.data);

    if (this.data?.item) {
      this.type = this.data?.type;
      this.dados = this.data?.item;
    }
  }

  getTotalOperation() {
    return parseFloat(this.dados.amount) + parseFloat(this.dados.tax);
  }
}
