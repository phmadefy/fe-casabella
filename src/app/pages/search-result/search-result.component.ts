import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { ToolsService } from 'src/app/services/tools.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalIncentiveTermAcceptComponent } from 'src/app/shared/modal-incentive-term-accept/modal-incentive-term-accept.component';
import { NftCardComponent } from 'src/app/components/nft-card/nft-card.component';
import { ModalNftDetailComponent } from 'src/app/shared/modal-nft-detail/modal-nft-detail.component';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputSearchComponent,
    CardImageComponent,
    NftCardComponent,
    PostCardComponent,
    SpinnerComponent,
  ],
  providers: [ApiService],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  dataSource: any = {};
  loading = false;
  filters: any = {};

  userCurrent: any = { terms: [] };

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    // service.path = 'v1/users';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();

    if (history?.state?.search) {
      this.filters.search = history.state.search;
      this.getList();
    }
  }

  getList() {
    this.loading = true;
    this.service
      .getCustom('v1/search', this.filters)
      .then((res) => {
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }

  openIncentive(item: any) {
    const find = this.userCurrent.terms.find(
      (t: any) => t.id == item?.term?.id
    );

    if (find) {
      this.toIncentive(item.id);
    } else {
      const dialogRef = this.dialog.open<any>(
        ModalIncentiveTermAcceptComponent,
        {
          width: '95%',
          maxWidth: '1055px',
          data: item,
          disableClose: true,
        }
      );

      dialogRef.closed.subscribe(async (res) => {
        if (res) {
          this.toIncentive(item.id);
          location.reload();
        }
      });
    }
  }

  async toIncentive(incentive_id: any) {
    await this.tools.route.navigate(['/incentivo/detalhe'], {
      state: { incentive_id },
    });
  }

  openModalNFT(item: any) {
    const dialogRef = this.dialog.open<any>(ModalNftDetailComponent, {
      width: '95%',
      maxWidth: '1055px',
      // height: '90%',
      data: item,
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
