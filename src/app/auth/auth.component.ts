import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('app-modal') modalComponent!: ModalComponent;

  loading = false;

  constructor(private service: AuthService, private router: Router) {}

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
      })
      .finally(() => (this.loading = false));
  }
}
