import { Component, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { AlertDisplayComponent } from 'src/app/components/alert-display/alert-display.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ModalProofTransactionComponent } from 'src/app/shared/modal-proof-transaction/modal-proof-transaction.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalConfirmTransactionComponent } from 'src/app/shared/modal-confirm-transaction/modal-confirm-transaction.component';

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
    AlertDisplayComponent,
    InputFloatingComponent,
  ],
  providers: [ApiService],
  templateUrl: './floral-transfer-form.component.html',
  styleUrls: ['./floral-transfer-form.component.scss'],
})
export class FloralTransferFormComponent extends AbstractForms {
  @ViewChild('form', { static: true }) form!: NgForm;

  dados: any = { amount: 0, to: 'to_user' };
  userCurrent: any = {};
  modo = 'user';

  CotacaoFloral = 0;
  TaxaTransferenciaUsuarios = 0;
  constructor(
    service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/floral';
    super(service);
  }

  async ngOnInit() {
    const parameters = this.tools.getParameters();
    const paramCotacao = this.tools.getItemArray(
      parameters,
      'parameter',
      'CotacaoFloral'
    );
    if (paramCotacao) {
      this.CotacaoFloral = paramCotacao.value;
    }

    const paramCotacaoTax = this.tools.getItemArray(
      parameters,
      'parameter',
      'TaxaTransferenciaUsuarios'
    );
    if (paramCotacaoTax) {
      this.TaxaTransferenciaUsuarios =
        paramCotacaoTax?.type == 'Percentual'
          ? parseFloat(paramCotacaoTax.value) / 100
          : parseFloat(paramCotacaoTax.value);
    }

    this.userCurrent = await this.tools.getCurrentUser();
    this.generateDados();
  }

  generateDados() {
    this.dados = { amount: 0, to: 'to_user' };

    if (this.tools.checkRouteContainsAdmin()) {
      this.modo = 'admin';
    } else {
      this.dados.from_user_id = this.userCurrent.id;
    }
  }

  override submit(): void {
    const dialogRef = this.dialog.open<any>(ModalConfirmTransactionComponent, {
      width: '95%',
      maxWidth: '600px',
      maxHeight: '600px',
      data: {
        item: this.dados,
        type: 'floral',
        is_user: this.modo != 'admin' ? true : false,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.create(this.dados);
      }
    });

    // if (this.dados.id) {
    //   this.update(this.dados, this.dados.id);
    // } else {
    // this.create(this.dados);
    // }
  }
  override finish(result: any): void {
    this.form.resetForm();
    this.generateDados();
    this.openProof(result);
  }

  openProof(data: any) {
    const dialogRef = this.dialog.open<any>(ModalProofTransactionComponent, {
      width: '95%',
      maxWidth: '1055px',
      maxHeight: '600px',
      data: {
        dados: data,
        type: 'floral',
      },
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

  calcTax() {
    if (this.modo != 'admin') {
      this.dados.tax =
        this.TaxaTransferenciaUsuarios * parseFloat(this.dados.amount);
    }
  }

  changeTo(to: string) {
    this.dados = { amount: 0, to };
  }
}
