import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'dropdown-cb',
  standalone: true,
  imports: [CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  providers: [],
  templateUrl: './dropdown-cb.component.html',
  styleUrls: ['./dropdown-cb.component.scss'],
})
export class DropdownCbComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() classes = '';
  @Input() size = '';
  @Input() btnCustomLabel!: string;
  @Input() btnCustomIcon!: string;
  @Input() btnCustom = false;
  @Input() btnEdit = false;
  @Input() btnDelete = false;

  @Output() onCustom = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
}
