import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {}
