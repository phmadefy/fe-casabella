import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ApiService } from 'src/app/services/api.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MessageService } from 'src/app/services/message.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-modal-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
  ],
  providers: [ApiService],
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
})
export class ModalChangePasswordComponent {
  loading = false;
  constructor(
    private service: ApiService,
    public messageService: MessageService,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (
      form.controls['new_password'].value != form.controls['confirmPassword'].value
    ) {
      return this.messageService.toastError('As senhas não correspondem.');
    }

    this.loading = true;
    this.service
      .postCustom('v1/change-password', form.value)
      .then((res) => {
        this.dialogRef.close();
      })
      .finally(() => (this.loading = false));
  }
}
