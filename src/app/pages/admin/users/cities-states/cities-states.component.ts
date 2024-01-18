import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { MessageService } from 'src/app/services/message.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UFs } from 'src/app/shared/properties';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';

@Component({
  selector: 'app-cities-states',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
    CardComponent,
    DropdownCbComponent,
    ComboboxComponent,
  ],
  providers: [ApiService],
  templateUrl: './cities-states.component.html',
  styleUrls: ['./cities-states.component.scss'],
})
export class CitiesStatesComponent {
  dataSource: any = { data: [] };
  loading = false;

  states = UFs;

  constructor(
    private service: ApiService,
    private messageService: MessageService,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loading = true;
    await this.service
      .getCustom('v1/cities')
      .then((res: any) => {
        this.dataSource = res;
      })
      .finally(() => (this.loading = false));
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.save(form.value).then(() => form.reset());
  }

  async save(data: any) {
    this.loading = true;
    await this.service
      .postCustom('v1/admin/cities', data)
      .then(async () => {
        await this.getList();
      })
      .finally(() => (this.loading = false));
  }
  // openEdit(item: any) {
  //   const modalRef = this.messageService.presentAlertPrompt(
  //     '',
  //     'Editar Cargo',
  //     {
  //       value: item.name,
  //     }
  //   );
  //   modalRef.closed.subscribe((result) => {
  //     if (result) {
  //       this.loading = true;
  //       this.service
  //         .updateCustom(`v1/admin/roles/update/${item.id}`, { name: result })
  //         .then(async () => {
  //           this.messageService.presentAlert('Cargo atualizado com sucesso.');
  //           await this.getList();
  //         })
  //         .finally(() => (this.loading = false));
  //     }
  //   });
  // }
  openDelete(item: any) {
    const dialogRef = this.messageService.presentAlertConfirm(
      `Excluir <b>${item.name}</b> ?`,
      'Excluir Cidade'
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.loading = true;
        this.service
          .deleteCustom(`v1/admin/cities/${item.id}`)
          .then(async () => {
            this.messageService.presentAlert('Cidade excluída com sucesso.');
            await this.getList();
          })
          .finally(() => (this.loading = false));
      }
    });
  }
}
