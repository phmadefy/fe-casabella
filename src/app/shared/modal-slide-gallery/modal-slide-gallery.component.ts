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
  selector: 'app-modal-slide-gallery',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  providers: [ApiService],
  templateUrl: './modal-slide-gallery.component.html',
  styleUrls: ['./modal-slide-gallery.component.scss'],
})
export class ModalSlideGalleryComponent {
  slideConfig: any = {
    // slidesToShow: 1,
    // arrows: false,
    // dots: true,
    // adaptiveHeight: true,
    // respondTo: 'slider',
    // autoplay: false,
    // infinite: false,
    // speed: 300,
    // centerMode: true,
    // variableWidth: true,
  };

  dataSource: any[] = [];
  active = 0;
  loading = false;

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dataSource = this.data?.images ?? [];
    this.slideConfig.initialSlide = this.data?.active ?? 0;
  }

  prev(slickModal: SlickCarouselComponent) {
    slickModal.slickPrev();
  }
  next(slickModal: SlickCarouselComponent) {
    slickModal.slickNext();
  }
}
