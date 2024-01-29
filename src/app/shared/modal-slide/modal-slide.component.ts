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

  prev(slickModal: SlickCarouselComponent) {
    slickModal.slickPrev();
  }
  next(slickModal: SlickCarouselComponent) {
    slickModal.slickNext();
  }
}
