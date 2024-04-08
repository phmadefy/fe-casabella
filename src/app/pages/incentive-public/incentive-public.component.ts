import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { IncentiveGalleryComponent } from '../admin/incentives/incentive-gallery/incentive-gallery.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalIncentiveTermAcceptComponent } from 'src/app/shared/modal-incentive-term-accept/modal-incentive-term-accept.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ModalViewDocComponent } from 'src/app/shared/modal-view-doc/modal-view-doc.component';

@Component({
  selector: 'app-incentive-public',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    RouterLink,
    DropdownCbComponent,
    InputSearchComponent,
    CardImageComponent,
    IncentiveGalleryComponent,
    SpinnerComponent,
    // TimelineComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentive-public.component.html',
  styleUrls: ['./incentive-public.component.scss'],
})
export class IncentivePublicComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 30, page: 1 };

  tab: string = 'my';
  userCurrent: any = { terms: [] };

  gallery_id: any;
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/incentives';
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.gallery_id = this.route.snapshot.queryParamMap.get('g');

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

    if (this.userCurrent?.person?.type_person_id) {
      this.filters.type_person_id = this.userCurrent.person.type_person_id;
    }
    if (this.userCurrent?.person?.segment_id) {
      this.filters.segment_id = this.userCurrent.person.segment_id;
    }
    if (this.userCurrent?.person?.address?.city_id) {
      this.filters.city_id = this.userCurrent.person.address.city_id;
    }

    if (tab == 'active') {
      this.filters.status = 'active';
    } else if (tab == 'inactives') {
      this.filters.status = 'inactive';
    } else if (tab == 'my') {
      this.filters.status = 'my';
    }
    this.getList();
  }

  openIncentive(item: any) {
    console.log(
      'isViewOrParticipate',
      this.tools.isViewOrParticipate(item, this.userCurrent)
    );

    const isViewOrParticipate = this.tools.isViewOrParticipate(
      item,
      this.userCurrent
    );

    if (isViewOrParticipate == 'view') {
      this.toIncentive(item.id);
    } else {
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
  }

  async toIncentive(incentive_id: any) {
    await this.tools.route.navigate(['/incentivo/detalhe'], {
      state: { incentive_id },
    });
  }

  openRanking(item: any) {
    const dialogRef = this.dialog.open<any>(ModalViewDocComponent, {
      width: '95%',
      maxWidth: '700px',
      maxHeight: '90%',
      data: {
        file_url: item.image_ranking_url,
        path: item.image_ranking,
      },
    });
  }
}
