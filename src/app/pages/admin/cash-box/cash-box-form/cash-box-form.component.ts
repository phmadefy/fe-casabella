import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ToolsService } from 'src/app/services/tools.service';
import { DropdownCbComponent } from 'src/app/components/dropdown-cb/dropdown-cb.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { RouterLink } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cash-box-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    DropdownCbComponent,
    ButtonCbComponent,
    RouterLink,
  ],
  providers: [ApiService],
  templateUrl: './cash-box-form.component.html',
  styleUrls: ['./cash-box-form.component.scss'],
})
export class CashBoxFormComponent extends AbstractForms {
  admins: any[] = [];
  users: any[] = [];
  dados: any = { active: true, balance: 0, permissions: [] };

  constructor(
    service: ApiService,
    public tools: ToolsService,
    private messageService: MessageService
  ) {
    service.path = 'v1/admin/cashiers';
    super(service);
  }

  ngOnInit(): void {
    console.log('history', history.state);

    if (history.state?.cashier_id) {
      this.getDados(history.state?.cashier_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        console.log('res', res);
        this.dados = res;
        this.admins = this.getPermissionsBy(
          this.dados.permissions,
          'administrator'
        );
        this.users = this.getPermissionsBy(this.dados.permissions, 'default');
      })
      .finally(() => (this.loading = false));
  }

  override submit(): void {
    if (this.dados.id) {
      this.update(this.dados, this.dados.id);
    } else {
      this.create(this.dados);
    }
  }
  override finish(result: any): void {
    // throw new Error('Method not implemented.');
    this.getDados(result.id);
  }

  async setAdmin(admin: any) {
    console.log('setAdmin', admin);
    this.loading = true;
    await this.service
      .updateCustom(`v1/admin/cashiers/${this.dados.id}/define-permission`, {
        type: 'administrator',
        userId: admin.user_id,
      })
      .then(async (res) => {
        await this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }
  openDeleteAdmin(item: any) {
    this.messageService
      .presentAlertConfirm(
        `Remover o administrador : <b>${item?.user?.name}</b> do caixa ?`
      )
      .closed.subscribe((res) => {
        if (res) {
          this.removeUser(item.id);
        }
      });
  }

  async setUser(user: any) {
    console.log('setUser', user);
    this.loading = true;
    await this.service
      .updateCustom(`v1/admin/cashiers/${this.dados.id}/define-permission`, {
        type: 'default',
        userId: user.user_id,
      })
      .then(async (res) => {
        await this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  openDeleteUser(item: any) {
    this.messageService
      .presentAlertConfirm(
        `Remover o usuário : <b>${item?.user?.name}</b> do caixa ?`
      )
      .closed.subscribe((res) => {
        if (res) {
          this.removeUser(item.id);
        }
      });
  }

  removeUser(id: any) {
    this.loading = true;
    this.service
      .deleteCustom(
        `v1/admin/cashiers/${this.dados.id}/remove-permission/${id}`
      )
      .then(async () => {
        await this.getDados(this.dados.id);
      })
      .finally(() => (this.loading = false));
  }

  getPermissionsBy(permissions: any[], type: string) {
    return permissions.filter((p) => p.type == type);
  }
}
