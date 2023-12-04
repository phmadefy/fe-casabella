import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';
import { FloralPriceComponent } from 'src/app/components/floral-price/floral-price.component';
import { MyFloralComponent } from 'src/app/components/my-floral/my-floral.component';

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
      items: [
        {
          id: 'feed-pg-inicial',
          title: 'Página Inicial',
          route: '/feed',
          icon: '',
        },
        {
          id: 'feed-pg-add-post',
          title: 'Adicionar Post',
          route: '/novo-post',
          icon: '',
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
      items: [
        {
          id: 'incentivos-ativos',
          title: 'Incentivos Ativos',
          route: '/',
          queryParams: { tab: 'active' },
          icon: '',
        },
        {
          id: 'incentivos-inativos',
          title: 'Incentivos inativos',
          route: '/',
          queryParams: { tab: 'inactive' },
          icon: '',
        },
        {
          id: 'meus-incentivos',
          title: 'Meus Incentivos',
          route: '/meus',
          queryParams: { tab: 'my' },
          icon: '',
        },
        {
          id: 'gallery',
          title: 'Galeria de Fotos e Videos',
          route: '/',
          queryParams: { tab: 'galeria' },
          icon: '',
        },
      ],
    },
    {
      id: 'floral',
      title: 'Floral',
      route: 'floral',
      icon: '',
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
        },
        {
          id: 'transferir-floral',
          title: 'Transferir Floral',
          route: '/transferir',
          icon: '',
        },
        {
          id: 'resgatar-floral',
          title: 'Resgatar Floral',
          route: '/resgatar',
          icon: '',
        },
      ],
    },
    {
      id: 'nfts',
      title: 'NFTs',
      route: 'nfts',
      icon: '',
      items: [
        {
          id: 'meus-nfts',
          title: 'Meus NFTs',
          route: '/',
          queryParams: { tab: 'my' },
          icon: '',
        },
        {
          id: 'todos-nfts',
          title: 'Todos NFTs',
          route: '/',
          queryParams: { tab: 'all' },
          icon: '',
        },
        {
          id: 'transferencias-pendentes-nfts',
          title: 'Tranferências Pendentes',
          route: '/',
          queryParams: { tab: 'pending' },
          icon: '',
        },
        {
          id: 'transferir-nfts',
          title: 'Transferir NFTs',
          route: '/transferir',
          icon: '',
        },
      ],
    },
    {
      id: 'fale-conosco',
      title: 'Fale Conosco',
      route: 'fale-conosco',
      icon: '',
    },
    {
      id: 'admin',
      title: 'Admin',
      route: 'admin',
      subtitle: 'Administração',
      items: [
        {
          id: 'admin-incentivos',
          title: 'Incentivos',
          route: 'admin/incentives',
          icon: 'fa-solid fa-flag',
          items: [
            {
              id: 'admin-incentivos-todos',
              title: 'Todos Incentivos',
              route: '/',
            },
            {
              id: 'admin-incentives-add',
              title: 'Adicionar Incentivo',
              route: '/add',
            },
            {
              id: 'admin-incentives-terms-of-use',
              title: 'Termos de Uso',
              route: '/',
              queryParams: { tab: 'terms-of-use' },
            },
            {
              id: 'admin-incentives-terms-of-use-add',
              title: 'Adicionar Termo de Uso',
              route: '/terms-of-use/add',
            },
            {
              id: 'admin-incentives-cycle',
              title: 'Ciclos de Incentivo',
              route: '/incentives-cycle',
            },
          ],
        },
        {
          id: 'admin-caixas',
          title: 'Caixas',
          route: '/cash-box',
          queryParams: { tab: 'active' },
          icon: 'fa-solid fa-building-columns',
        },
        {
          id: 'admin-nfts',
          title: 'NFT',
          route: 'admin/nfts',
          icon: 'fa-solid fa-panorama',
          items: [
            {
              id: 'admin-nfts-todos',
              title: 'Todos NFTs',
              route: '/',
              queryParams: { tab: 'all' },
            },
            {
              id: 'admin-nfts-add',
              title: 'Cadastrar NFTs',
              route: '/add',
            },
            {
              id: 'admin-cassificacao-nfts',
              title: 'Classificação NFTs',
              route: '/classifications',
              queryParams: { tab: 'active' },
            },
            {
              id: 'admin-nfts-tipos',
              title: 'Tipos de NFTs',
              route: '/types',
            },
            {
              id: 'admin-nfts-transfer',
              title: 'Transferir Propriedade de NFTs',
              route: '/transfer',
            },
            {
              id: 'admin-nfts-transfer-auth',
              title: 'Autorizar Transferências de NFTs',
              route: '/transfer-auth',
              queryParams: { tab: 'authorize' },
            },
          ],
        },
        {
          id: 'admin-floral',
          title: 'Floral',
          route: 'admin/floral',
          icon: 'fa-solid fa-fan',
          items: [
            {
              id: 'admin-floral-extrato',
              title: 'Extrato de Movimentação',
              route: '/movement-statement',
            },
            {
              id: 'admin-floral-resgate-pending',
              title: 'Resgates Pendentes',
              route: '/',
              queryParams: { tab: 'pending' },
            },
            {
              id: 'admin-floral-resgate-approve',
              title: 'Resgates Aprovados',
              route: '/',
              queryParams: { tab: 'approve' },
            },
            {
              id: 'admin-floral-resgate-rejects',
              title: 'Resgates Rejeitados',
              route: '/',
              queryParams: { tab: 'rejected' },
            },
            {
              id: 'admin-floral-deposit-caixa',
              title: 'Depósito de Floral Caixa Casabella',
              route: '/deposit',
            },
            {
              id: 'admin-floral-transfer',
              title: 'Tranferência Floral (Caixa / Usuário)',
              route: '/transfer',
            },
            {
              id: 'admin-floral-transfer-auth',
              title: 'Autorizar Tranferência de Floral',
              route: '/transfer-auth',
            },
          ],
        },
        {
          id: 'admin-patrocinio',
          title: 'Patrocinador',
          route: 'admin/sponsors',
          icon: 'fa-solid fa-circle-dollar-to-slot',
          items: [
            {
              id: 'admin-patrocinio-actives',
              title: 'Patrocínios Ativos',
              route: '/',
              queryParams: { tab: 'active' },
            },
            {
              id: 'admin-patrocinio-inactives',
              title: 'Patrocínios Inativos',
              route: '/',
              queryParams: { tab: 'suspend' },
            },
            {
              id: 'admin-patrocinio-add',
              title: 'Adicionar Patrocinador',
              route: '/add',
            },
          ],
        },
        {
          id: 'admin-fale-conosco',
          title: 'Fale Conosco',
          route: '/contact-us',
          icon: 'fa-solid fa-ticket',
        },
        {
          id: 'admin-chat',
          title: 'Chat',
          route: 'admin/chat',
          icon: 'fa-solid fa-message',
        },
        {
          id: 'admin-termos',
          title: 'Termos',
          icon: 'fa-solid fa-file-lines',
          route: '/terms-of-use',
          queryParams: { type: 'login' },
        },
        {
          id: 'admin-audit',
          title: 'Auditoria',
          route: '/audit',
          icon: 'fa-solid fa-clipboard-check',
        },
        {
          id: 'admin-floral-nft-devolution',
          title: 'Devolução de Floral/NFT',
          route: 'admin/devolution',
          icon: 'fa-solid fa-right-left',
          items: [
            {
              id: 'admin-nft-devolution-caixa',
              title: 'Devolução de NFT ao Caixa',
              route: '/nft',
            },
            {
              id: 'admin-floral-devolution-caixa',
              title: 'Devolução de Floral ao Caixa',
              route: '/floral',
            },
          ],
        },
        {
          id: 'admin-reports',
          title: 'Relatórios',
          route: 'admin/reports',
          icon: 'fa-solid fa-file-invoice',
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
          items: [
            {
              id: 'admin-users-active',
              title: 'Usuários Ativos',
              route: '/',
              queryParams: { tab: 'active' },
            },
            {
              id: 'admin-users-inactive',
              title: 'Usuários Inativos',
              route: '/',
              queryParams: { tab: 'suspend' },
            },
            {
              id: 'admin-users-pending',
              title: 'Cadastros Pendentes',
              route: '/',
              queryParams: { tab: 'waiting approve' },
            },
            {
              id: 'admin-user-add',
              title: 'Cadastrar Usuário',
              route: '/add',
            },

            {
              id: 'admin-users-access-group',
              title: 'Grupo de Acesso e Segmentos',
              route: '/segment-access-group',
            },
            {
              id: 'admin-users-permissions-access-group',
              title: 'Permissões de Grupos de Acessos',
              route: '/permissions-access-group',
            },
            {
              id: 'admin-users-office-sector',
              title: 'Cargo e Setores',
              route: '/office-sectors',
            },
            // {
            //   id: 'admin-users-city-state',
            //   title: 'Cidades e Estados',
            //   route: '/cities-states',
            // },
            {
              id: 'admin-users-import-defaulters',
              title: 'Importar inadimplentes',
              route: '/import-defaulters',
            },
            {
              id: 'admin-users-imports',
              title: 'Importar Usuários',
              route: '/imports',
            },
          ],
        },
        {
          id: 'admin-settings',
          title: 'Configurações',
          route: '/settings',
          icon: 'fa-solid fa-sliders',
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

  constructor(public tools: ToolsService, private service: ApiService) {}

  ngOnInit() {
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
}
