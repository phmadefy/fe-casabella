import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  noImageAvatar = 'assets/sem-foto.png';
  constructor() {}

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
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

  async getStates() {
    const data = await fetch(
      'https://api-cbella-01.azurewebsites.net/v1/states'
    );
    return data.json();
  }

  async getCities(uf: string) {
    const data = await fetch(
      'https://api-cbella-01.azurewebsites.net/v1/cities/' + uf
    );
    return data.json();
  }
}
