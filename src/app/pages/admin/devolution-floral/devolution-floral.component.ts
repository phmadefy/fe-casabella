import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Dialog } from '@angular/cdk/dialog';
import { ModalProofTransactionComponent } from 'src/app/shared/modal-proof-transaction/modal-proof-transaction.component';

@Component({
  selector: 'app-devolution-floral',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    SelectDefaultComponent,
    NgxCurrencyDirective,
  ],
  providers: [ApiService],
  templateUrl: './devolution-floral.component.html',
  styleUrls: ['./devolution-floral.component.scss'],
})
export class DevolutionFloralComponent extends AbstractForms {
  @ViewChild('form', { static: true }) form!: NgForm;

  dados: any = { amount: 0 };

  user: any = {};

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

    this.openProof(result);
  }

  openProof(data: any) {
    const dialogRef = this.dialog.open<any>(ModalProofTransactionComponent, {
      width: '95%',
      maxWidth: '1055px',
      maxHeight: '600px',
      data: { dados: data, type: 'floral', devolution: true },
    });
  }

  setUser(user: any) {
    this.getDados(user);
  }

  async getDados(user: any) {
    this.loading = true;
    await this.service
      .getCustom(`v1/my-balance-floral`, { user_id: user.id })
      .then((res) => {
        // this.finish(res);
        this.user = user;
        this.user.floral_amount = res;
      })
      .finally(() => (this.loading = false));
  }
}
