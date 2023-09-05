import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboboxComponent),
  multi: true,
};

@Component({
  selector: 'combobox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR],
})
export class ComboboxComponent {
  @Input() model!: string;
  @Input() label!: string;
  @Input() form: NgForm | undefined;
  @Input() isReadOnly = false;
  @Input() isRequired = false;
  @Input() options: any[] = [];
  @Input() valueBind: string = 'id';
  @Input() textBind: string = 'name';

  show = false;

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

  toggle() {
    this.show = !this.show;
    document.getElementById(this.model)?.focus();
  }

  checkSelected(item: any) {
    const find = this.options.find((e) => e[this.valueBind] == this.value);
    return find;
  }

  changeItem(item: any) {
    this.show = false;
    this.writeValue(item[this.valueBind]);
  }
}
