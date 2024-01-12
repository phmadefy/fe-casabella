import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';
import { ModalNftDetailComponent } from 'src/app/shared/modal-nft-detail/modal-nft-detail.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    NftCardComponent,
    ModalNftDetailComponent,
    DialogModule,
    PostCardComponent,
    SlickCarouselModule,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  nfts: any[] = [];
  posts: any = { data: [] };

  constructor(private service: ApiService, private dialog: Dialog) {}
  ngOnInit(): void {
    this.getNFTs();
    this.getPosts();
  }

  getNFTs() {
    this.service.getCustom('v1/nft', { perPage: 500 }).then((res) => {
      this.nfts = res?.data;
    });
  }

  getPosts() {
    this.service.getCustom('v1/posts').then((res) => {
      this.posts = res;
    });
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  openModalNFT(item: any) {
    const dialogRef = this.dialog.open<any>(ModalNftDetailComponent, {
      width: '95%',
      maxWidth: '850px',
      height: '90%',
      data: item,
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
