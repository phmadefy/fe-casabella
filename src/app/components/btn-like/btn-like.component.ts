import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'btn-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-like.component.html',
  styleUrls: ['./btn-like.component.scss'],
})
export class BtnLikeComponent {
  active = false;
}
