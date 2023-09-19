import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'button-cb',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button-cb.component.html',
  styleUrls: ['./button-cb.component.scss'],
})
export class ButtonCbComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() label!: string;
  @Input() classes = '';
  @Input() type = 'button';

  @Output() onClick = new EventEmitter<any>();
}
