import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ProofDataComponent } from 'src/app/components/proof-data/proof-data.component';

@Component({
  selector: 'app-modal-proof-transaction',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ProofDataComponent],
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

  getType() {
    if (this.data?.deposit) {
      return 'de Depósito';
    }
    if (this.data?.devolution) {
      return 'de Devolução';
    }

    return 'da transação';
  }

  printContent() {
    // let printContents: any = document.querySelector('.print-area');
    // let originalContents: any = document.body;

    // // Esconder tudo exceto o conteúdo imprimível
    // document.body.innerHTML = printContents.innerHTML;

    sessionStorage.setItem(
      'print-data',
      JSON.stringify({ data: this.data, dados: this.dados })
    );

    // Iniciar a impressão
    window.open('/impressao', '_blank');

    // Restaurar o conteúdo original
    // document.body.innerHTML = originalContents.innerHTML;
  }
}
