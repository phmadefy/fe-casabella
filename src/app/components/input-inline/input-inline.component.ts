import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgForm,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ToolsService } from 'src/app/services/tools.service';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputInlineComponent),
  multi: true,
};

@Component({
  selector: 'input-inline',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, NgxCurrencyDirective],

  templateUrl: './input-inline.component.html',
  styleUrls: ['./input-inline.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR, provideNgxMask()],
})
export class InputInlineComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() model!: string;
  @Input() label!: string;
  @Input() mask!: string;
  @Input() form!: NgForm;
  @Input() isReadOnly = false;
  @Input() isRequired = false;
  @Input() options: any[] = [];
  @Input() valueBind: string = 'id';
  @Input() textBind: string = 'name';
  @Input() optionsCurrency: any = {};

  constructor(public tools: ToolsService) {}

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
    this.isReadOnly = isDisabled;
  }

  getControl() {
    const controls: any = this.form?.controls;
    return controls[this.model];
  }

  getErrors() {
    const errors = [];
    if (this.form instanceof NgForm) {
      const control: any = this.getControl();
      if (control?.errors && control?.errors['required']) {
        errors.push('Obrigatório.');
      }
      if (control?.errors && control?.errors['email']) {
        errors.push('E-mail inválido.');
      }
      // console.log('control', control);
    }

    return errors;
  }
}
