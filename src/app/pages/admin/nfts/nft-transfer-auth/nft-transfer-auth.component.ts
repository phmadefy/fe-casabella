import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-nft-transfer-auth',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, InputSearchComponent],
  providers: [ApiService],
  templateUrl: './nft-transfer-auth.component.html',
  styleUrls: ['./nft-transfer-auth.component.scss'],
})
export class NftTransferAuthComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };

  tab = 'authorize';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/admin/nfts/audit/all';
  }

  ngOnInit(): void {
    this.queryParamsObs = this.route.queryParams.subscribe((res: any) => {
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
    this.filters.status = tab;
    this.getList();
  }
}
