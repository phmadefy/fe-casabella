import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalFloralApproveRefuseComponent } from 'src/app/shared/modal-floral-approve-refuse/modal-floral-approve-refuse.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-floral-public',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
    TimelineComponent,
  ],
  providers: [ApiService],
  templateUrl: './floral-public.component.html',
  styleUrls: ['./floral-public.component.scss'],
})
export class FloralPublicComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };
  filtersExtract: any = { per_page: 30, page: 1 };

  extract: any = { data: [] };
  userCurrent: any = {};

  tab: string = 'my';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/floral';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.filtersExtract = {
      ...this.filtersExtract,
      user_id: this.userCurrent?.id,
    };

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

  getExtract() {
    this.loading = true;
    this.service
      .getCustom(`v1/floral/extract`, this.filtersExtract)
      .then((res) => {
        this.extract = res;
      })
      .finally(() => (this.loading = false));
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
    if (tab == 'my') {
      this.getExtract();
    } else {
      if (tab == 'pending') {
        this.filters.status = tab;
      }
      this.getList();
    }
  }

  openModalApproveRefuse(item: any, mode: string) {
    this.dialog
      .open<any>(ModalFloralApproveRefuseComponent, {
        width: '95%',
        maxWidth: '500px',
        maxHeight: '90%',
        data: {
          item,
          mode,
          user: true,
          endpoint: `v1/floral/${item.id}/approve`,
        },
      })
      .closed.subscribe((res) => {
        if (res) {
          this.getList();
        }
      });
  }

  changeMovement(movement: string) {
    if (this.filtersExtract.movement == movement) {
      delete this.filtersExtract.movement;
    } else {
      this.filtersExtract.movement = movement;
    }

    this.getExtract();
  }

  isReceive(item: any) {
    return item?.from_user_id != this.userCurrent.id;
  }
  isSend(item: any) {
    return item?.from_user_id == this.userCurrent.id;
  }
  isRescue(item: any) {
    return item?.rescue_type != null ? true : false;
  }
}
