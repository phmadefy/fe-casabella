import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'btn-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-like.component.html',
  styleUrls: ['./btn-like.component.scss'],
})
export class BtnLikeComponent {
  active = false;

  ngOnInit(): void {
    initFlowbite();
  }
}
