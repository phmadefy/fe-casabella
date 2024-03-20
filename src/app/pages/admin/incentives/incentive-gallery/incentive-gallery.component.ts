import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { RouterLink } from '@angular/router';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalSlideGalleryComponent } from 'src/app/shared/modal-slide-gallery/modal-slide-gallery.component';

@Component({
  selector: 'app-incentive-gallery',
  standalone: true,
  imports: [
    CommonModule,
    CardImageComponent,
    RouterLink,
    BtnLikeComponent,
    SpinnerComponent,
    CardComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-gallery.component.html',
  styleUrls: ['./incentive-gallery.component.scss'],
})
export class IncentiveGalleryComponent {
  dataSource: any = { data: [] };
  loading = false;

  filters: any = { per_page: 50, page: 1 };

  gallery: any = {};

  userCurrent: any = {};

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/incentives-gallery';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    this.getList();
  }

  getList() {
    this.loading = true;
    this.service
      .listing(this.filters)
      .then((res) => {
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }

  openView(item: any) {
    this.loading = true;
    this.service
      .show(item.id)
      .then((res) => {
        this.gallery = res;
      })
      .finally(() => (this.loading = false));
  }

  openSlideGallery(index: number, images: any[]) {
    const dialogRef = this.dialog.open<any>(ModalSlideGalleryComponent, {
      // width: '95%',
      maxWidth: '550px',
      height: '90%',
      maxHeight: '600px',
      data: { active: index, images },
      disableClose: true,
    });
  }

  async sendReact(event: any, item: any) {
    // this.loading = true;
    await this.service
      .updateCustom(`v1/incentives-gallery/${item.id}/interaction`, {
        interaction: event,
      })
      .then((res) => {
        console.log('sendReact', res);

        const index = this.dataSource.data.findIndex(
          (f: any) => f.id == item.id
        );
        if (index >= 0) {
          const indexInteraction = this.dataSource?.data[
            index
          ]?.interactions.findIndex((f: any) => f.user_id == res.user_id);
          if (indexInteraction >= 0) {
            this.dataSource.data[index].interactions[indexInteraction] = res;
          } else {
            this.dataSource?.data[index]?.interactions.push(res);
          }
        }

        // this.getDados(this.dados.id);
      });
    // .finally(() => (this.loading = false));
  }
}
