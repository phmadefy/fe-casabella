import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-revendedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './revendedor.component.html',
  styleUrls: ['./revendedor.component.scss']
})
export class RevendedorComponent {

  dealerForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  currentStep = 1;
  fileToUpload: File | null = null;

  steps = Array(4).fill(0);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
    ){

  }

  ngOnInit() {
    this.dealerForm = this.formBuilder.group({
      name: [null],
      cpf: [null],
      dataNasc: [null],
      email: [null],
      telefone: [null],
      cidade: [null],
      uf: [null]
    })

  }

  submitForm(): void {
    const formData = this.dealerForm.value;
    console.log("test form", formData)
    this.apiService.signupFormColab(formData).subscribe(
      (response) => {
        console.log('Resposta da API:', response);
      },
      (error) => {
        console.error('Erro ao enviar os dados para a API:', error);
      }
    );
  }




  nextStep(): void {
    if (this.currentStep < 4) {

      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  finish(): void {
    this.submitForm();

  }

}
