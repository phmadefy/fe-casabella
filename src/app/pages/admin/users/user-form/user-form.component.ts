import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { FormsModule } from '@angular/forms';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    RouterLink,
    InputFloatingComponent,
    AvatarComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [ApiService],
})
export class UserFormComponent extends AbstractForms {
  dados: any = { user: {}, address: {} };
  title = 'Cadastrar usuário';

  categories: any[] = [];
  roles: any[] = [];

  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {
    super(apiService);
    apiService.path = 'v1/users';
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categories = await this.apiService.getCategories();
    this.roles = await this.apiService.getRoles();
  }

  submit(): void {
    if (!this.dados.id) {
      this.create(this.dados);
    }
  }

  finish(result: any): void {
    this.route.navigate(['/admin/users'], { queryParams: { tab: 'actives' } });
  }

  changeAvatar(event: any) {}
}
