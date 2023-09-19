import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../core/reducers';
import { Logout } from '../core/actions/auth.action';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertComponent } from '../shared/alert/alert.component';
import { InputProps } from '../shared/properties';
import { AlertPromptComponent } from '../shared/alert-prompt/alert-prompt.component';
import { AlertConfirmComponent } from '../shared/alert-confirm/alert-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  noImageAvatar = 'assets/sem-foto.png';
  constructor(
    private store: Store<AppState>,
    public route: Router,
    private dialog: Dialog
  ) {}

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  validateInputForm(form: NgForm, model: string) {
    if (!form) {
      return true;
    }

    const control = form.controls[model];
    if (
      control &&
      control.status != 'VALID' &&
      (form.submitted || control.touched)
    ) {
      return false;
    }
    return true;
  }

  getControl(form: NgForm, model: string) {
    const controls: any = form?.controls;
    return controls[model];
  }

  getErrors(form: NgForm, model: string) {
    const errors = [];
    if (form instanceof NgForm) {
      const control: any = this.getControl(form, model);
      if (control?.errors && control?.errors['required']) {
        errors.push('Obrigatório.');
      }
      if (control?.errors && control?.errors['email']) {
        errors.push('E-mail inválido.');
      }
      // console.log('control', control);
    }

    return errors;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  logs(data: any) {
    console.log(data);
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
