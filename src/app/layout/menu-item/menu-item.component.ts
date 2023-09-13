import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'menu-item',
  standalone: true,
  imports: [CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item: any = {};
  @Input() index: number = 0;
}
