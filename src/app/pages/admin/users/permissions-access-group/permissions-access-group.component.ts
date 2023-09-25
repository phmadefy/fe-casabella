import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';

@Component({
  selector: 'app-permissions-access-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    SelectDefaultComponent,
    CheckboxComponent,
    ButtonCbComponent,
  ],
  providers: [ApiService],
  templateUrl: './permissions-access-group.component.html',
  styleUrls: ['./permissions-access-group.component.scss'],
})
export class PermissionsAccessGroupComponent {
  dados: any = { user: {}, address: {} };
  title = 'Cadastrar usuário';

  permissionsBase: any[] = [];
  group: any = { rules: [] };

  loading = false;

  constructor(
    private service: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {
    service.path = 'v1/permissions';
  }

  async ngOnInit() {
    this.listPermissions();
  }

  listPermissions() {
    this.service.listing({ perPage: 100 }).then((res) => {
      console.log('listPermissions', res);
      const list: any[] = res.data;

      list.forEach((i) => {
        const index = this.permissionsBase.findIndex((p) => p.name == i.module);
        if (index >= 0) {
          this.permissionsBase[index].items
            ? this.permissionsBase[index].items.push(i)
            : (this.permissionsBase[index].items = [i]);
        } else {
          this.permissionsBase.push({ name: i.module, items: [i] });
        }
      });

      console.log('permissionsBase', this.permissionsBase);
    });
  }

  getGroup(id: any) {
    this.loading = true;
    this.service
      .getCustom(`v1/groups/${id}`)
      .then((res) => {
        console.log('getGroup', res);
        this.group = res;
      })
      .finally(() => (this.loading = false));
  }
}
