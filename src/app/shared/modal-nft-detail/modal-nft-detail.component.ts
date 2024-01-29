import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'modal-nft-detail',
  standalone: true,
  imports: [CommonModule, BtnLikeComponent, DialogModule],
  providers: [ApiService],
  templateUrl: './modal-nft-detail.component.html',
  styleUrls: ['./modal-nft-detail.component.scss'],
})
export class ModalNftDetailComponent {
  loading = false;

  dados: any = {
    classifications: [],
    subclassifications: [],
    types: [],
    public: [],
  };

  userCurrent: any = {};
  rules: any[] = [];

  constructor(
    private service: ApiService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    public tools: ToolsService
  ) {}

  async ngOnInit() {
    this.userCurrent = await this.tools.getCurrentUser();
    this.rules = this.tools.getRules(this.userCurrent.group ?? []);
    if (this.data) {
      this.dados = this.data;
      this.getDados(this.data.id);
    }
  }

  async getDados(id: any) {
    this.loading = true;
    await this.service
      .getCustom(`v1/nft/${id}`)
      .then((res) => {
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  getSubClassifications(item: any) {
    return this.dados?.subclassifications
      .filter((s: any) => s.nft_classification_id == item.id)
      .map((t: any) => t.name)
      .join(', ');
  }

  getTypes() {
    return this.dados.types.map((t: any) => t.name).join(',');
  }

  openEdit() {
    this.tools.route.navigate(['/admin/nfts/editar'], {
      state: { nft_id: this.dados.id },
    });
    this.dialogRef.close();
  }

  openTransfer() {
    this.tools.route.navigate(['/nfts/transferir'], {
      state: { nft_id: this.dados.id },
    });
    this.dialogRef.close();
  }

  getCampaigns(incentives: any[]) {
    return incentives.map((i) => i.name).join(', ');
  }

  async sendReact(event: any) {
    this.loading = true;
    await this.service
      .updateCustom(`v1/nft/${this.dados.id}/interaction`, {
        interaction: event,
      })
      .then(() => {
        this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }
}
