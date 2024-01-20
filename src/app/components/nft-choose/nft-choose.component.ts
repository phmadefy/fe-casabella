import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalNftSearchComponent } from 'src/app/shared/modal-nft-search/modal-nft-search.component';

@Component({
  selector: 'app-nft-choose',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './nft-choose.component.html',
  styleUrls: ['./nft-choose.component.scss'],
})
export class NftChooseComponent {
  @Input() nft: any = {};

  @Input() user_id: any;

  @Output() chooseNFT = new EventEmitter<any>();

  constructor(private dialog: Dialog) {}

  openModalNFTSearch() {
    const dialogRef = this.dialog.open<any>(ModalNftSearchComponent, {
      maxWidth: '350px',
      width: '95%',
      height: '90%',
      data: { user_id: this.user_id },
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.setNFT(result);
      }
    });
  }

  setNFT(nft: any) {
    this.nft = nft;
    this.chooseNFT.emit(nft);
  }

  clearChoose() {
    this.nft = {};
    this.chooseNFT.emit();
  }
}
