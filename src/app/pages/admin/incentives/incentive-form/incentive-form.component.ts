import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ApiService } from 'src/app/services/api.service';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { ImageSelectComponent } from 'src/app/components/image-select/image-select.component';
import { CardChooseComponent } from 'src/app/components/card-choose/card-choose.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { Status } from 'src/app/shared/properties';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incentive-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    SpinnerComponent,
    NgxCurrencyDirective,
    CKEditorModule,
    ImageSelectComponent,
    CardChooseComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    RouterLink,
  ],
  providers: [ApiService],
  templateUrl: './incentive-form.component.html',
  styleUrls: ['./incentive-form.component.scss'],
})
export class IncentiveFormComponent extends AbstractForms {
  dados: any = { editorData: '' };
  Editor = ClassicEditor;
  config: EditorConfig = {
    language: 'pt-br',
  };

  status = Status;
  constructor(service: ApiService) {
    super(service);
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }
  override finish(result: any): void {
    throw new Error('Method not implemented.');
  }
}
