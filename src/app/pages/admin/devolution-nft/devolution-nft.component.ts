import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  dados: any = {};
  types = [
    { id: 'all', description: 'Todos os NFTs' },
    { id: 'specific', description: 'Especificar NFT' },
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
