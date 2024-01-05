import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-floral',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiService],
  templateUrl: './my-floral.component.html',
  styleUrls: ['./my-floral.component.scss'],
})
export class MyFloralComponent {
  totalFloral = 0;
  constructor(private service: ApiService) {
    service.path = 'v1/my-balance-floral';
  }

  ngOnInit(): void {
    this.service.getCustom('v1/my-balance-floral').then((res) => {
      console.log('my-balance', res);
      this.totalFloral = res;
    });
  }
}
