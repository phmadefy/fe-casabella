import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core/reducers';
import { Logout } from '../core/actions/auth.action';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom, skipWhile, take } from 'rxjs';
import { currentUser } from '../core/selectors/auth.selector';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Howl } from 'howler';
@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  noImageAvatar = 'assets/sem-foto.png';
  soundNotification = 'assets/sounds/notify.mp3';
  baseUrl = environment.url;
  constructor(
    private store: Store<AppState>,
    public route: Router,
    private sanitizer: DomSanitizer
  ) {}

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
    // console.log('checkRouteContainsAdmin', paths);
    if (paths.includes('admin')) {
      return true;
    }

    return false;
  }

  async isAdmin() {
    const user = await this.getCurrentUser();
    console.log('user');

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
    // console.log('generateFormData dados', dados);

    for (let key of Object.keys(dados)) {
      if (dados[key] == undefined) {
        // console.log('generateFormData key', key);
        continue;
      }

      // console.log('is array', key, Array.isArray(dados[key]));

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
        formData.append(key, `${dados[key]}`);
      }
    }

    return formData;
  }

  getDescriptionTransaction(row: any) {
    if (row?.from_cashier && row?.to_user) {
      return `Transferência do caixa <b>${row?.from_cashier?.name}</b> para <b>${row?.to_user?.name}</b>`;
    }

    if (row?.from_cashier && row?.to_cashier) {
      return `Transferência do caixa <b>${row?.from_cashier?.name}</b> para o caixa <b>${row?.to_cashier?.name}</b>`;
    }

    if (row?.from_user && row?.to_cashier) {
      return `Transferência do usuário <b>${row?.from_user?.name}</b> para o caixa <b>${row?.to_cashier?.name}</b>`;
    }

    if (row?.from_user && row?.to_user) {
      return `Transferência do usuário <b>${row?.from_user?.name}</b> para o usuário <b>${row?.to_user?.name}</b>`;
    }

    if (row?.to_cashier) {
      return `Depósito ao caixa <b>${row?.to_cashier?.name}</b>`;
    }

    if (row?.from_cashier) {
      return `Retirada do caixa <b>${row?.from_cashier?.name}</b>`;
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

  getPropertiesPivot(array: any[], property: string) {
    if (array && array.length > 0) {
      return array.map((a: any) => a?.pivot[property]);
    }
    return [];
  }

  isFileType(type: string, filePath: string) {
    // Lista de extensões de imagem suportadas
    let imageExtensions: any = [];
    if (type == 'image') {
      imageExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.bmp',
        '.svg',
        '.webp',
      ];
    }
    if (type == 'pdf') {
      imageExtensions = ['.pdf'];
    }
    if (type == 'excel') {
      imageExtensions = [
        '.csv',
        '.xls',
        '.xlsx',
        '.xlsm',
        '.xlsb',
        '.xltx',
        '.xltm',
      ];
    }
    // Obtém a extensão do arquivo a partir do caminho
    const fileExtension = filePath.slice(
      ((filePath.lastIndexOf('.') - 1) >>> 0) + 2
    );

    // Verifica se a extensão está na lista de extensões de imagem
    return imageExtensions.includes(`.${fileExtension.toLowerCase()}`);
  }

  getItemArray(array: any[], property: string, search: string) {
    return array.find((i: any) => i[property] == search);
  }

  getRules(groups: any[]) {
    const rules: any = [];
    for (const group of groups) {
      for (const rule of group.rules) {
        const find = rules.find((r: any) => r == rule.name);
        if (!find) {
          rules.push(rule.name);
        }
      }
    }

    return rules;
  }

  getRule(permissions: any, rules: any[]) {
    let visible = false;
    if (permissions && permissions != '') {
      permissions = permissions.split(',');
      visible = permissions.some((p: any) => rules.includes(p));
    } else {
      visible = true;
    }

    return visible;
  }

  getMovementType(item: any, id: string) {
    if (item.from_user_id == id) {
      return 'output';
    }
    if (item.to_user_id == id) {
      return 'input';
    }

    if (item.from_cashier_id == id) {
      return 'output';
    }
    if (item.to_cashier_id == id) {
      return 'input';
    }
    return '';
  }

  getPersonsInteractions(dados: any) {
    let text = '';
    if (dados?.interactions?.length > 3) {
      const interactionOne = dados?.interactions[0];
      const interactionTwo = dados?.interactions[1];
      // const interactionThree = dados?.interactions[2];
      if (interactionOne) {
        text += `${interactionOne?.user?.name}`;
      }
      if (interactionTwo) {
        text += `, ${interactionTwo?.user?.name}`;
      }

      text += ` e outras ${dados?.interactions?.length - 2} pessoas`;
    } else if (dados?.interactions) {
      const interactionOne = dados?.interactions[0];
      const interactionTwo = dados?.interactions[1];
      // const interactionThree = dados?.interactions[2];
      if (interactionOne) {
        text += `${interactionOne?.user?.name}`;
      }
      if (interactionTwo) {
        text += `, ${interactionTwo?.user?.name}`;
      }
    }

    return text;
  }

  getMyInteraction(interactions: any[], userCurrent: any) {
    let interaction = '';
    if (interactions?.length > 0) {
      const find = interactions.find((i: any) => i.user_id == userCurrent.id);
      if (find) {
        interaction = find.name ?? find.interaction;
      }
    }

    return interaction;
  }

  isInRoute(path: string, type: string) {
    console.log('isInRoute', type, path, location.pathname);
    const endPoints = location.pathname.split('/');
    return endPoints.includes(path);
  }

  getUrlSecurity(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getHtmlSecurity(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('Mobile') !== -1
    );
  }

  parseListArray(array: any[], property: string, separator: string = ', ') {
    return array.map((a: any) => a[property]).join(separator);
  }

  onEnterPress(event: any) {
    event.preventDefault(); // Isso impede o comportamento padrão de pressionar Enter
  }

  playNotification() {
    const sound = new Howl({
      src: [this.soundNotification], // Substitua pelo caminho do seu arquivo de áudio
      autoplay: true,
    });
    sound.play();
  }

  isViewOrParticipate(incentive: any, user: any) {
    let type = 'view';

    const segment: any = user?.person?.segment_id;
    // console.log('isViewOrParticipate segment', segment);
    // console.log('isViewOrParticipate incentive', incentive);
    // console.log(
    //   'isViewOrParticipate incentive',
    //   incentive?.segments_participate?.some(
    //     (s: any) => segment == s.pivot.segment_id
    //   )
    // );

    if (
      incentive?.segments_participate?.some(
        (s: any) => segment == s.pivot.segment_id
      )
    ) {
      type = 'participate';
    }

    return type;
  }
}
