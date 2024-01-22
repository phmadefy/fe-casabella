import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from 'src/app/layout/base/base.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { ToolsService } from 'src/app/services/tools.service';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Gender } from 'src/app/shared/properties';
import { SelectDefaultComponent } from 'src/app/components/select-default/select-default.component';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { ButtonCbComponent } from 'src/app/components/button-cb/button-cb.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterModule,
    AvatarComponent,
    InputFloatingComponent,
    SelectDefaultComponent,
    ComboboxComponent,
    ButtonCbComponent,
  ],
  providers: [ApiService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  loading = false;
  dados: any = {};
  gender = Gender;

  userCurrent: any = { group: [] };

  constructor(public tool: ToolsService, private service: ApiService) {}
  async ngOnInit() {
    this.userCurrent = await this.tool.getCurrentUser();

    setTimeout(() => {
      this.dados.name = this.userCurrent.name;
      this.dados.cpf = this.userCurrent?.person?.cpf;
      this.dados.birthdate = this.userCurrent?.person?.birthdate;
      this.dados.email = this.userCurrent.email;
      this.dados.phone = this.userCurrent?.person?.phone;
      this.dados.phone_2 = this.userCurrent?.person?.phone_2;
      this.dados.gender = this.userCurrent?.person?.gender;
      this.dados.city = this.userCurrent?.person?.address?.city ?? '';
    }, 500);
  }

  getGroups() {
    const groups: any[] = this.userCurrent?.group?.map((g: any) => g.name);
    return groups.join(',');
  }

  async submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const formData = this.tool.generateFormData(this.dados);

    this.loading = true;
    await this.service
      .postCustom('v1/profile', formData)
      .finally(() => (this.loading = false));
  }
}
