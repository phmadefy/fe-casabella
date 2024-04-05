import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'alert-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-display.component.html',
  styleUrls: ['./alert-display.component.scss'],
})
export class AlertDisplayComponent {
  @Input() title!: string;
  @Input() type = 'warning';
}
