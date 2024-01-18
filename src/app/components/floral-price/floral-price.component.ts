import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-floral-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floral-price.component.html',
  styleUrls: ['./floral-price.component.scss'],
})
export class FloralPriceComponent {
  value = 0;

  constructor(private tools: ToolsService) {}

  ngOnInit() {
    const parameters = this.tools.getParameters();
    const param = this.tools.getItemArray(
      parameters,
      'parameter',
      'CotacaoFloral'
    );
    if (param) {
      this.value = param.value;
    }
  }
}
