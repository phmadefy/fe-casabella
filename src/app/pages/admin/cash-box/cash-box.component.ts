import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Dialog } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cash-box',
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
  templateUrl: './cash-box.component.html',
  styleUrls: ['./cash-box.component.scss'],
})
export class CashBoxComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 15, page: 1 };

  tab: string = 'active';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService // private dialog: Dialog
  ) {
    service.path = 'v1/admin/cashiers';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.queryParamsObs = this.route.queryParams.subscribe((res: any) => {
      console.log('queryParams', res);
      if (res?.tab) {
        this.setTab(res.tab);
      }
    });

    // this.getList();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
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
    this.tools.route.navigate(['/admin/cash-box/edit'], {
      state: { cashier_id: item.id },
    });
  }
  openDelete(item: any) {
    this.messageService
      .presentAlertConfirm(`Excluir o Caixa: <b>${item.name}</b> ?`)
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
