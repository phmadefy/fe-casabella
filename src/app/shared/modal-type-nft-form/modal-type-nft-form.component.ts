import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-type-nft-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ButtonCbComponent,
    InputFloatingComponent,
  ],
  providers: [ApiService],
  templateUrl: './modal-type-nft-form.component.html',
  styleUrls: ['./modal-type-nft-form.component.scss'],
})
export class ModalTypeNftFormComponent {
  loading = false;

  dados: any = {};

  constructor(
    private service: ApiService,
    public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.service.path = `v1/admin/nft-type`;
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.loading = true;
    this.service
      .create(this.dados)
      .then((res) => {
        this.dialogRef.close(true);
      })
      .finally(() => (this.loading = false));
  }
}
