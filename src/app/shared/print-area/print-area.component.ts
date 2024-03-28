import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProofDataComponent } from 'src/app/components/proof-data/proof-data.component';

@Component({
  selector: 'app-print-area',
  standalone: true,
  imports: [CommonModule, ProofDataComponent],
  templateUrl: './print-area.component.html',
  styleUrls: ['./print-area.component.scss'],
})
export class PrintAreaComponent {
  printData: any;
  ngOnInit(): void {
    const data = sessionStorage.getItem('print-data');
    if (data) {
      this.printData = JSON.parse(data);
      window.print();
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('print-data');
  }
}
