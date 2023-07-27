import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'sigup',
    loadComponent: () =>
      import('./pages/sigup/sigup.component').then((c) => c.SigupComponent),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./layout/base/base.component').then((c) => c.BaseComponent),
  },
];
