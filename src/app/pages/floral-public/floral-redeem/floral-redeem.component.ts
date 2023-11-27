import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { RouterLink } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { AlertDisplayComponent } from 'src/app/components/alert-display/alert-display.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AbstractForms } from 'src/app/shared/abstract-form';

@Component({
  selector: 'app-floral-redeem',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    ButtonCbComponent,
    RouterLink,
    NgxCurrencyDirective,
    AlertDisplayComponent,
  ],
  providers: [ApiService],
  templateUrl: './floral-redeem.component.html',
  styleUrls: ['./floral-redeem.component.scss'],
})
export class FloralRedeemComponent extends AbstractForms {
  dados: any = { mode: 'products' };
  types = [
    { id: 'definitiva', description: 'Definitiva' },
    { id: 'temporaria', description: 'Temporária' },
  ];

  userCurrent: any = {};
  modo = 'user';
  constructor(service: ApiService, public tools: ToolsService) {
    service.path = 'v1/admin/nfts';
    super(service);
  }

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    if (this.tools.checkRouteContainsAdmin()) {
      this.modo = 'admin';
    }
  }

  override submit(): void {
    // if (this.dados.id) {
    //   this.update(this.dados, this.dados.id);
    // } else {
    //   this.create(this.dados);
    // }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    // this.getDados(result.id);
  }
}
