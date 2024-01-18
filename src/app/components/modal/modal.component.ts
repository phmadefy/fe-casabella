import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: any = '';
  @Input() dialogRef!: DialogRef;
  @Input() data: any;
  @Input() loading = false;
}
