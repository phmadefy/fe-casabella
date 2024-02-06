import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-modal-proof-transaction',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './modal-proof-transaction.component.html',
  styleUrls: ['./modal-proof-transaction.component.scss'],
})
export class ModalProofTransactionComponent {
  dados: any = {};
  loading = false;
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('ModalProofTransactionComponent', this.data);
    this.dados = { ...this.data.dados };
  }
}
