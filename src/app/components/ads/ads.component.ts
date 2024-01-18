import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  providers: [ApiService],
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent {
  dataSource: any = { data: [] };
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    adaptiveHeight: false,
    autoplay: true,
  };

  constructor(private service: ApiService) {
    // service.path = 'v1/my-balance-floral';
  }

  ngOnInit(): void {
    this.service.getCustom('v1/partners', { status: 'active' }).then((res) => {
      this.dataSource = res;
    });
  }
}
