import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';

@Component({
  selector: 'modal-nft-detail',
  standalone: true,
  imports: [CommonModule, BtnLikeComponent],
  templateUrl: './modal-nft-detail.component.html',
  styleUrls: ['./modal-nft-detail.component.scss'],
})
export class ModalNftDetailComponent {}
