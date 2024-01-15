import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ApiService } from 'src/app/services/api.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-forgot-password',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, InputFloatingComponent],
  providers: [ApiService],
  templateUrl: './modal-forgot-password.component.html',
  styleUrls: ['./modal-forgot-password.component.scss'],
})
export class ModalForgotPasswordComponent {
  loading = false;
  constructor(
    private service: ApiService,
    // public tools: ToolsService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  submit(form: NgForm) {
    this.loading = true;
    this.service
      .postCustom('v1/forgot-password', form.value)
      .then((res) => {
        this.dialogRef.close();
      })
      .finally(() => (this.loading = false));
  }
}
