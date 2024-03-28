import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proof-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proof-data.component.html',
  styleUrls: ['./proof-data.component.scss'],
})
export class ProofDataComponent {
  @Input() data: any;
  @Input() dados: any;

  getType() {
    if (this.data?.deposit) {
      return 'de Depósito';
    }
    if (this.data?.devolution) {
      return 'de Devolução';
    }

    return 'da transação';
  }

  getTotal() {
    const total = parseFloat(this.dados.amount) + parseFloat(this.dados.tax);
    console.log('total', total);
    return total;
  }
}
