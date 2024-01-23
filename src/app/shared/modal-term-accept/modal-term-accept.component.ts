import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-term-accept',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, ButtonCbComponent],
  providers: [ApiService],
  templateUrl: './modal-term-accept.component.html',
  styleUrls: ['./modal-term-accept.component.scss'],
})
export class ModalTermAcceptComponent {
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    adaptiveHeight: false,
    autoplay: false,
  };

  dataSource: any[] = [];
  loading = false;

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    console.log('ModalTermAcceptComponent', data);

    this.dataSource = data ?? [];
  }

  prev(slickModalPartner: SlickCarouselComponent) {
    slickModalPartner.slickPrev();
  }
  next(slickModalPartner: SlickCarouselComponent) {
    slickModalPartner.slickNext();
  }

  accept(item: any, index: number) {
    this.loading = true;
    this.service
      .updateCustom(`v1/terms/${item.id}/accept`)
      .then((res) => {
        this.dataSource.splice(index, 1);
        this.checkTerms();
      })
      .finally(() => (this.loading = false));
  }

  reject(item: any) {
    this.dialogRef.close(false);
  }

  checkTerms() {
    if (this.dataSource.length <= 0) {
      location.reload();
      // this.dialogRef.close(true);
    }
  }
}
