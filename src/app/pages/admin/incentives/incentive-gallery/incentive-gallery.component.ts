import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { RouterLink } from '@angular/router';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';

@Component({
  selector: 'app-incentive-gallery',
  standalone: true,
  imports: [CommonModule, CardImageComponent, RouterLink, BtnLikeComponent],
  providers: [ApiService],
  templateUrl: './incentive-gallery.component.html',
  styleUrls: ['./incentive-gallery.component.scss'],
})
export class IncentiveGalleryComponent {
  dataSource: any = { data: [] };
  loading = false;

  filters: any = { per_page: 50, page: 1 };

  viewMode = false;

  constructor(private service: ApiService, public tools: ToolsService) {
    service.path = 'v1/incentives-gallery';
  }

  ngOnInit(): void {
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
}
