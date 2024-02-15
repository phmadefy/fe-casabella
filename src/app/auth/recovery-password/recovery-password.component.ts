import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFloatingComponent } from 'src/app/components/input-floating/input-floating.component';
import { AbstractForms } from 'src/app/shared/abstract-form';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFloatingComponent,
    SpinnerComponent,
  ],
  providers: [ApiService],
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent extends AbstractForms {
  dados: any = {};
  constructor(
    service: ApiService,
    public tools: ToolsService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    super(service);
  }

  ngOnInit(): void {
    const token = this.activateRoute.snapshot.queryParamMap.get('token');
    if (token) {
      this.dados.token = token;
    }
  }

  override async submit() {
    if (this.dados.password != this.dados.passwordConfirm) {
      return this.messageService.toastError('As senhas não conferem');
    }

    this.loading = true;
    await this.service
      .postCustom(`v1/reset-password`, this.dados)
      .then((res) => {
        this.finish(res);
      })
      .finally(() => (this.loading = false));
  }
  override finish(result: any): void {
    this.tools.route.navigate(['/auth']);
  }
}
