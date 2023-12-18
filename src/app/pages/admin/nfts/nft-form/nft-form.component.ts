import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { ChooseOptionsModalConfig } from 'src/app/shared/properties';

@Component({
  selector: 'app-nft-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    DropdownCbComponent,
    ButtonCbComponent,
    RouterLink,
    ImageSelectComponent,
    CheckboxComponent,
    CardChooseComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-form.component.html',
  styleUrls: ['./nft-form.component.scss'],
})
export class NftFormComponent extends AbstractForms {
  admins: any[] = [];
  users: any[] = [];
  dados: any = { active: true, balance: 0 };

  chooseOptionsModalConfigClassifications: ChooseOptionsModalConfig = {
    title: `Selecionar Sub-classificação:`,
    bindText: 'name',
    bindValue: 'id',
    endpoint: 'v1/admin/nft-classification/sub-classification',
  };

  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/admin/nfts';
    super(service);
  }

  ngOnInit(): void {
    if (history.state?.nft_id) {
      this.getDados(history.state?.nft_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .listing({ id })
      .then((res) => {
        console.log('res', res);
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  override submit(): void {
    const formData = new FormData();
    for (let key of Object.keys(this.dados)) {
      if (Array.isArray(this.dados[key])) {
        for (let value of this.dados[key]) {
          formData.append(`${key}[]`, value);
        }
      } else {
        formData.append(key, this.dados[key]);
      }
    }

    if (this.dados.id) {
      this.update(formData, this.dados.id);
    } else {
      this.create(formData);
    }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    this.getDados(result.id);
  }

  chooseClassifications(event: any[]) {
    this.dados.classifications = event;
    if (event.length <= 0) {
      this.dados.subclassifications = [];
    }
  }

  chooseImage(event: FileList | File[]) {
    console.log('chooseImage', event);
    if (event.length > 0) {
      this.dados.image = event[0];
    }
  }

  openModalClassification() {}

  openModalType() {}
}
