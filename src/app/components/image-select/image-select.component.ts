import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'image-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent {
  @Input() image!: string;
  @Input() size = '48';
  @Input() title = 'Selecione a imagem';
  @Input() subtitle = '800 x 540';
  @Input() name!: string;

  @Output() changeImage = new EventEmitter<any>();

  onFileSelected(event: any) {
    this.changeImage.emit(event);
  }
}
