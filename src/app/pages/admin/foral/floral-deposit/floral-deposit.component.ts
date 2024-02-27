import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ModalProofTransactionComponent } from 'src/app/shared/modal-proof-transaction/modal-proof-transaction.component';
import { Dialog } from '@angular/cdk/dialog';

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
  @ViewChild('form', { static: true }) form!: NgForm;

  dados: any = { amount: 0 };
  constructor(
    service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
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
    this.form.resetForm();
    this.dados = { amount: 0 };
    this.openProof(result);
  }

  openProof(data: any) {
    const dialogRef = this.dialog.open<any>(ModalProofTransactionComponent, {
      width: '95%',
      maxWidth: '1055px',
      maxHeight: '600px',
      data: { dados: data, type: 'floral', deposit: true },
    });

    dialogRef.closed.subscribe((result) => {
      // if (this.tools.checkRouteContainsAdmin()) {
      //   this.tools.route.navigate(['/admin/floral/transfer-auth'], {
      //     queryParams: { tab: 'authorize' },
      //   });
      // } else {
      //   this.tools.route.navigate(['/floral'], {
      //     queryParams: { tab: 'pending' },
      //   });
      // }
    });
  }
}
