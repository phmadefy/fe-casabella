import { Component } from '@angular/core';
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
        this.nft = {
          id: 1,
          title: 'Macaco Romano',
          image: 'assets/nft1.jpg',
          description:
            'Considerado uma das coleções de NFT mais importantes e valiosas do mercado, os avatares da Bored Ape Yacht Club (BAYC) se espalharam rapidamente pela internet — e se tornaram uma referência aos tokens não fungíveis. Com a popularização dos termos relacionados às criptomoedas e às polêmicas ligadas ao tema, a sigla se tornou a palavra de 2021.',
        };
      }
    });
  }
}
