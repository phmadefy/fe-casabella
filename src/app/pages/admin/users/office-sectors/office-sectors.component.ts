import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { ToolsService } from 'src/app/services/tools.service';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';

@Component({
  selector: 'app-office-sectors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
    CardComponent,
    DropdownCbComponent,
  ],
  templateUrl: './office-sectors.component.html',
  styleUrls: ['./office-sectors.component.scss'],
  providers: [ApiService],
})
export class OfficeSectorsComponent {
  office: any = { data: [] };
  sectors: any = { data: [] };
  loadingOffice = false;
  loadingSectors = false;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.getOffice();
    this.getSectors();
  }

  async getOffice() {
    this.loadingOffice = true;
    await this.service
      .getCustom('v1/roles')
      .then((res: any) => {
        console.log('getOffice', res);
        this.office = res;
      })
      .finally(() => (this.loadingOffice = false));
  }

  async getSectors() {
    this.loadingSectors = true;
    await this.service
      .getCustom('v1/departments')
      .then((res: any) => {
        console.log('getSectors', res);
        this.sectors = res;
      })
      .finally(() => (this.loadingSectors = false));
  }

  submit(form: NgForm, formName: string) {
    if (!form.valid) {
      return;
    }

    if (formName == 'office') {
      this.saveOffice(form.value).then(() => form.reset());
    } else {
      this.saveSectors(form.value).then(() => form.reset());
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
  openEditOffice(item: any) {
    const modalRef = this.tools.presentAlertPrompt('', 'Editar Cargo', {
      value: item.name,
    });
    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loadingOffice = true;
        this.service
          .updateCustom(`v1/admin/roles/${item.id}/update`, { name: result })
          .then(async () => {
            this.tools.presentAlert('Cargo atualizado com sucesso.');
            await this.getOffice();
          })
          .finally(() => (this.loadingOffice = false));
      }
    });
  }
  openDeleteOffice(item: any) {
    const dialogRef = this.tools.presentAlertConfirm(
      `Excluir <b>${item.name}</b> ?`,
      'Excluir Cargo'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loadingOffice = true;
        this.service
          .deleteCustom(`v1/users/roles/${item.id}`)
          .then(async () => {
            this.tools.presentAlert('Cargo excluído com sucesso.');
            await this.getOffice();
          })
          .finally(() => (this.loadingOffice = false));
      }
    });
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
  openEditSectors(item: any) {
    const modalRef = this.tools.presentAlertPrompt('', 'Editar Setor', {
      value: item.name,
    });
    modalRef.closed.subscribe((result) => {
      if (result) {
        this.loadingSectors = true;
        this.service
          .updateCustom(`v1/admin/departments/${item.id}/update`, {
            name: result,
          })
          .then(async () => {
            this.tools.presentAlert('Setor atualizado com sucesso.');
            await this.getSectors();
          })
          .finally(() => (this.loadingSectors = false));
      }
    });
  }
  openDeleteSectors(item: any) {
    const dialogRef = this.tools.presentAlertConfirm(
      `Excluir <b>${item.name}</b> ?`,
      'Excluir Setor'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loadingSectors = true;
        this.service
          .deleteCustom(`v1/admin/departments/${item.id}`)
          .then(async () => {
            this.tools.presentAlert('Setor excluído com sucesso.');
            await this.getSectors();
          })
          .finally(() => (this.loadingSectors = false));
      }
    });
  }
}
