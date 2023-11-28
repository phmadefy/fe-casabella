import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-post-form',
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
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent extends AbstractForms {
  admins: any[] = [];
  users: any[] = [];
  dados: any = { active: true, balance: 0 };

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
    // if (this.dados.id) {
    //   this.update(this.dados, this.dados.id);
    // } else {
    //   this.create(this.dados);
    // }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    this.getDados(result.id);
  }
}
