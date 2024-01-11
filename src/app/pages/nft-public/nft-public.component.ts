import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-nft-public',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
    NftCardComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-public.component.html',
  styleUrls: ['./nft-public.component.scss'],
})
export class NftPublicComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };

  tab: string = 'my';

  userCurrent: any = {};
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/nft';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
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
    if (tab == 'my') {
      this.filters.user_id = this.userCurrent.id;
    }
    if (tab == 'pending') {
      this.service.path = 'v1/transactions-nft';
      this.filters.status = 'pending';
      this.filters.reciver_id = this.userCurrent.id;
    } else {
      this.service.path = 'v1/nft';
    }
    this.getList();
  }
}
