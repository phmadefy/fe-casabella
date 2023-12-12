import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'image-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent {
  @Input() image!: string;
  @Input() width = 'w-full';
  @Input() height = 'h-32';

  @Output() onClick = new EventEmitter<any>();

  constructor(public tools: ToolsService) {}
}
