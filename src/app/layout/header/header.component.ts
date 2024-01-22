import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';
import { FloralPriceComponent } from 'src/app/components/floral-price/floral-price.component';
import { MyFloralComponent } from 'src/app/components/my-floral/my-floral.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalChangePasswordComponent } from 'src/app/shared/modal-change-password/modal-change-password.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FloralPriceComponent,
    MyFloralComponent,
  ],
  providers: [ApiService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  Menu: any = [
    {
      id: 'feed',
      title: 'Feed',
      route: 'feed',
      icon: '',
      permissions: 'feed,add_feed',
      items: [
        {
          id: 'feed-pg-inicial',
          title: 'Página Inicial',
          route: '/feed',
          icon: '',
          permissions: 'feed',
        },
        {
          id: 'feed-pg-add-post',
          title: 'Adicionar Post',
          route: '/novo-post',
          icon: '',
          permissions: 'add_feed',
        },
      ],
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      route: 'dashboard',
      icon: '',
    },
    {
      id: 'incentivos',
      title: 'Incentivos',
      route: 'incentivo',
      icon: '',
      permissions: 'incentive',
      items: [
        {
          id: 'incentivos-ativos',
          title: 'Incentivos Ativos',
          route: '/',
          queryParams: { tab: 'active' },
          icon: '',
          permissions: '',
        },
        {
          id: 'incentivos-inativos',
          title: 'Incentivos inativos',
          route: '/',
          queryParams: { tab: 'inactive' },
          icon: '',
          permissions: '',
        },
        {
          id: 'meus-incentivos',
          title: 'Meus Incentivos',
          route: '/meus',
          queryParams: { tab: 'my' },
          icon: '',
          permissions: '',
        },
        {
          id: 'gallery',
          title: 'Galeria de Fotos e Videos',
          route: '/',
          queryParams: { tab: 'galeria' },
          icon: '',
          permissions: '',
        },
      ],
    },
    {
      id: 'floral',
      title: 'Floral',
      route: 'floral',
      icon: '',
      permissions: 'floral,movement_floral',
      items: [
        {
          id: 'meu-floral',
          title: 'Meu Floral',
          route: '/',
          queryParams: { tab: 'my' },
          icon: '',
        },
        {
          id: 'transferencias-pendentes',
          title: 'Transferências Pendentes',
          route: '/',
          queryParams: { tab: 'pending' },
          icon: '',
          permissions: 'movement_floral',
        },
        {
          id: 'transferir-floral',
          title: 'Transferir Floral',
          route: '/transferir',
          icon: '',
          permissions: 'movement_floral',
        },
        {
          id: 'resgatar-floral',
          title: 'Resgatar Floral',
          route: '/resgatar',
          icon: '',
          permissions: 'movement_floral',
        },
      ],
    },
    {
      id: 'nfts',
      title: 'NFTs',
      route: 'nfts',
      icon: '',
      permissions: 'nft,movement_nft',
      items: [
        {
          id: 'meus-nfts',
          title: 'Meus NFTs',
          route: '/',
          queryParams: { tab: 'my' },
          icon: '',
          permissions: 'nft',
        },
        {
          id: 'todos-nfts',
          title: 'Todos NFTs',
          route: '/',
          queryParams: { tab: 'all' },
          icon: '',
          permissions: 'nft',
        },
        {
          id: 'transferencias-pendentes-nfts',
          title: 'Tranferências Pendentes',
          route: '/',
          queryParams: { tab: 'pending' },
          icon: '',
          permissions: 'movement_nft',
        },
        {
          id: 'transferir-nfts',
          title: 'Transferir NFTs',
          route: '/transferir',
          icon: '',
          permissions: 'movement_nft',
        },
      ],
    },
    {
      id: 'fale-conosco',
      title: 'Fale Conosco',
      route: 'fale-conosco',
      icon: '',
      permissions: 'tickets',
    },
    {
      id: 'admin',
      title: 'Admin',
      route: 'admin',
      subtitle: 'Administração',
      permissions:
        'add_incentive,add_terms,add_terms,cycles,pictures,cashier,nft,add_nft,classification_nft,add_type_nft,movement_nft,details_floral,movement_floral,approve_floral,partner,add_partner,tickets,chat,terms,audit,approve_nft,reports,users,add_user,groups_and_segments,roles_and_departments,cities_and_states,import_defaulters,import_users,params',
      items: [
        {
          id: 'admin-incentivos',
          title: 'Incentivos',
          route: 'admin/incentives',
          icon: 'fa-solid fa-flag',
          permissions: 'add_incentive,add_terms,add_terms,cycles,pictures',
          items: [
            {
              id: 'admin-incentivos-todos',
              title: 'Todos Incentivos',
              route: '/',
              queryParams: { tab: 'all' },
              permissions: 'add_incentive',
            },
            {
              id: 'admin-incentives-add',
              title: 'Adicionar Incentivo',
              route: '/add',
              permissions: 'add_incentive',
            },
            {
              id: 'admin-incentives-terms-of-use',
              title: 'Termos de Uso',
              route: '/',
              queryParams: { tab: 'terms-of-use' },
              permissions: 'add_terms',
            },
            {
              id: 'admin-incentives-terms-of-use-add',
              title: 'Adicionar Termo de Uso',
              route: '/terms-of-use/add',
              permissions: 'add_terms',
            },
            {
              id: 'admin-incentives-cycle',
              title: 'Ciclos de Incentivo',
              route: '/ciclos',
              queryParams: { tab: 'active' },
              permissions: 'cycles',
            },
            {
              id: 'admin-incentives-gallery',
              title: 'Galeria de Imagens e Vídeos',
              route: '/',
              queryParams: { tab: 'gallery' },
              permissions: 'pictures',
            },
          ],
        },
        {
          id: 'admin-caixas',
          title: 'Caixas',
          route: '/cash-box',
          queryParams: { tab: 'active' },
          icon: 'fa-solid fa-building-columns',
          permissions: 'cashier',
        },
        {
          id: 'admin-nfts',
          title: 'NFT',
          route: 'admin/nfts',
          icon: 'fa-solid fa-panorama',
          permissions:
            'nft,add_nft,classification_nft,add_type_nft,movement_nft',
          items: [
            {
              id: 'admin-nfts-todos',
              title: 'Todos NFTs',
              route: '/',
              queryParams: { tab: 'all' },
              permissions: 'nft',
            },
            {
              id: 'admin-nfts-add',
              title: 'Cadastrar NFTs',
              route: '/add',
              permissions: 'add_nft',
            },
            {
              id: 'admin-cassificacao-nfts',
              title: 'Classificação NFTs',
              route: '/classifications',
              queryParams: { tab: 'active' },
              permissions: 'classification_nft',
            },
            {
              id: 'admin-nfts-tipos',
              title: 'Tipos de NFTs',
              route: '/types',
              queryParams: { tab: 'active' },
              permissions: 'add_type_nft',
            },
            {
              id: 'admin-nfts-transfer',
              title: 'Transferir Propriedade de NFTs',
              route: '/transfer',
              permissions: 'movement_nft',
            },
            {
              id: 'admin-nfts-transfer-auth',
              title: 'Autorizar Transferências de NFTs',
              route: '/transfer-auth',
              queryParams: { tab: 'authorize' },
              permissions: 'movement_nft',
            },
          ],
        },
        {
          id: 'admin-floral',
          title: 'Floral',
          route: 'admin/floral',
          icon: 'fa-solid fa-fan',
          permissions: 'details_floral,movement_floral,approve_floral',
          items: [
            {
              id: 'admin-floral-extrato',
              title: 'Extrato de Movimentação',
              route: '/movement-statement',
              permissions: 'details_floral',
            },
            {
              id: 'admin-floral-resgate-pending',
              title: 'Resgates Pendentes',
              route: '/',
              queryParams: { tab: 'pending' },
              permissions: 'approve_floral',
            },
            {
              id: 'admin-floral-resgate-approve',
              title: 'Resgates Aprovados',
              route: '/',
              queryParams: { tab: 'approve' },
              permissions: 'approve_floral',
            },
            {
              id: 'admin-floral-resgate-rejects',
              title: 'Resgates Rejeitados',
              route: '/',
              queryParams: { tab: 'rejected' },
              permissions: 'approve_floral',
            },
            {
              id: 'admin-floral-deposit-caixa',
              title: 'Depósito de Floral Caixa Casabella',
              route: '/deposit',
              permissions: 'approve_floral',
            },
            {
              id: 'admin-floral-transfer',
              title: 'Tranferência Floral (Caixa / Usuário)',
              route: '/transfer',
              permissions: 'approve_floral',
            },
            {
              id: 'admin-floral-transfer-auth',
              title: 'Autorizar Tranferência de Floral',
              route: '/transfer-auth',
              queryParams: { tab: 'authorize' },
              permissions: 'approve_floral',
            },
          ],
        },
        {
          id: 'admin-patrocinio',
          title: 'Patrocinador',
          route: 'admin/sponsors',
          icon: 'fa-solid fa-circle-dollar-to-slot',
          permissions: 'partner,add_partner',
          items: [
            {
              id: 'admin-patrocinio-actives',
              title: 'Patrocínios Ativos',
              route: '/',
              queryParams: { tab: 'active' },
              permissions: 'partner',
            },
            {
              id: 'admin-patrocinio-inactives',
              title: 'Patrocínios Inativos',
              route: '/',
              queryParams: { tab: 'suspend' },
              permissions: 'partner',
            },
            {
              id: 'admin-patrocinio-add',
              title: 'Adicionar Patrocinador',
              route: '/add',
              permissions: 'add_partner',
            },
          ],
        },
        {
          id: 'admin-fale-conosco',
          title: 'Fale Conosco',
          route: '/contact-us',
          icon: 'fa-solid fa-ticket',
          permissions: 'tickets',
        },
        {
          id: 'admin-chat',
          title: 'Chat',
          route: 'admin/chat',
          icon: 'fa-solid fa-message',
          permissions: 'chat',
        },
        {
          id: 'admin-termos',
          title: 'Termos',
          icon: 'fa-solid fa-file-lines',
          route: '/terms-of-use',
          queryParams: { type: 'login' },
          permissions: 'terms',
        },
        {
          id: 'admin-audit',
          title: 'Auditoria',
          route: '/audit',
          icon: 'fa-solid fa-clipboard-check',
          permissions: 'audit',
        },
        {
          id: 'admin-floral-nft-devolution',
          title: 'Devolução de Floral/NFT',
          route: 'admin/devolution',
          icon: 'fa-solid fa-right-left',
          permissions: 'approve_nft,approve_floral',
          items: [
            {
              id: 'admin-nft-devolution-caixa',
              title: 'Devolução de NFT ao Caixa',
              route: '/nft',
              permissions: 'approve_nft',
            },
            {
              id: 'admin-floral-devolution-caixa',
              title: 'Devolução de Floral ao Caixa',
              route: '/floral',
              permissions: 'approve_floral',
            },
          ],
        },
        {
          id: 'admin-reports',
          title: 'Relatórios',
          route: 'admin/reports',
          icon: 'fa-solid fa-file-invoice',
          permissions: 'reports',
          items: [
            {
              id: 'admin-report-floral',
              title: 'Relatórios de Floral',
            },
            {
              id: 'admin-report-floral-resgated',
              title: 'Florais Resgatados',
              route: 'admin/report-floral-resgated',
            },
            {
              id: 'admin-report-floral-sald-caixa',
              title: 'Saldo de Florais nos Caixas',
              route: 'admin/report-floral-saldo-caixas',
            },
            {
              id: 'admin-report-floral-circulate',
              title: 'Total de Florais em Circulação',
              route: 'admin/report-floral-circulate',
            },
            {
              id: 'admin-report-floral-add-in-system',
              title: 'Total de Aporte de Floral no Sistema',
              route: 'admin/report-floral-add-in-system',
            },
            {
              id: 'admin-report-floral-taxa',
              title: 'Recebidos em Taxas Floral',
              route: 'admin/report-floral-taxa',
            },
            {
              id: 'admin-report-receive-tax-transfer',
              title: 'Recebidos em Taxa Transf. Entre Contas',
              route: 'admin/report-receive-tax-transfer',
            },

            {
              id: 'admin-report-nft',
              title: 'Relatórios de NFT',
            },
            {
              id: 'admin-report-nft-resgated',
              title: 'NFTs Resgatados',
              route: 'admin/report-nft-resgated',
            },
            {
              id: 'admin-report-nft-history',
              title: 'Histórico do NFT',
              route: 'admin/report-nft-history',
            },
            {
              id: 'admin-report-total-nft-resgat',
              title: 'Total de NFTS a Resgatar',
              route: 'admin/report-total-nft-resgat',
            },
            {
              id: 'admin-report-nft-add-campaing',
              title: 'NFTs Cadastradas para Campanha',
              route: 'admin/report-nft-add-campaing',
            },
            {
              id: 'admin-report-nft-in-db',
              title: 'NFTs Disponiveis no Banco de Dados',
              route: 'admin/report-nft-in-db',
            },
            {
              id: 'admin-report-total-nft-circulated',
              title: 'Total de NFTs em Circulação',
              route: 'admin/report-total-nft-circulated',
            },

            {
              id: 'admin-report-campaing',
              title: 'Relatórios de Campanhas',
            },
            {
              id: 'admin-report-campaing-people-in-incentivos',
              title: 'Pessoas Inscritas nos Incentivos',
              route: 'admin/report-campaing-people-in-incentivos',
            },
            {
              id: 'admin-report-campaing-people-downoad-terms',
              title: 'Pessoas que Baixaram Regulamentos',
              route: 'admin/report-campaing-people-downoad-terms',
            },
            {
              id: 'admin-report-campaing-total-subscribes-winers',
              title: 'Total de Campanhas, Inscritos e Ganhadores',
              route: 'admin/report-campaing-total-subscribes-winers',
            },

            {
              id: 'admin-report-users',
              title: 'Relatórios de Usuários',
            },
            {
              id: 'admin-report-users-add-in-platform',
              title: 'Números de Cadatrados na Plataforma',
              route: 'admin/report-users-add-in-platform',
            },
            {
              id: 'admin-report-users-frequence',
              title: 'Frequência de Acessos de Usuários',
              route: 'admin/report-users-frequence',
            },
          ],
        },
        {
          id: 'admin-users',
          title: 'Usuários',
          route: '/admin/users',
          icon: 'fa-solid fa-user',
          permissions:
            'users,add_user,groups_and_segments,roles_and_departments,cities_and_states,import_defaulters,import_users',
          items: [
            {
              id: 'admin-users-active',
              title: 'Usuários Ativos',
              route: '/',
              queryParams: { tab: 'active' },
              permissions: 'users',
            },
            {
              id: 'admin-users-inactive',
              title: 'Usuários Inativos',
              route: '/',
              queryParams: { tab: 'suspend' },
              permissions: 'users',
            },
            {
              id: 'admin-users-pending',
              title: 'Cadastros Pendentes',
              route: '/',
              queryParams: { tab: 'waiting approve' },
              permissions: 'add_user',
            },
            {
              id: 'admin-user-add',
              title: 'Cadastrar Usuário',
              route: '/add',
              permissions: 'add_user',
            },

            {
              id: 'admin-users-access-group',
              title: 'Grupo de Acesso e Segmentos',
              route: '/segment-access-group',
              permissions: 'groups_and_segments',
            },
            {
              id: 'admin-users-permissions-access-group',
              title: 'Permissões de Grupos de Acessos',
              route: '/permissions-access-group',
              permissions: 'groups_and_segments',
            },
            {
              id: 'admin-users-office-sector',
              title: 'Cargo e Setores',
              route: '/office-sectors',
              permissions: 'roles_and_departments',
            },
            {
              id: 'admin-users-cities-states',
              title: 'Cidade e Estados',
              route: '/cities-states',
              permissions: 'cities_and_states',
            },
            {
              id: 'admin-users-import-defaulters',
              title: 'Importar inadimplentes',
              route: '/import-defaulters',
              permissions: 'import_defaulters',
            },
            {
              id: 'admin-users-imports',
              title: 'Importar Usuários',
              route: '/imports',
              permissions: 'import_users',
            },
          ],
        },
        {
          id: 'admin-settings',
          title: 'Configurações',
          route: '/settings',
          icon: 'fa-solid fa-sliders',
          permissions: 'params',
        },
      ],
    },
  ];

  MenuMobile: any[] = [
    {
      title: 'Feed',
      route: '/feed',
      icon: 'fa-solid fa-newspaper',
    },
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'fa-solid fa-chart-pie',
    },
    {
      title: 'Incentivo',
      route: '/incentivo',
      icon: 'fa-solid fa-flag',
    },
    {
      title: 'Floral',
      route: '/floral',
      icon: 'fa-solid fa-fan',
    },
    {
      title: 'NFTs',
      route: '/nfts',
      icon: 'fa-solid fa-panorama',
    },
    {
      title: 'Fale Conosco',
      route: '/fale-conosco',
      icon: 'fa-solid fa-headset',
    },
  ];

  params: any = {};

  userCurrent: any = {};
  rules: any[] = [];

  imagemAnimadaMenu = null;
  FraseExibidaMenu = null;
  LinkRedirecionamentoGif = null;

  constructor(
    public tools: ToolsService,
    private service: ApiService,
    private dialog: Dialog
  ) {}

  async ngOnInit() {
    const parameters = this.tools.getParameters();
    const paramImage = this.tools.getItemArray(
      parameters,
      'parameter',
      'ImagemAnimadaMenu'
    );
    if (paramImage) {
      this.imagemAnimadaMenu = paramImage.value;
    }

    const paramLinkGif = this.tools.getItemArray(
      parameters,
      'parameter',
      'LinkRedirecionamentoGif'
    );
    if (paramLinkGif) {
      this.LinkRedirecionamentoGif = paramLinkGif.value ?? 'javascript:void(0)';
    }

    const paramFrase = this.tools.getItemArray(
      parameters,
      'parameter',
      'FraseExibidaMenu'
    );
    if (paramFrase) {
      this.FraseExibidaMenu = paramFrase.value;
    }

    this.userCurrent = await this.tools.getCurrentUser();
    this.rules = this.tools.getRules(this.userCurrent.group ?? []);
    console.log('rules', this.rules);
    initFlowbite();

    // this.service.getSettings().then((res) => {
    //   for (const item of res) {
    //     this.params[item.parameter] = item.value;
    //   }
    // });
  }

  closeDrawer() {
    setTimeout(() => {
      const drawer = document.querySelectorAll('[drawer-backdrop]');
      drawer.forEach((e) => {
        e.remove();
      });
    }, 150);
  }

  openChangePassword() {
    this.dialog.open<any>(ModalChangePasswordComponent, {
      width: '95%',
      maxWidth: '400px',
      maxHeight: '90%',
    });
  }
}
