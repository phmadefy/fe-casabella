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

  toBase64(file: File): Promise<any> {
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
      control.status == 'INVALID' &&
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

  async isAdmin() {
    const user = await this.getCurrentUser();
    if (user) {
    }

    return false;
  }

  getPropertyMultiLevel(data: any, property: string) {
    const properties = property.split('.');
    let value: any = data;
    for (let prop of properties) {
      value = value[prop];
    }
    // console.log('getPropertyMultiLevel', value);

    return value;
  }

  generateFormData(dados: any) {
    const formData = new FormData();
    for (let key of Object.keys(dados)) {
      if (!dados[key]) {
        continue;
      }

      console.log('is array', key, Array.isArray(dados[key]));

      if (Array.isArray(dados[key])) {
        for (let value of dados[key]) {
          formData.append(`${key}[]`, value);
        }
        // if (dados[key]?.length <= 0) {
        //   formData.append(`${key}[]`, '');
        // }
      } else if (dados[key] instanceof Blob) {
        formData.append(key, dados[key]);
      } else if (typeof dados[key] == 'object') {
        formData.append(key, JSON.stringify(dados[key]));
      } else {
        formData.append(key, dados[key]);
      }
    }

    return formData;
  }

  getDescriptionTransaction(row: any) {
    if (
      !row?.transaction?.from_cashier_id &&
      !row?.transaction?.from_user_id &&
      !row?.transaction?.to_cashier_id &&
      !row?.transaction?.to_user_id
    ) {
      return `Depósito ao caixa <b>${row?.cashier?.name}</b>`;
    }

    if (row?.transaction?.cashier_from && row?.transaction?.user_to) {
      return `Transferência do caixa <b>${row?.transaction?.cashier_from?.name}</b> para <b>${row?.transaction?.user_to?.name}</b>`;
    }

    if (row?.transaction?.cashier_from && row?.transaction?.cashier_to) {
      return `Transferência do caixa <b>${row?.transaction?.cashier_from?.name}</b> para o caixa <b>${row?.transaction?.cashier_to?.name}</b>`;
    }

    if (row?.transaction?.user_from && row?.transaction?.cashier_to) {
      return `Transferência do usuário <b>${row?.transaction?.user_from?.name}</b> para o caixa <b>${row?.transaction?.cashier_to?.name}</b>`;
    }

    if (row?.transaction?.user_from && row?.transaction?.user_to) {
      return `Transferência do usuário <b>${row?.transaction?.user_from?.name}</b> para o usuário <b>${row?.transaction?.user_to?.name}</b>`;
    }

    return '';
  }

  getParameters() {
    const parameters = localStorage.getItem('parameters');
    if (parameters) {
      return JSON.parse(parameters);
    }

    return {};
  }

  setParameters(parameters: any) {
    localStorage.setItem('parameters', JSON.stringify(parameters));
  }
}
