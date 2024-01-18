import { Component, ViewChild } from '@angular/core';
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
import { AlertDisplayComponent } from 'src/app/components/alert-display/alert-display.component';

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
    AlertDisplayComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-transfer-form.component.html',
  styleUrls: ['./nft-transfer-form.component.scss'],
})
export class NftTransferFormComponent extends AbstractForms {
  @ViewChild('nftChoose', { static: true }) nftChoose!: NftChooseComponent;
  dados: any = {};
  types = [
    { id: 'definitive', description: 'Definitiva' },
    { id: 'temporary', description: 'Temporária' },
  ];

  userCurrent: any = {};
  modo = 'user';
  constructor(service: ApiService, public tools: ToolsService) {
    super(service);
    service.path = 'v1/admin/nfts';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    if (this.tools.checkRouteContainsAdmin()) {
      this.modo = 'admin';
      this.nftChoose.user_id = 'null';
    } else {
      this.nftChoose.user_id = this.userCurrent.id;
    }

    if (history.state?.nft_id) {
      this.getDados(history.state?.nft_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        this.dados = res;
        this.nftChoose.setNFT(res);
      })
      .finally(() => (this.loading = false));
  }

  chooseNFT(event: any) {
    if (event) {
      this.dados.nft_id = event.id;
    } else {
      delete this.dados.nft_id;
    }
  }

  override submit(): void {
    if (!this.dados.nft_id) {
      return;
    }
    this.service.path = `v1/admin/nfts/${this.dados.nft_id}/transfer`;
    this.create(this.dados);
  }
  async finish(result: any) {
    // throw new Error('Method not implemented.');
    // this.getDados(result.id);
    let route = '/nfts';
    if (await this.tools.isAdmin()) {
      route = '/admin/nfts';
    }
    this.tools.route.navigate([route], { queryParams: { tab: 'all' } });
  }
}
