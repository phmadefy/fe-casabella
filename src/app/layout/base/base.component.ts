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
  ],
  providers: [ApiService],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  loadingTerms = false;
  dataSource: any = { data: [] };
  userCurrent: any = {};

  termsPending: any[] = [];
  constructor(
    private service: ApiService,
    public tools: ToolsService,
    private dialog: Dialog
  ) {}

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getTerms();
    initFlowbite();
  }

  async getTerms() {
    this.loadingTerms = true;
    await this.service
      .getCustom(`v1/terms?type=login`)
      .then((res) => {
        this.dataSource = res;
        this.checkTerms();
      })
      .finally(() => (this.loadingTerms = false));
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
    }
  }

  openTerms() {
    const dialogRef = this.dialog.open<any>(ModalTermAcceptComponent, {
      width: '95%',
      maxWidth: '1055px',
      height: '90%',
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
}
