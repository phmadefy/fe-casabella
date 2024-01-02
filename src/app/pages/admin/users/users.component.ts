import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalApproveComponent } from './modal-approve/modal-approve.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormsModule,
    SpinnerComponent,
    RouterLink,
    DialogModule,
    InputSearchComponent,
    PaginationComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ApiService],
})
export class UsersComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 50, page: 1, search: '' };

  tab: string = 'actives';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/users';
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

  edit(item: any) {
    this.tools.route.navigate([`/admin/users/edit`], {
      state: { user_id: item.id },
    });
  }

  approve(item: any, approved_at = true) {
    const dialogRef = this.dialog.open<any>(ModalApproveComponent, {
      width: '95%',
      maxWidth: '500px',
      maxHeight: '90%',
      data: {
        item,
        approved_at,
        title: approved_at
          ? 'Aprovar cadastro de usuário'
          : 'Reprovar cadastro de usuário',
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.getList();
      }
    });
    // this.service.update(`v1/users/${item.id}/update-status`, {
    //   approved_at,
    // });
  }

  changePagination(page: number, per_page: number) {
    this.filters = { ...this.filters, page, per_page };
    this.getList();
  }
}
