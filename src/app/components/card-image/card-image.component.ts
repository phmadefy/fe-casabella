import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'card-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent {
  @Input() image: any;
  @Input() height = 'h-48';
  @Input() disabled = false;

  constructor(public tools: ToolsService) {}
}
