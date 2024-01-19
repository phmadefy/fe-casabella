import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { Login } from '../core/actions/auth.action';
import { InputFloatingComponent } from '../components/input-floating/input-floating.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalForgotPasswordComponent } from '../shared/modal-forgot-password/modal-forgot-password.component';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    SpinnerComponent,
    InputFloatingComponent,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  // @ViewChild('app-modal') modalComponent!: ModalComponent;
  dados: any = {};
  loading = false;

  FraseExibidaTelaLogin = null;
  ImagemOuVideoTelaLogin = null;
  LinkRedirecionamentoTelaLogin = null;

  constructor(
    private service: AuthService,
    private router: Router,
    private store: Store,
    private dialog: Dialog,
    private tools: ToolsService
  ) {}

  ngOnInit() {
    const parameters = this.tools.getParameters();
    const paramFrase = this.tools.getItemArray(
      parameters,
      'parameter',
      'FraseExibidaTelaLogin'
    );
    if (paramFrase) {
      this.FraseExibidaTelaLogin = paramFrase.value;
    }

    const paramImage = this.tools.getItemArray(
      parameters,
      'parameter',
      'ImagemOuVideoTelaLogin'
    );
    if (paramImage) {
      this.ImagemOuVideoTelaLogin = paramImage.value;
    }

    const paramLinkLogin = this.tools.getItemArray(
      parameters,
      'parameter',
      'LinkRedirecionamentoTelaLogin'
    );
    if (paramLinkLogin) {
      this.LinkRedirecionamentoTelaLogin =
        paramLinkLogin.value ?? 'javascript:void(0)';
    }
  }

  openModalForgot() {
    this.dialog.open<any>(ModalForgotPasswordComponent, {
      width: '95%',
      maxWidth: '500px',
      maxHeight: '90%',
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (!form.valid) {
      return;
    }

    this.loading = true;
    this.service
      .login(form.value)
      .then((res) => {
        console.log('res', res);
        this.store.dispatch(new Login({ token: res.access_token }));
        // this.router.navigate(['/']);
        location.href = '/';
      })
      .finally(() => (this.loading = false));
  }
}
