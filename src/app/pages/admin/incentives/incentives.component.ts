import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Subscription } from 'rxjs';
import { CardImageComponent } from 'src/app/components/card-image/card-image.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { IncentiveGalleryComponent } from './incentive-gallery/incentive-gallery.component';
import { ModalViewSubscribeIncentiveComponent } from 'src/app/shared/modal-view-subscribe-incentive/modal-view-subscribe-incentive.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-incentives',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FormsModule,
    SpinnerComponent,
    RouterLink,
    CardImageComponent,
    TermsOfUseComponent,
    IncentiveGalleryComponent,
  ],
  providers: [ApiService],
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.scss'],
})
export class IncentivesComponent {
  dataSource: any = { data: [] };
  queryParamsObs!: Subscription;
  loading = false;

  filters: any = { per_page: 50, page: 1 };

  tab: string = 'all';
  constructor(
    private route: ActivatedRoute,
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {
    service.path = 'v1/incentives';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.queryParamsObs = this.route.queryParams.subscribe((res: any) => {
      console.log('queryParams', res);
      if (res?.tab) {
        this.tab = res?.tab;

        if (this.tab == 'all') {
          this.getList();
        }
      }
    });
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
  }

  edit(item: any) {
    this.tools.route.navigate([`/admin/users/edit`], {
      state: { user_id: item.id },
    });
  }

  openParticipants(item: any) {
    const dialogRef = this.dialog.open<any>(
      ModalViewSubscribeIncentiveComponent,
      {
        width: '95%',
        maxWidth: '950px',
        maxHeight: '90%',
        data: { id: item.id },
      }
    );
  }
}
