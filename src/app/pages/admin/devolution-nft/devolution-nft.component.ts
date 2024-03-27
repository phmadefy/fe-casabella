import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';
import { NftChooseComponent } from 'src/app/components/nft-choose/nft-choose.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalProofTransactionComponent } from 'src/app/shared/modal-proof-transaction/modal-proof-transaction.component';

@Component({
  selector: 'app-devolution-nft',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    NftChooseComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    SelectDefaultComponent,
    ComboboxComponent,
  ],
  providers: [ApiService],
  templateUrl: './devolution-nft.component.html',
  styleUrls: ['./devolution-nft.component.scss'],
})
export class DevolutionNftComponent extends AbstractForms {
  @ViewChild('NftChoose', { static: true }) NftChoose!: NftChooseComponent;
  @ViewChild('form', { static: true }) form!: NgForm;

  dados: any = {};
  types = [
    { id: 'all', description: 'Todos os NFTs' },
    { id: 'one', description: 'Especificar NFT' },
  ];
  constructor(
    service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/admin/nfts/return/origin';
    super(service);
  }

  override async submit() {
    // if (this.dados.id) {
    //   this.update(this.dados, this.dados.id);
    // } else {
    // }
    // this.create(this.dados);
    this.loading = true;
    await this.service
      .updateCustom('v1/admin/nfts/return/origin', this.dados)
      .then((res) => {
        this.finish(res);
      })
      .finally(() => (this.loading = false));
  }
  override finish(result: any): void {
    this.form.resetForm();

    if (result.data) {
      // this.openProof(result);
    }
  }

  openProof(data: any) {
    const dialogRef = this.dialog.open<any>(ModalProofTransactionComponent, {
      width: '95%',
      maxWidth: '1055px',
      maxHeight: '600px',
      data: { dados: data, type: 'nft', devolution: true },
    });
  }

  changeUser(event: any) {
    // console.log('changeUser', event, this.NftChoose);
    this.NftChoose.user_id = event?.user_id;
  }

  changeType(event: any) {
    if (event != 'one') {
      delete this.dados.nft_id;
    }
  }
}
