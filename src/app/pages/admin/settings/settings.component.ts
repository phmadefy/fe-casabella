import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputInlineComponent } from 'src/app/components/input-inline/input-inline.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ToolsService } from 'src/app/services/tools.service';
import { InputFileComponent } from 'src/app/components/input-file/input-file.component';
import { AbstractForms } from 'src/app/shared/abstract-form';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputInlineComponent,
    SpinnerComponent,
    CardComponent,
    InputFileComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [ApiService],
})
export class SettingsComponent extends AbstractForms {
  dados: any = {};

  images: any = {};
  constructor(
    service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService
  ) {
    super(service);
    service.path = 'v1/parameters';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDados();
  }

  async getDados() {
    this.loading = true;
    await this.service
      .listing()
      .then((res: any[]) => {
        console.log(res);
        this.parseData(res);
      })
      .finally(() => (this.loading = false));
  }

  parseData(res: any[]) {
    for (const item of res) {
      this.dados[item.parameter] = item.value;
    }
  }

  async save(data: any) {
    this.loading = true;
    await this.service
      .postCustom('v1/parameters', data)
      .then((res: any) => {
        this.messageService.toastSuccess(res.message, '');
      })
      .finally(() => (this.loading = false));
  }

  parseFiles(event: any[], model: string) {
    console.log('parseFiles', model, event);
    this.images[model] = event[0];
    console.log('images', this.images);

    // if (this.formData.has(model)) {
    //   this.formData.set(model, event[0]);
    // } else {
    //   this.formData.append(model, event[0]);
    // }
  }

  submit(): void {
    // for (let key of Object.keys(this.dados)) {
    //   if (key == 'ImagemOuVideoTelaLogin' || key == 'ImagemAnimadaMenu') {
    //     continue;
    //   }
    //   this.formData.append(key, this.dados[key]);
    // }
    const formData = this.tools.generateFormData(this.dados);

    this.save(formData);
    // this.save(this.dados);
  }
  finish(result: any): void {}
}
