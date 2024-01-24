import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nft-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss'],
})
export class NftCardComponent {
  @Input() nft: any = {};
  @Input() size = 40;

  @Output() onClick = new EventEmitter<any>();
}
