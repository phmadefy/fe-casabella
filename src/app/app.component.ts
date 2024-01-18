import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiService } from './services/api.service';
import { ToolsService } from './services/tools.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Casa Bella';

  constructor(private service: ApiService, private tools: ToolsService) {}

  ngOnInit(): void {
    this.service.getCustom('v1/parameters').then((res) => {
      this.tools.setParameters(res);
    });
  }
}
