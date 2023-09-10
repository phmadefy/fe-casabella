import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgForm,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToolsService } from 'src/app/services/tools.service';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFloatingComponent),
  multi: true,
};

@Component({
  selector: 'input-floating',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './input-floating.component.html',
  styleUrls: ['./input-floating.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR, provideNgxMask()],
})
export class InputFloatingComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() size = 'lg';
  @Input() model!: string;
  @Input() label!: string;
  @Input() mask!: string;
  @Input() form!: NgForm;
  @Input() isReadOnly = false;
  @Input() isRequired = false;
  @Input() options: any[] = [];
  @Input() valueBind: string = 'id';
  @Input() textBind: string = 'name';

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
    this.form.controls[this.model].markAsTouched();
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
