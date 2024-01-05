import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgForm,
} from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true,
};

@Component({
  selector: 'radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() size = 'lg';
  @Input() controlName!: string;
  @Input() controlValue!: string;
  @Input() form!: NgForm;
  @Input() label!: string;
  @Input() disabled = false;
  @Input() required = false;

  @Input() options = [
    { description: 'Sim', value: 1 },
    { description: 'Não', value: 0 },
  ];

  @Output() choose = new EventEmitter<any>();

  constructor(public tools: ToolsService) {}

  ngOnInit(): void {
    // this.innerValue = this.checked;
  }

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
    this.disabled = isDisabled;
  }
}
