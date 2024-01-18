import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { FormsModule } from '@angular/forms';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { Gender, StatusUser } from 'src/app/shared/properties';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterModule,
    InputFloatingComponent,
    ComboboxComponent,
    AvatarComponent,
    SpinnerComponent,
    SelectDefaultComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [ApiService],
})
export class UserFormComponent extends AbstractForms {
  dados: any = { user: {}, address: {}, status: 'active' };
  title = 'Cadastrar usuário';

  states: any[] = [];
  cities: any[] = [];

  gender = Gender;
  status = StatusUser;

  constructor(
    service: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    public tools: ToolsService
  ) {
    service.path = 'v1/users';
    super(service);
  }

  async ngOnInit() {
    // this.service.getStates().then((res) => (this.states = res));

    console.log('state');
    if (history.state?.user_id) {
      this.getDados(history.state?.user_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .listing({ id })
      .then((res) => {
        console.log('res', res);
        this.dados = res;
        if (!res.address) {
          this.dados.address = {};
        }
        if (res?.user?.group) {
          this.dados.user.group = this.tools.getPropertiesPivot(
            this.dados.user.group,
            'group_id'
          );
        }
      })
      .finally(() => (this.loading = false));
  }

  async submit() {
    const formData = this.tools.generateFormData(this.dados);

    if (!this.dados.id) {
      this.create(this.dados);
    } else {
      this.update(this.dados, this.dados.id);
      // this.loading = true;
      // await this.service
      //   .postCustom(`v1/users/${this.dados.id}`, formData)
      //   .then((res) => {
      //     this.finish(res);
      //   })
      //   .finally(() => (this.loading = false));
    }
  }

  finish(result: any): void {
    this.route.navigate(['/admin/users'], { queryParams: { tab: 'active' } });
  }

  async changeAvatar(event: any) {
    this.dados.avatar = event.target.files[0];
  }

  async getCities(uf: string) {
    this.cities = await this.service.getCities(uf);
  }
}
