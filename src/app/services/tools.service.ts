import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core/reducers';
import { Logout } from '../core/actions/auth.action';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom, skipWhile, take } from 'rxjs';
import { currentUser } from '../core/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  noImageAvatar = 'assets/sem-foto.png';
  constructor(private store: Store<AppState>, public route: Router) {}

  async getCurrentUser() {
    return lastValueFrom(
      this.store.pipe(
        select(currentUser),
        skipWhile((user) => !user),
        take(1)
      )
    );
  }

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
    // console.log('validateInputForm', model, control);
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

  getTimeFrom(date: string) {
    return moment(date).locale('pt-br').fromNow();
  }

  checkRouteContainsAdmin() {
    const paths = location.pathname.split('/');
    console.log('checkRouteContainsAdmin', paths);
    if (paths.includes('admin')) {
      return true;
    }

    return false;
  }
}
