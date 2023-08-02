import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-colaborador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent {

  colabForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  currentStep = 1;
  fileToUpload: File | null = null;

  steps = Array(4).fill(0);

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {

  }

  ngOnInit() {
    this.colabForm = this.formBuilder.group({
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
    const formData = this.colabForm.value;
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
    if (this.currentStep < 5) {
      this.submitForm();
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

}
