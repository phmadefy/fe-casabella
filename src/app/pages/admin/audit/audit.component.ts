import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalProofTransactionComponent } from 'src/app/shared/modal-proof-transaction/modal-proof-transaction.component';
import * as moment from 'moment';

@Component({
  selector: 'app-audit',
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
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent {
  dataSource: any = { data: [] };
  loading = false;
  loadingExport = false;

  filters: any = { per_page: 50, page: 1 };

  tab: string = 'actives';
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/admin/audit';
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.service
      .listing({ ...this.filters, web: true })
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
    // this.tools.route.navigate([`/admin/audit/view`], {
    //   state: { contact_us_id: item.id },
    // });
  }

  changePagination(page: number, per_page: number) {
    this.filters = { ...this.filters, page, per_page };
    this.getList();
  }

  getType(item: any) {
    if (item.type == 'floral') {
      if (item.cashier_to && !item.cashier_from && !item.user_from) {
        return 'Depósito de Floral';
      } else {
        return 'transferência de Floral';
      }
    } else if (item.type == 'nft') {
      return 'Transferência de NFT';
    }

    return '';
  }

  openProof(item: any) {
    let data: any = {};
    if (item.type == 'floral') {
      data = {
        dados: { ...item.floral, transaction: item },
        type: 'floral',
      };
    } else if (item.type == 'nft') {
      data = {
        dados: { ...item.nft, transaction: item },
        type: 'floral',
      };
    }

    const dialogRef = this.dialog.open<any>(ModalProofTransactionComponent, {
      width: '95%',
      maxWidth: '1055px',
      maxHeight: '600px',
      data,
    });
  }

  export() {
    this.loadingExport = true;
    this.service
      .downloadBlobJson(this.service.baseUrl + '/v1/admin/audit', {
        ...this.filters,
      })
      .subscribe(
        (data: any) => {
          const blob = new Blob([data]);

          var downloadURL = window.URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          const now = moment().format('DD-MM-YYYY_hh-mm');
          link.download = `auditoria-${now}.csv`;
          link.click();
          link.remove();
          this.loadingExport = false;
        },
        () => {
          this.loadingExport = false;
        }
      );
  }
}
