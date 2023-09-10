import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';

@Component({
  selector: 'app-permissions-access-group',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ComboboxComponent],
  providers: [ApiService],
  templateUrl: './permissions-access-group.component.html',
  styleUrls: ['./permissions-access-group.component.scss'],
})
export class PermissionsAccessGroupComponent {
  dados: any = { user: {}, address: {} };
  title = 'Cadastrar usuário';

  groups: any = { data: [] };
  roles: any[] = [];

  constructor(
    private service: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {
    service.path = 'v1/permissions';
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.groups = await this.service.getAccessGroups();
  }

  listPermissions(event: any) {
    this.service.listing({ perPage: 100, name: event }).then((res) => {
      console.log('listPermissions', res);
    });
  }
}
