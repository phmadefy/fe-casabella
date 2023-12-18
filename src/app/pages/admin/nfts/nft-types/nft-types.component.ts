import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { MessageService } from 'src/app/services/message.service';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-nft-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
    ButtonCbComponent,
    SpinnerComponent,
  ],
  providers: [ApiService],
  templateUrl: './nft-types.component.html',
  styleUrls: ['./nft-types.component.scss'],
})
export class NftTypesComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 15, page: 1 };

  tab: string = 'active';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private messageService: MessageService // private dialog: Dialog
  ) {
    service.path = 'v1/admin/nft-type';
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

  async saveTypes(formSub: NgForm) {
    this.loading = true;
    await this.service
      .postCustom('v1/admin/nft-type', formSub.value)
      .then(async () => {
        formSub.resetForm();
        await this.getList();
      })
      .finally(() => (this.loading = false));
  }

  async deleteItem(item: any) {
    this.messageService
      .presentAlertConfirm(`Excluir o tipo: <b>${item.name}</b> ?`)
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
