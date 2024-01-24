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

@Component({
  selector: 'app-incentive-details',
  standalone: true,
  imports: [
    CommonModule,
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
}
