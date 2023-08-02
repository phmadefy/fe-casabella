import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { FloralPriceComponent } from 'src/app/components/floral-price/floral-price.component';
import { MyFloralComponent } from 'src/app/components/my-floral/my-floral.component';
import { AdsComponent } from 'src/app/components/ads/ads.component';

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
export class BaseComponent {}
