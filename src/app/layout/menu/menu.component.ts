import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkMenu, CdkMenuTrigger, CdkMenuItem } from '@angular/cdk/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    RouterModule,
    MenuItemComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() item: any = {};
  @Input() index: number = 0;
  @Input() ref: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('item', this.item);
  }
}
