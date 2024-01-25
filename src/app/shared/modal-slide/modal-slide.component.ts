import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-slide',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './modal-slide.component.html',
  styleUrls: ['./modal-slide.component.scss'],
})
export class ModalSlideComponent {
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
    console.log('ModalSlideComponent', data);

    this.dataSource = data ?? [];
  }

  prev(slickModalPartner: SlickCarouselComponent) {
    slickModalPartner.slickPrev();
  }
  next(slickModalPartner: SlickCarouselComponent) {
    slickModalPartner.slickNext();
  }
}
