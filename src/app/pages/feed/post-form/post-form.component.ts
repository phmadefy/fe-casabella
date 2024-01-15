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
import { RadioButtonComponent } from 'src/app/components/radio-button/radio-button.component';

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
    RadioButtonComponent,
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
    service.path = 'v1/posts';
    super(service);
  }

  ngOnInit(): void {
    if (history.state?.post_id) {
      this.getDados(history.state?.post_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  override async submit() {
    const formData = this.tools.generateFormData(this.dados);

    if (this.dados.id) {
      this.loading = true;
      await this.service
        .postCustom(`v1/posts/${this.dados.id}`, formData)
        .then((res) => {
          this.finish(res);
        })
        .finally(() => (this.loading = false));
    } else {
      this.create(formData);
    }
  }
  override finish(result: any): void {
    this.tools.route.navigate(['/feed']);
  }

  chooseImage(event: FileList | File[]) {
    console.log('chooseImage', event);
    if (event.length > 0) {
      this.dados.attachment = event[0];
    }
  }

  getPivotProperty(propertyArray: string, propertyReturn: string) {
    const data = this.dados[propertyArray]?.map(
      (f: any) => f?.pivot?.[propertyReturn]
    );
    // console.log('getPivotProperty', data);

    return data;
  }
}
