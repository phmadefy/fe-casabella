import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit{

  LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });
  @ViewChild('app-modal') modalComponent!: ModalComponent;


  constructor(private apiService: ApiService, private router: Router){

  }

  ngAfterViewInit() {
    this.showModal();
  }

  showModal() {
    if (this.modalComponent) {
      this.modalComponent.show();
    }
  }

  onSubmit(){
    const email: string = this.LoginForm.get('email')?.value ?? '';
    const password: string = this.LoginForm.get('password')?.value ?? '';

    if (!email || typeof email !== 'string') {
      alert('Por favor, insira um email válido.');
      return;
    }

    console.log("CHEGOU AQUI",email, password);

    this.apiService.login(email, password).subscribe(
      response => {
        alert('Login successful');
        console.log('Acesso Realizado com sucesso!', response)

        this.router.navigate(['/feed']); //
      },
      error => {
        console.error('Login failed!', error);
        alert('Login failed!');
      }
    )
  }


}
