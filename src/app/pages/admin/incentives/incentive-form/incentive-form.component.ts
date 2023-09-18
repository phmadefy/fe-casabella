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
