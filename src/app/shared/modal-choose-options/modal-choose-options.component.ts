import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { ChooseOptionsModalConfig } from '../properties';

@Component({
  selector: 'app-modal-choose-options',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CheckboxComponent,
    ButtonCbComponent,
    InputSearchComponent,
  ],
  providers: [ApiService],
  templateUrl: './modal-choose-options.component.html',
  styleUrls: ['./modal-choose-options.component.scss'],
})
export class ModalChooseOptionsComponent {
  loading = false;
  filters: any = {};

  bindText!: any;
  bindValue!: any;

  dataSource: any[] = [];
  items: any[] = [];

  selected: any[] = [];

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: ChooseOptionsModalConfig
  ) {}

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
    this.bindValue = this.data?.bindValue;
    this.bindText = this.data?.bindText;

    if (this.data?.selected) {
      this.selected = this.data?.selected;
    }

    if (this.data?.filters) {
      this.filters = this.data?.filters;
    }

    if (this.data?.endpoint) {
      this.service.path = this.data?.endpoint;
      this.getList();
    }
  }

  getList() {
    this.loading = true;
    this.service
      .listing(this.filters)
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
        this.selected.push(item[this.bindValue]);
      }
    } else {
      const index = this.isChecked(item);
      if (index >= 0) {
        this.selected.splice(index, 1);
      }
    }

    console.log('selected', this.selected);
  }

  isChecked(item: any) {
    const index = this.selected.findIndex((e) => e == item[this.bindValue]);
    return index;
  }

  filter(event: any) {
    this.items = this._filter(event);
  }
}
