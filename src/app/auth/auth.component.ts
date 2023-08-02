import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  @ViewChild('app-modal') modalComponent!: ModalComponent;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });



  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder){

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
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

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Acesso Realizado com sucesso!', email, password);

    this.apiService.login(email, password).subscribe(
      response => {
        alert('Login successful');
        console.log('Acesso Realizado com sucesso!', response);
        this.router.navigate(['/feed']);
      },
      error => {
        console.error('Login failed!', error);
        alert('Não foi possivel fazer o login!');
      }
    );
  }


}
