import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { Login } from '../core/actions/auth.action';
import { InputFloatingComponent } from '../components/input-floating/input-floating.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    SpinnerComponent,
    InputFloatingComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('app-modal') modalComponent!: ModalComponent;

  loading = false;

  constructor(
    private service: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.showModal();
  }

  showModal() {
    if (this.modalComponent) {
      this.modalComponent.show();
    }
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
        this.router.navigate(['/']);
      })
      .finally(() => (this.loading = false));
  }
}
