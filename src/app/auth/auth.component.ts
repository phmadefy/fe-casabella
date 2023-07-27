import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  email: string = '';
  password: string = '';
  savePassword: boolean = false;

  constructor(private apiService: ApiService){}

  onSubmit(){
    this.apiService.login(this.email, this.password).subscribe(
      response => {
        alert('Login successful');
        console.log('Acesso Realizado com sucesso!', response)
      },
      error => {
        console.error('Login failed!', error);
        alert('Login failed!');
      }
    )
  }


}
