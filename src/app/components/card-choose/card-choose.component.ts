import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonCbComponent } from '../button-cb/button-cb.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalChooseOptionsComponent } from 'src/app/shared/modal-choose-options/modal-choose-options.component';
import { ChooseOptionsModalConfig } from 'src/app/shared/properties';

@Component({
  selector: 'card-choose',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    ButtonCbComponent,
  ],
  providers: [ApiService],
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss'],
})
export class CardChooseComponent {
  @Input() loading = false;

  dataSource: any[] = [];
  items: any[] = [];
  // items!: Observable<any[]>;

  term!: string;
  termUpdate = new Subject<string>();

  selectedValues: any[] = [];

  @Input() selected: any[] = [];
  @Input() selectedOptions: any[] = [];

  @Input() inputPlaceholder = '';
  @Input() endpoint!: string;
  @Input() bindValue = '';
  @Input() bindText = '';
  @Input() bindItemsProp!: string;
  @Input() name = '';
  @Input() showBtn = false;
  @Input() labelBtn = '';

  @Output() choose = new EventEmitter<any>();
  @Output() chooseOptions = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();

  @Input() chooseOptionsModalConfig!: ChooseOptionsModalConfig;
  @Input() filterBindKey: any;
  @Input() filterBindValue: any;

  constructor(private service: ApiService, private dialog: Dialog) {
    // this.items = this.termUpdate.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.dataSource.filter((item: any) =>
      this._normalizeValue(item[this.bindText]).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    if (this.endpoint) {
      this.service.path = this.endpoint;
      this.getList();
    }

    if (this.selected?.length > 0) {
      this.selectedValues = this.selected;
    }
    if (this.selectedOptions?.length > 0) {
      this.chooseOptionsModalConfig.selected = this.selectedOptions;
    }
  }

  getList() {
    this.loading = true;
    this.service
      .listing()
      .then((res) => {
        this.dataSource = res.data;
        this.items = res.data;
      })
      .finally(() => (this.loading = false));
  }

  getName(value1: any, value2: any) {
    return `${value1}${value2}`;
  }

  checked(event: any, item: any) {
    console.log('checked item', item);

    if (event) {
      if (this.isChecked(item) < 0) {
        this.selectedValues.push(item[this.bindValue]);

        if (this.bindItemsProp && item[this.bindItemsProp]) {
          this.openModalItems(item);
        }
      }
    } else {
      const index = this.isChecked(item);
      if (index >= 0) {
        this.selectedValues.splice(index, 1);
      }
    }

    console.log('selectedValues', this.selectedValues);
    this.choose.emit(this.selectedValues);
  }

  isChecked(item: any) {
    const index = this.selectedValues.findIndex(
      (e) => e == item[this.bindValue]
    );
    return index;
  }

  filter(event: any) {
    this.items = this._filter(event);
  }

  openModalItems(item: any) {
    this.chooseOptionsModalConfig.title += ` ${item[this.bindText]}`;
    this.chooseOptionsModalConfig.filters = {
      [this.filterBindKey]: item[this.filterBindValue],
    };

    const dialogRef = this.dialog.open<any>(ModalChooseOptionsComponent, {
      width: '95%',
      maxWidth: '500px',
      maxHeight: '90%',
      data: this.chooseOptionsModalConfig,
    });

    dialogRef.closed.subscribe((res) => {
      if (res) {
        this.chooseOptions.emit(res);
      }
    });
  }
}
