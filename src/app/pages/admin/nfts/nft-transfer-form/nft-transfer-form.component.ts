import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { NftChooseComponent } from 'src/app/components/nft-choose/nft-choose.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';

@Component({
  selector: 'app-nft-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    NftChooseComponent,
    SelectDefaultComponent,
    ComboboxComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-transfer-form.component.html',
  styleUrls: ['./nft-transfer-form.component.scss'],
})
export class NftTransferFormComponent extends AbstractForms {
  dados: any = {};
  types = [
    { id: 'definitiva', description: 'Definitiva' },
    { id: 'temporaria', description: 'Temporária' },
  ];
  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/admin/nfts';
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
