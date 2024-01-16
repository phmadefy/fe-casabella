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
  userCurrent: any = { person: { address: {} } };
  gender = Gender;

  constructor(public tool: ToolsService, private service: ApiService) {}
  async ngOnInit() {
    this.userCurrent = await this.tool.getCurrentUser();
  }

  getGroups() {
    const groups: any[] = this.userCurrent?.group?.map((g: any) => g.name);
    return groups.join(',');
  }

  async submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.loading = true;
    await this.service
      .postCustom('v1/parameters', form.value)
      .finally(() => (this.loading = false));
  }
}
