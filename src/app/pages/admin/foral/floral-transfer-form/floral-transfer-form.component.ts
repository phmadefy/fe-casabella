import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';

@Component({
  selector: 'app-floral-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    NgxCurrencyDirective,
    SelectDefaultComponent,
  ],
  providers: [ApiService],
  templateUrl: './floral-transfer-form.component.html',
  styleUrls: ['./floral-transfer-form.component.scss'],
})
export class FloralTransferFormComponent extends AbstractForms {
  dados: any = { amount: 0 };
  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/admin/floral';
    super(service);
  }

  override submit(): void {
    // if (this.dados.id) {
    //   this.update(this.dados, this.dados.id);
    // } else {
    //   this.create(this.dados);
    // }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    // this.getDados(result.id);
  }
}
