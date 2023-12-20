import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-nft-search',
  standalone: true,
  imports: [CommonModule, ModalComponent, InputSearchComponent, FormsModule],
  providers: [ApiService],
  templateUrl: './modal-nft-search.component.html',
  styleUrls: ['./modal-nft-search.component.scss'],
})
export class ModalNftSearchComponent {
  dataSource: any = { data: [] };
  loading = false;
  filters: any = {};

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {
    service.path = 'v1/nft';
  }

  ngOnInit(): void {
    this.getList();
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
}
