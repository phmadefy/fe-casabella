import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() image!: string;
  @Input() size = '48';

  @Output() changeImage = new EventEmitter<any>();

  onFileSelected(event: any) {
    this.changeImage.emit(event);
  }
}
