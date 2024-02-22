import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';
import { ModalNftDetailComponent } from 'src/app/shared/modal-nft-detail/modal-nft-detail.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToolsService } from 'src/app/services/tools.service';

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
    SpinnerComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  slideConfig = { slidesToShow: 5, slidesToScroll: 4 };
  loadingNFT = false;
  loadingFeed = false;
  nfts: any[] = [];
  posts: any = { data: [] };

  userCurrent: any = {};
  rules: any[] = [];

  constructor(
    private service: ApiService,
    private dialog: Dialog,
    public tools: ToolsService
  ) {}
  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    this.rules = this.tools.getRules(this.userCurrent.group ?? []);
    console.log('rules', this.rules);

    if (this.tools.getRule('nft', this.rules)) {
      this.getNFTs();
    }
    this.getPosts();

    // window.addEventListener('resize', (event) => {
    //   console.log('A janela foi redimensionada!');
    //   console.log('Nova largura: ' + window.innerWidth);
    //   console.log('Nova altura: ' + window.innerHeight);
    // });

    if (this.tools.isMobileDevice()) {
      this.slideConfig = { slidesToShow: 2, slidesToScroll: 1 };
    }
  }

  getNFTs() {
    this.loadingNFT = true;
    this.service
      .getCustom('v1/nft', { perPage: 500 })
      .then((res) => {
        this.nfts = res?.data;
      })
      .finally(() => (this.loadingNFT = false));
  }

  getPosts() {
    this.loadingFeed = true;
    this.service
      .getCustom('v1/posts')
      .then((res) => {
        this.posts = res;
      })
      .finally(() => (this.loadingFeed = false));
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
      maxWidth: '1055px',
      // height: '90%',
      data: item,
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
