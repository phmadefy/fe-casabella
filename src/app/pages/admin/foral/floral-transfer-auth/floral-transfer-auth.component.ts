import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-floral-transfer-auth',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, InputSearchComponent],
  providers: [ApiService],
  templateUrl: './floral-transfer-auth.component.html',
  styleUrls: ['./floral-transfer-auth.component.scss'],
})
export class FloralTransferAuthComponent {
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
    service.path = 'v1/floral';
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
