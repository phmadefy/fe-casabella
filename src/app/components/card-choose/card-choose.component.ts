import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ApiService } from 'src/app/services/api.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'card-choose',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, CheckboxComponent],
  providers: [ApiService],
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss'],
})
export class CardChooseComponent {
  loading = false;

  dataSource: any[] = [];
  items: any[] = [];
  // items!: Observable<any[]>;

  term!: string;
  termUpdate = new Subject<string>();

  selected: any[] = [];

  @Input() inputPlaceholder = '';
  @Input() endpoint = '';
  @Input() bindValue = '';
  @Input() bindText = '';
  @Input() name = '';

  @Output() choose = new EventEmitter<any>();

  constructor(private service: ApiService) {
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.path = this.endpoint;
    this.getList();
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
    this.choose.emit(this.selected);
  }

  isChecked(item: any) {
    const index = this.selected.findIndex((e) => e == item[this.bindValue]);
    return index;
  }

  filter(event: any) {
    this.items = this._filter(event);
  }
}
