import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertConfirmComponent } from '../shared/alert-confirm/alert-confirm.component';
import { AlertPromptComponent } from '../shared/alert-prompt/alert-prompt.component';
import { InputProps } from '../shared/properties';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(public toast: ToastrService, public dialog: Dialog) {}

  public toastError(msg = '', title = '') {
    this.toast.error(msg, title, { enableHtml: true });
  }
  public toastWarning(msg = '', title = '') {
    this.toast.warning(msg, title, { enableHtml: true });
  }
  public toastSuccess(msg = '', title = '') {
    this.toast.success(msg, title, { enableHtml: true });
  }

  presentAlert(message: string, title = 'Aviso!', size = '4') {
    const dialogRef = this.dialog.open<any>(AlertComponent, {
      width: '95%',
      maxWidth: '450px',
      maxHeight: '90%',
      data: {
        title,
        message,
        size,
      },
    });

    return dialogRef;
  }

  presentAlertError(message: string, title = 'Aviso!', size = '4') {
    const dialogRef = this.dialog.open<any>(AlertComponent, {
      width: '95%',
      maxWidth: '450px',
      maxHeight: '90%',
      data: {
        title,
        message,
        size,
        type: 'error',
      },
    });

    return dialogRef;
  }

  presentAlertConfirm(message: string, title = 'Aviso!') {
    const dialogRef = this.dialog.open<any>(AlertConfirmComponent, {
      width: '95%',
      maxWidth: '500px',
      maxHeight: '90%',
      data: {
        title,
        message,
      },
    });

    return dialogRef;
  }

  presentAlertPrompt(
    message: string,
    title = 'Aviso!',
    input: InputProps = {}
  ) {
    const dialogRef = this.dialog.open<any>(AlertPromptComponent, {
      width: '95%',
      maxWidth: '450px',
      maxHeight: '90%',
      data: {
        title,
        message,
        input,
      },
    });

    return dialogRef;
  }
}
