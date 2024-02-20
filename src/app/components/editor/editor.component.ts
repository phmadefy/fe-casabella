import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { environment } from 'src/environments/environment';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true,
};

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR],
})
export class EditorComponent implements ControlValueAccessor {
  @Input() controlName!: string;
  @Input() placeholder = ' ';
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() isReadOnly = false;

  config: EditorConfig = {
    language: 'pt-br',
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
        '|',
        'alignment',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        // 'highlight',
        'fontFamily',
        // 'horizontalLine',
      ],
    },
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
    plugins: ['SimpleUploadAdapter'],
    simpleUpload: {
      uploadUrl: `${environment.url}/upload-editor`,
    },
    licenseKey: '',
  };

  public Editor: any = Editor;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    if (v !== this.innerValue) {
      this.value = v;
      this.onChangeCb(v);
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // public onReady( editor: DecoupledEditor ): void {
  //   const element = editor.ui.getEditableElement()!;
  //   const parent = element.parentElement!;

  //   parent.insertBefore(
  //     editor.ui.view.toolbar.element!,
  //     element
  //   );
  // }
}
