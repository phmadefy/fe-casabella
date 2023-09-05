import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputInlineComponent } from 'src/app/components/input-inline/input-inline.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, InputInlineComponent, SpinnerComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  dados: any = {};
  loading = false;

  constructor(
    private service: ApiService,
    private messageService: MessageService
  ) {
    service.path = 'v1/parameters';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDados();
  }

  async getDados() {
    this.loading = true;
    await this.service
      .listing()
      .then((res: any[]) => {
        console.log(res);
        this.parseData(res);
      })
      .finally(() => (this.loading = false));
  }

  parseData(res: any[]) {
    for (const item of res) {
      this.dados[item.parameter] = item.value;
    }
  }

  async save() {
    this.loading = true;
    await this.service
      .updateCustom('v1/parameters', this.dados)
      .then((res: any) => {
        this.messageService.toastSuccess(res.message, '');
      })
      .finally(() => (this.loading = false));
  }
}
