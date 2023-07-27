import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
          route: 'posts',
          icon: '',
        },
        {
          id: 'feed-pg-add-post',
          title: 'Adicionar Post',
          route: 'posts/new',
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
      route: 'incentivos',
      icon: '',
      items: [
        {
          id: 'incentivos-ativos',
          title: 'Incentivos Ativos',
          route: 'incentivos-ativos',
          icon: '',
        },
        {
          id: 'incentivos-inativos',
          title: 'Incentivos inativos',
          route: 'incentivos-inativos',
          icon: '',
        },
        {
          id: 'meus-incentivos',
          title: 'Meus Incentivos',
          route: 'meus-incentivos',
          icon: '',
        },
        {
          id: 'gallery',
          title: 'Galeria de Fotos e Videos',
          route: 'gallery',
          icon: '',
        },
      ],
    },
    {
      id: 'floral',
      title: 'floral',
      route: 'floral',
      icon: '',
      items: [
        {
          id: 'meu-floral',
          title: 'Meu Floral',
          route: 'meu-floral',
          icon: '',
        },
        {
          id: 'transferencias-pendentes',
          title: 'Transferências Pendentes',
          route: 'transferencias-pendentes',
          icon: '',
        },
        {
          id: 'transferir-floral',
          title: 'Transferir Floral',
          route: 'transferir-floral',
          icon: '',
        },
        {
          id: 'resgatar-floral',
          title: 'Resgatar Floral',
          route: 'resgatar-floral',
          icon: '',
        },
      ],
    },
    {
      id: 'nfts',
      title: 'nfts',
      route: 'nfts',
      icon: '',
      items: [
        {
          id: 'meus-nfts',
          title: 'Meus NFTs',
          route: 'meus-nfts',
          icon: '',
        },
        {
          id: 'todos-nfts',
          title: 'Todos NFTs',
          route: 'todos-nfts',
          icon: '',
        },
        {
          id: 'transferencias-pendentes-nfts',
          title: 'Tranferências Pendentes',
          route: 'transferencias-pendentes-nfts',
          icon: '',
        },
        {
          id: 'transferir-nfts',
          title: 'Transferir NFTs',
          route: 'transferir-nfts',
          icon: '',
        },
      ],
    },
    {
      id: 'fale-conosco',
      title: 'fale conosco',
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
          route: 'admin-incentivos',
          icon: 'fa-regular fa-flag',
          items: [
            {
              id: 'admin-incentivos-todos',
              title: 'Todos Incentivos',
              route: 'admin-incentivos-todos',
            },
            {
              id: 'admin-incentivo-add',
              title: 'Adicionar Incentivo',
              route: 'admin-incentivo-add',
            },
            {
              id: 'admin-termos',
              title: 'Termos de Uso',
              route: 'admin-termos',
            },
            {
              id: 'admin-incentivos-ciclos',
              title: 'Ciclos de Incentivo',
              route: 'admin-incentivos-ciclos',
            },
          ],
        },
      ],
    },
  ];
}
