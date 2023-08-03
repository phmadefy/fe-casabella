import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, NftCardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {}
