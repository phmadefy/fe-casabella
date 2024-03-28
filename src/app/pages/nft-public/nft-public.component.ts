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
import { Dialog } from '@angular/cdk/dialog';
import { ModalNftApproveRefuseComponent } from 'src/app/shared/modal-nft-approve-refuse/modal-nft-approve-refuse.component';
import { ModalNftDetailComponent } from 'src/app/shared/modal-nft-detail/modal-nft-detail.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

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
    SpinnerComponent,
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
  rules: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/nft';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.rules = this.tools.getRules(this.userCurrent.group ?? []);

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
      // this.filters.reciver_id = this.userCurrent.id;
    } else {
      this.service.path = 'v1/nft';
    }
    this.getList();
  }

  openModalApproveRefuse(item: any, mode: string) {
    this.dialog
      .open<any>(ModalNftApproveRefuseComponent, {
        width: '95%',
        maxWidth: '500px',
        maxHeight: '90%',
        data: {
          item,
          mode,
          user: true,
          endpoint: `v1/nft/${item?.nft?.id}/approve`,
        },
      })
      .closed.subscribe((res) => {
        if (res) {
          this.getList();
        }
      });
  }

  isReceive(item: any) {
    return item?.from_user_id != this.userCurrent.id;
  }
  isSend(item: any) {
    return item?.from_user_id == this.userCurrent.id;
  }

  openNFT(item: any) {
    const dialogRef = this.dialog.open<any>(ModalNftDetailComponent, {
      width: '95%',
      maxWidth: '1055px',
      // height: '90%',
      data: item,
    });
  }
}
