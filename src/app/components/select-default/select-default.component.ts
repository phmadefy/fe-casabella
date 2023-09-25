import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgForm,
} from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';
import { ComboboxComponent } from '../combobox/combobox.component';

const INPUT_FLOATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectDefaultComponent),
  multi: true,
};

@Component({
  selector: 'select-default',
  standalone: true,
  imports: [CommonModule, FormsModule, ComboboxComponent],
  templateUrl: './select-default.component.html',
  styleUrls: ['./select-default.component.scss'],
  providers: [INPUT_FLOATING_VALUE_ACCESSOR, ApiService],
})
export class SelectDefaultComponent implements ControlValueAccessor {
  loading = false;

  dataSource: any[] = [];

  @Input() label!: string;
  @Input() form!: NgForm;
  @Input() inputPlaceholder = '';
  @Input() endpoint = '';
  @Input() bindValue = '';
  @Input() bindText = '';
  @Input() size = 'md';
  @Input() name = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() search = false;
  @Input() all = false;
  @Input() multiple = false;

  @Output() selectItem = new EventEmitter<any>();

  constructor(private service: ApiService, public tools: ToolsService) {}

  ngOnInit(): void {
    this.service.path = this.endpoint;
    this.getList();
  }

  getList() {
    this.loading = true;
    this.service
      .listing()
      .then((res) => {
        this.dataSource = res.data;
      })
      .finally(() => (this.loading = false));
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
