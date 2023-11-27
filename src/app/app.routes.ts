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
        path: 'floral',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/floral-public/floral-public.component').then(
                (c) => c.FloralPublicComponent
              ),
          },
          {
            path: 'transferir',
            loadComponent: () =>
              import(
                './pages/admin/foral/floral-transfer-form/floral-transfer-form.component'
              ).then((c) => c.FloralTransferFormComponent),
          },
          {
            path: 'resgatar',
            loadComponent: () =>
              import(
                './pages/floral-public/floral-redeem/floral-redeem.component'
              ).then((c) => c.FloralRedeemComponent),
          },
        ],
      },
      {
        path: 'fale-conosco',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/contact-us-public/contact-us-public.component'
              ).then((c) => c.ContactUsPublicComponent),
          },
          {
            path: 'add',
            loadComponent: () =>
              import(
                './pages/contact-us-public/contact-us-form/contact-us-form.component'
              ).then((c) => c.ContactUsFormComponent),
          },
        ],
      },

      {
        path: 'admin',
        children: [
          {
            path: 'incentives',
            data: { role: 'ADMIN' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/incentives/incentives.component').then(
                    (c) => c.IncentivesComponent
                  ),
              },
              {
                path: 'add',
                loadComponent: () =>
                  import(
                    './pages/admin/incentives/incentive-form/incentive-form.component'
                  ).then((c) => c.IncentiveFormComponent),
              },
              {
                path: 'terms-of-use/add',
                loadComponent: () =>
                  import(
                    './pages/admin/incentives/terms-of-use/terms-of-use-form/terms-of-use-form.component'
                  ).then((c) => c.TermsOfUseFormComponent),
              },
              {
                path: 'terms-of-use/edit',
                loadComponent: () =>
                  import(
                    './pages/admin/incentives/terms-of-use/terms-of-use-form/terms-of-use-form.component'
                  ).then((c) => c.TermsOfUseFormComponent),
              },
              {
                path: 'gallery/add',
                loadComponent: () =>
                  import(
                    './pages/admin/incentives/incentive-gallery/incentive-gallery-form/incentive-gallery-form.component'
                  ).then((c) => c.IncentiveGalleryFormComponent),
              },
              {
                path: 'gallery/edit',
                loadComponent: () =>
                  import(
                    './pages/admin/incentives/incentive-gallery/incentive-gallery-form/incentive-gallery-form.component'
                  ).then((c) => c.IncentiveGalleryFormComponent),
              },
            ],
          },
          {
            path: 'cash-box',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/cash-box/cash-box.component').then(
                    (c) => c.CashBoxComponent
                  ),
              },
              {
                path: 'add',
                loadComponent: () =>
                  import(
                    './pages/admin/cash-box/cash-box-form/cash-box-form.component'
                  ).then((c) => c.CashBoxFormComponent),
              },
            ],
          },
          {
            path: 'nfts',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/nfts/nfts.component').then(
                    (c) => c.NftsComponent
                  ),
              },
              {
                path: 'add',
                loadComponent: () =>
                  import('./pages/admin/nfts/nft-form/nft-form.component').then(
                    (c) => c.NftFormComponent
                  ),
              },
              {
                path: 'classifications',
                loadComponent: () =>
                  import(
                    './pages/admin/nfts/nft-classifications/nft-classifications.component'
                  ).then((c) => c.NftClassificationsComponent),
              },
              {
                path: 'classifications/add',
                loadComponent: () =>
                  import(
                    './pages/admin/nfts/nft-classifications/nft-classification-form/nft-classification-form.component'
                  ).then((c) => c.NftClassificationFormComponent),
              },
              {
                path: 'types',
                loadComponent: () =>
                  import(
                    './pages/admin/nfts/nft-types/nft-types.component'
                  ).then((c) => c.NftTypesComponent),
              },
              {
                path: 'transfer',
                loadComponent: () =>
                  import(
                    './pages/admin/nfts/nft-transfer-form/nft-transfer-form.component'
                  ).then((c) => c.NftTransferFormComponent),
              },
              {
                path: 'transfer-auth',
                loadComponent: () =>
                  import(
                    './pages/admin/nfts/nft-transfer-auth/nft-transfer-auth.component'
                  ).then((c) => c.NftTransferAuthComponent),
              },
            ],
          },

          {
            path: 'floral',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/foral/foral.component').then(
                    (c) => c.ForalComponent
                  ),
              },
              {
                path: 'movement-statement',
                loadComponent: () =>
                  import(
                    './pages/admin/foral/movement-statement/movement-statement.component'
                  ).then((c) => c.MovementStatementComponent),
              },
              {
                path: 'deposit',
                loadComponent: () =>
                  import(
                    './pages/admin/foral/floral-deposit/floral-deposit.component'
                  ).then((c) => c.FloralDepositComponent),
              },
              {
                path: 'transfer',
                loadComponent: () =>
                  import(
                    './pages/admin/foral/floral-transfer-form/floral-transfer-form.component'
                  ).then((c) => c.FloralTransferFormComponent),
              },
              {
                path: 'transfer-auth',
                loadComponent: () =>
                  import(
                    './pages/admin/foral/floral-transfer-auth/floral-transfer-auth.component'
                  ).then((c) => c.FloralTransferAuthComponent),
              },
            ],
          },

          {
            path: 'sponsors',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/admin/sponsors/sponsors.component').then(
                    (c) => c.SponsorsComponent
                  ),
              },
              {
                path: 'add',
                loadComponent: () =>
                  import(
                    './pages/admin/sponsors/sponsor-form/sponsor-form.component'
                  ).then((c) => c.SponsorFormComponent),
              },
            ],
          },
          {
            path: 'contact-us',
            loadComponent: () =>
              import('./pages/admin/contact-us/contact-us.component').then(
                (c) => c.ContactUsComponent
              ),
          },
          {
            path: 'terms-of-use',
            loadComponent: () =>
              import(
                './pages/admin/incentives/terms-of-use/terms-of-use.component'
              ).then((c) => c.TermsOfUseComponent),
          },
          {
            path: 'audit',
            loadComponent: () =>
              import('./pages/admin/audit/audit.component').then(
                (c) => c.AuditComponent
              ),
          },

          {
            path: 'devolution',
            children: [
              {
                path: 'nft',
                loadComponent: () =>
                  import(
                    './pages/admin/devolution-nft/devolution-nft.component'
                  ).then((c) => c.DevolutionNftComponent),
              },
              {
                path: 'floral',
                loadComponent: () =>
                  import(
                    './pages/admin/devolution-floral/devolution-floral.component'
                  ).then((c) => c.DevolutionFloralComponent),
              },
            ],
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
                path: 'import-defaulters',
                loadComponent: () =>
                  import(
                    './pages/admin/users/import-defaulters/import-defaulters.component'
                  ).then((c) => c.ImportDefaultersComponent),
              },

              {
                path: 'imports',
                loadComponent: () =>
                  import(
                    './pages/admin/users/import-users/import-users.component'
                  ).then((c) => c.ImportUsersComponent),
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
          {
            path: 'settings',
            loadComponent: () =>
              import('./pages/admin/settings/settings.component').then(
                (c) => c.SettingsComponent
              ),
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
