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
  useExisting: forwardRef(() => InputFileComponent),
  multi: true,
};

@Component({
  selector: 'input-file',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR],
})
export class InputFileComponent implements ControlValueAccessor {
  @Input() required = false;
  @Input() disabled = false;
  @Input() form!: NgForm;
  @Input() controlName!: string;
  @Output() selectFile = new EventEmitter<any>();

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
    this.disabled = isDisabled;
  }

  fileUpload(event: any) {
    this.selectFile.emit(event.target.files);
  }
}
