import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLikeComponent } from 'src/app/components/btn-like/btn-like.component';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'modal-nft-detail',
  standalone: true,
  imports: [CommonModule, BtnLikeComponent, DialogModule],
  templateUrl: './modal-nft-detail.component.html',
  styleUrls: ['./modal-nft-detail.component.scss'],
})
export class ModalNftDetailComponent {
  dados: any = {
    classifications: [],
    subclassifications: [],
    types: [],
    public: [],
  };
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      console.log('ModalNftDetailComponent', this.data);
      this.dados = this.data;
    }
  }

  getSubClassifications(item: any) {
    return this.dados?.subclassifications.map((t: any) => t.name).join(', ');
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
}
