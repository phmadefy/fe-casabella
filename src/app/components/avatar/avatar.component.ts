import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';

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
  @Input() disabled = false;

  @Output() changeImage = new EventEmitter<any>();

  constructor(private tools: ToolsService) {}

  async onFileSelected(event: any) {
    this.image = await this.tools.toBase64(event?.target?.files[0]);
    this.changeImage.emit(event);
  }
}
