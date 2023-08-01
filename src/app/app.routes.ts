import { Routes } from '@angular/router';
import { RevendedorComponent } from './cadastro/revendedor/revendedor.component';
import { ColaboradorComponent } from './cadastro/colaborador/colaborador.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'sigup',
    loadComponent: () =>
      import('./pages/sigup/sigup.component').then((c) => c.SigupComponent)
  },
  {
    path: 'register-dealer',
    loadComponent: () =>
      import('./cadastro/revendedor/revendedor.component').then((c) => c.RevendedorComponent),
  },
  {
    path: 'register-collaborator',
    loadComponent: () =>
      import('./cadastro/colaborador/colaborador.component').then((c) => c.ColaboradorComponent),
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./components/modal/modal.component').then((c) => c.ModalComponent),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./layout/base/base.component').then((c) => c.BaseComponent),
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        loadComponent: () =>
          import('./pages/feed/feed.component').then((c) => c.FeedComponent),
      },
    ],
  },
];
