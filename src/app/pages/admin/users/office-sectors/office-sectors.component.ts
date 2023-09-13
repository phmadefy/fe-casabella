import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-office-sectors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
    CardComponent,
  ],
  templateUrl: './office-sectors.component.html',
  styleUrls: ['./office-sectors.component.scss'],
  providers: [ApiService],
})
export class OfficeSectorsComponent {
  office: any[] = [];
  sectors: any[] = [];
  loadingOffice = false;
  loadingSectors = false;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDados();
  }

  async getOffice() {
    this.loadingOffice = true;
    await this.service
      .getCustom('v1/roles')
      .then((res: any[]) => {
        console.log('getOffice', res);
        this.office = res;
      })
      .finally(() => (this.loadingOffice = false));
  }

  async getSectors() {
    this.loadingSectors = true;
    await this.service
      .getCustom('v1/departments')
      .then((res: any[]) => {
        console.log('getSectors', res);
        this.sectors = res;
      })
      .finally(() => (this.loadingSectors = false));
  }

  async getDados() {
    Promise.all([this.getOffice(), this.getSectors()]);
  }

  submit(form: NgForm, formName: string) {
    if (!form.valid) {
      return;
    }

    if (formName == 'office') {
      this.saveOffice(form.value);
    } else {
      this.saveSectors(form.value);
    }
  }

  async saveOffice(data: any) {
    this.loadingOffice = true;
    await this.service
      .postCustom('v1/admin/roles/create', data)
      .then(async () => {
        await this.getOffice();
      })
      .finally(() => (this.loadingOffice = false));
  }

  async saveSectors(data: any) {
    this.loadingSectors = true;
    await this.service
      .postCustom('v1/admin/departments/create', data)
      .then(async () => {
        await this.getSectors();
      })
      .finally(() => (this.loadingSectors = false));
  }
}
