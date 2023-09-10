import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
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
    ],
  },

  {
    path: '',
    canActivate: [AuthGuard],
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
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/feed/feed.component').then(
                (c) => c.FeedComponent
              ),
          },
        ],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'settings',
            loadComponent: () =>
              import('./pages/admin/settings/settings.component').then(
                (c) => c.SettingsComponent
              ),
          },
          {
            path: 'users',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/users/users.component').then(
                    (c) => c.UsersComponent
                  ),
              },
              {
                path: 'add',
                loadComponent: () =>
                  import(
                    './pages/admin/users/user-form/user-form.component'
                  ).then((c) => c.UserFormComponent),
              },
              {
                path: 'office-sectors',
                loadComponent: () =>
                  import(
                    './pages/admin/users/office-sectors/office-sectors.component'
                  ).then((c) => c.OfficeSectorsComponent),
              },
              {
                path: 'segment-access-group',
                loadComponent: () =>
                  import(
                    './pages/admin/users/segment-access-group/segment-access-group.component'
                  ).then((c) => c.SegmentAccessGroupComponent),
              },
              {
                path: 'permissions-access-group',
                loadComponent: () =>
                  import(
                    './pages/admin/users/permissions-access-group/permissions-access-group.component'
                  ).then((c) => c.PermissionsAccessGroupComponent),
              },
              {
                path: ':id',
                loadComponent: () =>
                  import(
                    './pages/admin/users/user-form/user-form.component'
                  ).then((c) => c.UserFormComponent),
              },
            ],
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
];
