import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ToolsService } from 'src/app/services/tools.service';
import { NgxMaskPipe } from 'ngx-mask';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';

@Component({
  selector: 'app-modal-approve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    DialogModule,
    NgxMaskPipe,
    SelectDefaultComponent,
    ButtonCbComponent,
  ],
  providers: [ApiService],
  templateUrl: './modal-approve.component.html',
  styleUrls: ['./modal-approve.component.scss'],
})
export class ModalApproveComponent extends AbstractForms {
  dados: any = {};
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    public tools: ToolsService,
    service: ApiService
  ) {
    super(service);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dados.id = this.data.item.id;
    this.dados.approved_at = this.data.approved_at;
  }

  submit(): void {
    this.loading = true;
    this.service
      .updateCustom(`v1/users/${this.dados.id}/update-status`, this.dados)
      .then((res) => this.dialogRef.close(true))
      .finally(() => (this.loading = false));
  }
  finish(result: any): void {}
}
