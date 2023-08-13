import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(public toast: ToastrService) {}

  public toastError(msg = '', title = '') {
    this.toast.error(msg, title, { enableHtml: true });
  }
  public toastWarning(msg = '', title = '') {
    this.toast.warning(msg, title, { enableHtml: true });
  }
  public toastSuccess(msg = '', title = '') {
    this.toast.success(msg, title, { enableHtml: true });
  }
}
