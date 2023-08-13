import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'sigup',
    loadComponent: () =>
      import('./auth/sigup/sigup.component').then((c) => c.SigupComponent),
  },
  {
    path: 'register-dealer',
    loadComponent: () =>
      import('./auth/cadastro/revendedor/revendedor.component').then(
        (c) => c.RevendedorComponent
      ),
  },
  {
    path: 'register-collaborator',
    loadComponent: () =>
      import('./auth/cadastro/colaborador/colaborador.component').then(
        (c) => c.ColaboradorComponent
      ),
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./components/modal/modal.component').then(
        (c) => c.ModalComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./layout/base/base.component').then((c) => c.BaseComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/feed/feed.component').then((c) => c.FeedComponent),
      },
    ],
  },
];
