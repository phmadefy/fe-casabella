import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FloralPriceComponent } from 'src/app/components/floral-price/floral-price.component';
import { MyFloralComponent } from 'src/app/components/my-floral/my-floral.component';
import { AdsComponent } from 'src/app/components/ads/ads.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FloralPriceComponent,
    MyFloralComponent,
    AdsComponent,
  ],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite();
  }
}
