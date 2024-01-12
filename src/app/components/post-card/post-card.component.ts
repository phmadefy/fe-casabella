import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { BtnLikeComponent } from '../btn-like/btn-like.component';
import { FormsModule } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, BtnLikeComponent],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() dados: any = {};

  constructor(public tools: ToolsService) {}
}
