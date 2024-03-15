import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FloralPriceComponent } from 'src/app/components/floral-price/floral-price.component';
import { MyFloralComponent } from 'src/app/components/my-floral/my-floral.component';
import { AdsComponent } from 'src/app/components/ads/ads.component';
import { initFlowbite } from 'flowbite';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalTermAcceptComponent } from 'src/app/shared/modal-term-accept/modal-term-accept.component';
import { ModalSlideComponent } from 'src/app/shared/modal-slide/modal-slide.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ChatPopupComponent } from 'src/app/components/chat-popup/chat-popup.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FloralPriceComponent,
    MyFloralComponent,
    AdsComponent,
    SpinnerComponent,
    ChatPopupComponent,
  ],
  providers: [ApiService],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  loading = false;
  dataSource: any = { data: [] };
  userCurrent: any = {};

  termsPending: any[] = [];

  hiddenChat: any;

  overlay = true;
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {}

  async ngOnInit() {
    this.userCurrent = await this.tools
      .getCurrentUser()
      .finally(() => (this.overlay = false));

    if (this.userCurrent?.group) {
      for (const group of this.userCurrent.group) {
        const rule = group?.rules?.find((r: any) => r.name == 'chat');
        if (rule) {
          this.hiddenChat = true;
          break;
        }
      }

      if (this.hiddenChat == undefined) {
        this.hiddenChat = false;
      }
    }

    await this.getTerms();
    setTimeout(() => {
      initFlowbite();
    }, 500);
  }

  async getTerms() {
    this.loading = true;
    await this.service
      .getCustom(`v1/terms?type=login`)
      .then((res) => {
        this.dataSource = res;
        this.checkTerms();
      })
      .finally(() => (this.loading = false));
  }

  async checkTerms() {
    let terms: any[] = [];
    for (const term of this.dataSource.data) {
      const find = this.userCurrent?.terms?.find((t: any) => t.id == term.id);
      if (!find) {
        terms.push(term);
      }
    }

    this.termsPending = terms;

    if (this.termsPending.length > 0) {
      this.openTerms();
    } else {
      // this.getIncentivesBanners();
    }
  }

  openTerms() {
    const dialogRef = this.dialog.open<any>(ModalTermAcceptComponent, {
      width: '95%',
      maxWidth: '1055px',
      height: '95%',
      maxHeight: '600px',
      data: this.termsPending,
      disableClose: true,
    });

    dialogRef.closed.subscribe(async (res) => {
      if (!res) {
        this.tools.logout();
      }
    });
  }

  getIncentivesBanners() {
    this.loading = true;
    this.service
      .getCustom(`v1/incentives`, {
        has_banner: true,
        limit: 500,
        active: 1,
      })
      .then((res) => {
        const banners: any[] = res?.data?.map((i: any) => {
          return { image_url: i.image_feed_url };
        });

        this.openIncentivesBanners(banners);
      })
      .finally(() => (this.loading = false));
  }

  openIncentivesBanners(banners: any[]) {
    const dialogRef = this.dialog.open<any>(ModalSlideComponent, {
      width: '95%',
      maxWidth: '900px',
      height: '90%',
      maxHeight: '600px',
      data: banners,
    });
  }
}
