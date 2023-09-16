import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-incentive-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    SpinnerComponent,
    NgxCurrencyDirective,
  ],
  providers: [ApiService],
  templateUrl: './incentive-form.component.html',
  styleUrls: ['./incentive-form.component.scss'],
})
export class IncentiveFormComponent extends AbstractForms {
  dados: any = {};
  constructor(service: ApiService) {
    super(service);
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }
  override finish(result: any): void {
    throw new Error('Method not implemented.');
  }
}
