// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import {
  AuthActionTypes,
  Login,
  Logout,
  UserLoaded,
  UserRequested,
} from '../actions/auth.action';
import { AppState } from '../reducers';
import { environment } from '../../../environments/environment';
import { isUserLoaded } from '../selectors/auth.selector';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffects {
  // @Effect({ dispatch: false })
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap((action) => {
          localStorage.setItem(environment.token, action.payload.token);
          this.store.dispatch(new UserRequested());
        })
      );
    },
    { dispatch: false }
  );

  // @Effect({ dispatch: false })
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
          localStorage.removeItem(environment.token);
          // localStorage.removeItem(environment.placeSession);
          this.router.navigate(['/auth'], {
            queryParams: { returnUrl: this.returnUrl },
          });
        })
      );
    },
    { dispatch: false }
  );

  // @Effect({ dispatch: false })
  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserRequested>(AuthActionTypes.UserRequested),
      withLatestFrom(this.store.pipe(select(isUserLoaded))),
      filter(([action, _isUserLoaded]) => !_isUserLoaded),
      mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
      tap((_user) => {
        if (_user) {
          this.store.dispatch(new UserLoaded({ user: _user }));
        } else {
          this.store.dispatch(new Logout());
        }
      })
    );
    {
      dispatch: false;
    }
  });

  // @Effect()
  init$: Observable<Action> = createEffect(() => {
    return defer(() => {
      const userToken = localStorage.getItem(environment.token);
      let observableResult = of({ type: 'NO_ACTION' });
      if (userToken) {
        observableResult = of(new Login({ token: userToken }));
      }
      return observableResult;
    });
  });

  private returnUrl: string = '';

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }
}
