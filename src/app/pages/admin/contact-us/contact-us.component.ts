import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    SpinnerComponent,
    RouterLink,
    InputSearchComponent,
    PaginationComponent,
  ],
  providers: [ApiService],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  dataSource: any = { data: [] };
  loading = false;

  filters: any = { per_page: 50, page: 1 };

  tab: string = 'actives';
  constructor(private service: ApiService, public tools: ToolsService) {
    service.path = 'v1/tickets';
  }

  ngOnInit(): void {
    this.getList();
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
    this.tools.route.navigate([`/admin/contact-us/detalhes`], {
      state: { contact_us_id: item.id },
    });
  }

  changePagination(page: number, per_page: number) {
    this.filters = { ...this.filters, page, per_page };
    this.getList();
  }
}
