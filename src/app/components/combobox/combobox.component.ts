import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToolsService } from 'src/app/services/tools.service';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboboxComponent),
  multi: true,
};

@Component({
  selector: 'combobox',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR],
})
export class ComboboxComponent {
  @Input() model!: string;
  @Input() label!: string;
  @Input() form!: NgForm;
  @Input() isReadOnly = false;
  @Input() isRequired = false;
  @Input() multiple = false;
  @Input() options: any[] = [];
  @Input() bindValue: string = 'id';
  @Input() bindText: string = 'name';
  @Input() bindImage!: string;
  @Input() size: string = 'lg';
  @Input() placeholder: string = ' ';
  @Input() notFoundText: string = 'Nada encontrado!';
  @Input() loading = false;
  @Input() autoClear = false;

  @Output() selectItem = new EventEmitter<any>();

  constructor(public tools: ToolsService) {}
  ngOnInit(): void {}

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
    // if (this.form && this.model && this.form.controls[this.model]) {
    //   this.form.controls[this.model].markAsTouched();
    // }
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  changeItem(event: any) {
    this.selectItem.emit(event);
    if (this.autoClear) {
      this.value = null;
    }
  }
}
