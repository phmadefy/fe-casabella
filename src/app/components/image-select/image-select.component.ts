import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';

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
  @Output() remove = new EventEmitter<any>();

  constructor(private tools: ToolsService) {}
  ngOnInit(): void {
    console.log('image', this.image);
  }

  async onFileSelected(event: any) {
    if (event?.target?.files) {
      this.image = await this.tools.toBase64(event?.target?.files[0]);
      this.changeImage.emit(event?.target?.files);
    }
  }

  onRemove() {
    this.image = '';
    this.remove.emit();
  }
}
