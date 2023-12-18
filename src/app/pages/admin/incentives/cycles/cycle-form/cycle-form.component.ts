import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cycle-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CheckboxComponent,
    SpinnerComponent,
    InputFloatingComponent,
    RouterLink,
  ],
  providers: [ApiService],
  templateUrl: './cycle-form.component.html',
  styleUrls: ['./cycle-form.component.scss'],
})
export class CycleFormComponent extends AbstractForms {
  dados: any = {};

  constructor(service: ApiService, private router: Router) {
    super(service);
    service.path = 'v1/incentives-cycles';
  }

  ngOnInit() {
    if (history.state?.cycle_id) {
      console.log('history', history);
      this.getDados(history.state?.cycle_id);
    }
  }

  getDados(id: any) {
    this.loading = true;
    this.service
      .show(id)
      .then((res) => {
        this.dados = res;
      })
      .finally(() => (this.loading = false));
  }

  override submit(): void {
    if (!this.dados.id) {
      this.create(this.dados);
    } else {
      this.update(this.dados, this.dados.id);
    }
  }
  override finish(result: any): void {
    this.router.navigate(['/admin/incentives/ciclos'], {
      queryParams: { tab: 'active' },
    });
  }
}
