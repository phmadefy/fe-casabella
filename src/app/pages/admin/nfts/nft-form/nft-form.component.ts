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
import { ModalClassificationNftFormComponent } from 'src/app/shared/modal-classification-nft-form/modal-classification-nft-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalTypeNftFormComponent } from 'src/app/shared/modal-type-nft-form/modal-type-nft-form.component';

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

  constructor(
    service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
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
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;

        this.dados.public = this.tools.getPropertiesPivot(
          this.dados.public,
          'person_type_id'
        );
        this.dados.segments = this.tools.getPropertiesPivot(
          this.dados.segments,
          'segment_id'
        );
        this.dados.types = this.tools.getPropertiesPivot(
          this.dados.types,
          'nft_type_id'
        );
        this.dados.subclassifications = this.tools.getPropertiesPivot(
          this.dados.subclassifications,
          'nft_sub_classification_id'
        );
        this.dados.classifications = this.tools.getPropertiesPivot(
          this.dados.classifications,
          'nft_classification_id'
        );
      })
      .finally(() => (this.loading = false));
  }

  override async submit() {
    const formData = this.tools.generateFormData(this.dados);

    if (this.dados.id) {
      // this.update(formData, this.dados.id);
      this.loading = true;
      await this.service
        .postCustom(`v1/admin/nfts/${this.dados.id}`, formData)
        .then((res) => {
          this.finish(res);
        })
        .finally(() => (this.loading = false));
    } else {
      this.create(formData);
    }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    // this.getDados(result.id);
    this.tools.route.navigate(['/admin/nfts'], { queryParams: { tab: 'all' } });
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

  openModalClassification(element: any) {
    this.dialog
      .open<any>(ModalClassificationNftFormComponent, {
        width: '95%',
        maxWidth: '550px',
        // height: '90%',
      })
      .closed.subscribe((res) => {
        if (res) {
          element.getList();
        }
      });
  }

  openModalType(element: any) {
    this.dialog
      .open<any>(ModalTypeNftFormComponent, {
        width: '95%',
        maxWidth: '400px',
        // height: '90%',
      })
      .closed.subscribe((res) => {
        if (res) {
          element.getList();
        }
      });
  }
}
