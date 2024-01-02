import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-floral-deposit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    NgxCurrencyDirective,
  ],
  providers: [ApiService],
  templateUrl: './floral-deposit.component.html',
  styleUrls: ['./floral-deposit.component.scss'],
})
export class FloralDepositComponent extends AbstractForms {
  dados: any = { amount: 0 };
  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/floral';
    super(service);
  }

  override submit(): void {
    if (this.dados.id) {
      this.update(this.dados, this.dados.id);
    } else {
      this.create(this.dados);
    }
  }
  override finish(result: any): void {
    this.tools.route.navigate(['/admin/floral'], {
      queryParams: { tab: 'pending' },
    });
  }
}
