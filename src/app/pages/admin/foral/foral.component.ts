import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CardComponent } from 'src/app/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-foral',
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
  providers: [ApiService],

  templateUrl: './foral.component.html',
  styleUrls: ['./foral.component.scss'],
})
export class ForalComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 50, page: 1 };

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

    this.getList();
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
    // const dialogRef = this.dialog.open<any>(ModalApproveComponent, {
    //   width: '95%',
    //   maxWidth: '500px',
    //   maxHeight: '90%',
    //   data: {
    //     item,
    //     approved_at,
    //     title: approved_at
    //       ? 'Aprovar cadastro de usuário'
    //       : 'Reprovar cadastro de usuário',
    //   },
    // });
    // dialogRef.closed.subscribe((result) => {
    //   console.log('The dialog was closed', result);
    // });
  }

  changePagination(page: number, per_page: number) {
    this.filters = { ...this.filters, page, per_page };
    this.getList();
  }
}
