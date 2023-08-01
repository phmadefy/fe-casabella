import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
