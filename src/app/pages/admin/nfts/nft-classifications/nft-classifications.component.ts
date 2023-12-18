import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nft-classifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-classifications.component.html',
  styleUrls: ['./nft-classifications.component.scss'],
})
export class NftClassificationsComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 15, page: 1 };

  tab: string = 'active';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/admin/nft-classification';
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
    this.filters.status = tab;
    this.getList();
  }

  openEdit(item: any) {
    this.router.navigate(['/admin/nfts/classifications/edit'], {
      state: { nft_classification_id: item.id },
    });
  }
  openDelete(item: any) {
    this.messageService
      .presentAlertConfirm(`Excluir a classificação: <b>${item.name}</b> ?`)
      .closed.subscribe((res) => {
        if (res) {
          this.delete(item.id);
        }
      });
  }

  async delete(id: any) {
    this.loading = true;
    await this.service
      .delete(id)
      .then((res) => {
        this.getList();
      })
      .finally(() => (this.loading = false));
  }
}
