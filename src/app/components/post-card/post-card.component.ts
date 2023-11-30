import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { BtnLikeComponent } from '../btn-like/btn-like.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, BtnLikeComponent],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {}
