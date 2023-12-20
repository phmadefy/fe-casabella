import { Component, EventEmitter, Output } from '@angular/core';
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
  nft: any = {};

  @Output() chooseNFT = new EventEmitter<any>();

  constructor(private dialog: Dialog) {}

  openModalNFTSearch() {
    const dialogRef = this.dialog.open<any>(ModalNftSearchComponent, {
      maxWidth: '335px',
      width: '95%',
      height: '90%',
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.nft = result;
        this.chooseNFT.emit(result);
      }
    });
  }

  clearChoose() {
    this.nft = {};
    this.chooseNFT.emit();
  }
}
