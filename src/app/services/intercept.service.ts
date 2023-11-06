import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Logout } from '../core/actions/auth.action';
import { AppState } from '../core/reducers';
import { MessageService } from './message.service';

@Injectable()
export class InterceptService implements HttpInterceptor {
  private returnUrl: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:no-debugger
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(environment.token)}`,
      },
    });

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // console.log('event intercept', event);
            if (event.status == 201) {
              this.messageService.presentAlert(event.body.message, '');
            }
          }
        },
        (error) => {
          console.log('error', error);

          if (error.status == 0) {
            // this.message.alertNet();
          } else if (error.status == 401) {
            this.messageService.presentAlertError(error.error.message);

            // this.modalCtrl.dismissAll();

            this.store.dispatch(new Logout());
            // localStorage.removeItem(environment.token);
            // this.redirect.navigate(['/auth']);
          } else {
            let message = '';
            if (Array.isArray(error.error.erros)) {
              for (let err of error.error.erros) {
                message += `${err} \n`;
              }
            } else if (error?.error?.message) {
              message = error.error.message;
            } else {
              message = error.message;
            }

            this.messageService.presentAlertError(
              message,
              'Falha na requisição'
            );
          }
        }
      )
    );
  }
}
