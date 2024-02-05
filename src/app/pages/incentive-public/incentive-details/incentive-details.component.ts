import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalNftDetailComponent } from 'src/app/shared/modal-nft-detail/modal-nft-detail.component';
import { FormsModule, NgForm } from '@angular/forms';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';
import { ModalViewCommentsComponent } from 'src/app/shared/modal-view-comments/modal-view-comments.component';
import { ModalIncentiveTermAcceptComponent } from 'src/app/shared/modal-incentive-term-accept/modal-incentive-term-accept.component';

@Component({
  selector: 'app-incentive-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BtnLikeComponent,
    CardComponent,
    ButtonCbComponent,
    SlickCarouselModule,
    NftCardComponent,
  ],
  templateUrl: './incentive-details.component.html',
  styleUrls: ['./incentive-details.component.scss'],
})
export class IncentiveDetailsComponent {
  slideConfig = { slidesToShow: 5, slidesToScroll: 4 };
  userCurrent: any = {};

  dados: any = {};
  loading = false;

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/incentives';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    if (history.state?.incentive_id) {
      this.getDados(history.state?.incentive_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  openModalNFT(item: any) {
    const dialogRef = this.dialog.open<any>(ModalNftDetailComponent, {
      width: '95%',
      maxWidth: '1055px',
      // height: '90%',
      data: item,
    });
  }

  async sendReact(event: any) {
    this.loading = true;
    await this.service
      .updateCustom(`v1/incentives/${this.dados.id}/interaction`, {
        name: event,
      })
      .then(() => {
        this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  async sendComment(formComment: NgForm) {
    if (!formComment.valid) {
      return;
    }

    this.loading = true;
    await this.service
      .postCustom(
        `v1/incentives/${this.dados.id}/comment`,
        formComment.value
      )
      .then((res) => {
        formComment.resetForm();
        this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  openComments() {
    const dialogRef = this.dialog.open<any>(ModalViewCommentsComponent, {
      width: '95%',
      maxWidth: '850px',
      data: { ...this.dados, endpoint: 'v1/incentives' },
    });
  }

  openTerm() {
    const dialogRef = this.dialog.open<any>(ModalIncentiveTermAcceptComponent, {
      width: '95%',
      maxWidth: '1055px',
      data: { ...this.dados, accept: true },
    });
  }
}
