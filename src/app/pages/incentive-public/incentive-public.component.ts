import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { IncentiveGalleryComponent } from '../admin/incentives/incentive-gallery/incentive-gallery.component';

@Component({
  selector: 'app-incentive-public',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
    CardImageComponent,
    IncentiveGalleryComponent,
    // TimelineComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-public.component.html',
  styleUrls: ['./incentive-public.component.scss'],
})
export class IncentivePublicComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };

  tab: string = 'my';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/incentives';
  }

  ngOnInit(): void {
    this.queryParamsObs = this.route.queryParams.subscribe((res: any) => {
      console.log('queryParams', res);
      if (res?.tab) {
        this.setTab(res.tab);
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsObs.unsubscribe();
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

  setTab(tab: string) {
    this.tab = tab;
    this.filters = { per_page: 30, page: 1 };
    if (tab == 'active') {
      this.filters.active = 1;
    } else if (tab == 'inactives') {
      this.filters.active = 0;
    } else if (tab == 'my') {
      this.filters.active = 0;
    }
    this.getList();
  }
}
